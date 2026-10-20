#!/usr/bin/env node

/**
 * ✦ MACLOVIA — Recorta el rootfs de Alpine (9p) para reducir peso
 *
 * Elimina rutas seleccionadas del índice `alpine-fs.json`, recalcula su tamaño
 * total y borra del árbol `alpine-rootfs-flat/` los archivos que quedan sin
 * referencias. Los nombres del árbol son `sha256(contenido)[:10]`, así que un
 * mismo archivo puede estar compartido por varias rutas: por eso se cuenta
 * referencias antes de borrar (nunca se elimina contenido aún usado).
 *
 * No toca el rootfs de Docker: actúa sobre lo ya construido en `public/wasm/v86/`.
 * Es reversible reconstruyendo el rootfs (ver public/wasm/v86/README.md).
 *
 * Uso:
 *   node scripts/trim-alpine-rootfs.mjs --dry                 # solo informa
 *   node scripts/trim-alpine-rootfs.mjs --set=safe            # recorte recomendado
 *   node scripts/trim-alpine-rootfs.mjs --set=aggressive
 *   node scripts/trim-alpine-rootfs.mjs --set=extreme
 *   node scripts/trim-alpine-rootfs.mjs --remove=/usr/bin/node,/boot/System.map
 *   node scripts/trim-alpine-rootfs.mjs --dir=<ruta>          # otro directorio
 *
 * Las rutas se tratan como **prefijos**: una entrada coincide si es exactamente
 * la ruta o si empieza por ella (así `/usr/bin/node` cubre `/usr/bin/nodejs` y
 * `/var/cache` elimina todo su subárbol).
 *
 * Perfiles:
 *   safe       (por defecto) `/usr/bin/node`, mapas/símbolos de kernel, caché apk
 *   aggressive safe + `/usr/share` (docs, man, licencias)
 *   extreme    aggressive + `/lib/modules` (⚠️ rompe `modprobe`; solo si no se
 *              necesitan módulos tras el arranque)
 */

import { readFile, writeFile, readdir, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const PROFILES = {
  safe: ['/usr/bin/node', '/boot/System.map', '/boot/config', '/var/cache'],
  aggressive: ['/usr/bin/node', '/boot/System.map', '/boot/config', '/var/cache', '/usr/share'],
  extreme: ['/usr/bin/node', '/boot/System.map', '/boot/config', '/var/cache', '/usr/share', '/lib/modules'],
};

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  rosa: '\x1b[38;2;228;0;124m',
  green: '\x1b[38;2;52;211;153m',
  yellow: '\x1b[38;2;251;191;36m',
  red: '\x1b[38;2;244;63;94m',
};

function arg(name, fallback = '') {
  const exact = `--${name}`;
  const idx = process.argv.indexOf(exact);
  if (idx !== -1) {
    const next = process.argv[idx + 1];
    if (next && !next.startsWith('--')) return next;
    return 'true';
  }
  const pref = `${exact}=`;
  const hit = process.argv.find((a) => a.startsWith(pref));
  return hit ? hit.slice(pref.length) : fallback;
}

function isNodeEntry(x) {
  return Array.isArray(x) && typeof x[0] === 'string' && typeof x[1] === 'number';
}

function matches(p, targets) {
  return targets.some((t) => p === t || p.startsWith(t));
}

// Recorre el árbol y elimina las entradas que coincidan con los prefijos.
function prune(nodes, prefix, targets, removed) {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const entry = nodes[i];
    if (!isNodeEntry(entry)) continue;
    const p = prefix + '/' + entry[0];
    if (matches(p, targets)) {
      removed.push({ path: p, size: typeof entry[6] === 'string' && /\.bin$/.test(entry[6]) ? entry[1] : 0 });
      nodes.splice(i, 1);
      continue;
    }
    if (Array.isArray(entry[6])) prune(entry[6], p, targets, removed);
  }
}

function summarise(nodes, prefix, acc) {
  for (const entry of nodes) {
    if (!isNodeEntry(entry)) continue;
    const child = entry[6];
    const p = prefix + '/' + entry[0];
    if (typeof child === 'string') {
      if (/\.bin$/.test(child)) { acc.size += entry[1]; acc.files++; acc.refs.set(child, (acc.refs.get(child) || 0) + 1); }
      else acc.links++;
    } else if (Array.isArray(child)) { acc.dirs++; summarise(child, p, acc); }
  }
  return acc;
}

function freshAcc() { return { size: 0, files: 0, dirs: 0, links: 0, refs: new Map() }; }
const mb = (b) => (b / 1048576).toFixed(2).padStart(8) + ' MB';

async function main() {
  const dir = path.resolve(arg('dir', path.join('public', 'wasm', 'v86')));
  const dry = arg('dry') === 'true';
  const set = arg('set', 'safe');
  const indexPath = path.join(dir, 'alpine-fs.json');
  const treeDir = path.join(dir, 'alpine-rootfs-flat');

  const custom = arg('remove');
  let targets;
  if (custom) targets = custom.split(',').map((s) => s.trim()).filter(Boolean);
  else {
    if (!PROFILES[set]) throw new Error(`perfil desconocido: ${set}`);
    targets = PROFILES[set];
  }

  const idx = JSON.parse(await readFile(indexPath, 'utf8'));
  if (!Array.isArray(idx.fsroot)) throw new Error('alpine-fs.json sin fsroot');

  const before = summarise(idx.fsroot, '', freshAcc());
  const removed = [];
  prune(idx.fsroot, '', targets, removed);
  const after = summarise(idx.fsroot, '', freshAcc());

  console.log(`\n${C.rosa}✦${C.reset} Recorte del rootfs ${C.dim}(${set}${custom ? ', personalizado' : ''})${C.reset}`);
  console.log(`  ${C.dim}${dir}${C.reset}\n`);
  console.log(`  perfil            ${C.dim}${targets.join(', ')}${C.reset}`);
  console.log(`  tamaño total      ${mb(before.size)} ${C.dim}→${C.reset} ${C.green}${mb(after.size)}${C.reset}  ${C.dim}(quita ${((before.size - after.size) / 1048576).toFixed(2)} MB)${C.reset}`);
  console.log(`  archivos          ${String(before.files).padStart(6)} → ${after.files}`);
  console.log(`  directorios       ${String(before.dirs).padStart(6)} → ${after.dirs}`);
  console.log(`  symlinks          ${String(before.links).padStart(6)} → ${after.links}`);

  // Archivos del árbol que ya no referencia ninguna entrada.
  const onDisk = (await readdir(treeDir)).filter((f) => f.endsWith('.bin'));
  const orphans = onDisk.filter((f) => !after.refs.has(f));
  let orphanBytes = 0;
  for (const f of orphans) {
    try { orphanBytes += (await stat(path.join(treeDir, f))).size; } catch { /* noop */ }
  }

  console.log(`\n  rutas eliminadas  ${removed.length}`);
  for (const r of removed.slice(0, 12)) console.log(`    ${C.red}✗${C.reset} ${r.path} ${C.dim}${r.size ? mb(r.size) : ''}${C.reset}`);
  if (removed.length > 12) console.log(`    ${C.dim}… y ${removed.length - 12} más${C.reset}`);

  console.log(`  bins en disco     ${onDisk.length} (${after.refs.size} en uso)`);
  console.log(`  a borrar del árbol ${orphans.length} archivo(s) ${C.dim}${(orphanBytes / 1048576).toFixed(2)} MB${C.reset}`);

  if (dry) {
    console.log(`\n  ${C.yellow}--dry${C.reset}: no se ha modificado nada.\n`);
    return;
  }

  idx.size = after.size;
  await writeFile(indexPath, JSON.stringify(idx));

  let freed = 0;
  for (const f of orphans) {
    try { freed += (await stat(path.join(treeDir, f))).size; await unlink(path.join(treeDir, f)); } catch { /* noop */ }
  }

  console.log(`\n  ${C.green}✓${C.reset} índice reescrito (size=${after.size})`);
  console.log(`  ${C.green}✓${C.reset} ${orphans.length} archivo(s) del árbol borrados (${(freed / 1048576).toFixed(2)} MB)\n`);
}

main().catch((err) => {
  console.error(`${C.red}Error:${C.reset}`, err.message || err);
  process.exitCode = 1;
});
