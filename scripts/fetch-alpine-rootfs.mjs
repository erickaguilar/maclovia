#!/usr/bin/env node

/**
 * ✦ MACLOVIA — Trae el rootfs de Alpine (9p) desde una base remota
 *
 * Descarga `alpine-fs.json`, recorre el árbol del filesystem y baja cada archivo
 * de `alpine-rootfs-flat/` a `public/wasm/v86/`. Verifica que el nombre de cada
 * archivo coincida con `sha256(contenido)[:10]` (esquema de `copy-to-sha256.py`
 * de v86), de modo que la integridad queda comprobada sin manifiesto externo.
 *
 * Zero dependencias: usa `fetch` nativo (Node >= 18) y módulos `node:`.
 *
 * Uso:
 *   node scripts/fetch-alpine-rootfs.mjs --base=https://cdn.jsdelivr.net/gh/usuario/maclovia-rootfs@v1/
 *   ALPINE_ROOTFS_BASE=https://…/ node scripts/fetch-alpine-rootfs.mjs
 *
 * Banderas:
 *   --base=<url>   Base pública donde están `alpine-fs.json` y `alpine-rootfs-flat/`.
 *   --force        Baja todo de nuevo (por defecto se salta lo ya presente y válido).
 *   --check        Solo verifica lo local contra el índice; no descarga nada.
 *
 * Nota: la base debe permitir CORS si el navegador va a consumirla directamente
 * (jsDelivr y GitHub raw lo permiten). Para desarrollo local basta con construir
 * el rootfs con Docker (ver public/wasm/v86/README.md).
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const OUT_DIR = path.resolve('public', 'wasm', 'v86');
const TREE_DIR = path.join(OUT_DIR, 'alpine-rootfs-flat');
const INDEX = 'alpine-fs.json';
const CONCURRENCY = 8;

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  rosa: '\x1b[38;2;228;0;124m',
  green: '\x1b[38;2;52;211;153m',
  yellow: '\x1b[38;2;251;191;36m',
  red: '\x1b[38;2;244;63;94m',
};

function arg(name, fallback = '') {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const eq = hit.indexOf('=');
  return eq === -1 ? 'true' : hit.slice(eq + 1);
}

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

function baseUrl() {
  const raw = arg('base') || process.env.ALPINE_ROOTFS_BASE || '';
  if (!raw || raw === 'true') return '';
  return raw.endsWith('/') ? raw : raw + '/';
}

// Recorre el árbol 9p (`fsroot`) y devuelve el listado de archivos regulares.
function isNode(x) {
  return Array.isArray(x) && typeof x[0] === 'string' && typeof x[1] === 'number';
}

function collectFiles(node, out) {
  if (!Array.isArray(node)) return out;
  if (isNode(node)) {
    const child = node[6];
    if (typeof child === 'string') {
      if (/\.bin$/.test(child)) out.push(child);
    } else if (Array.isArray(child)) {
      collectFiles(child, out);
    }
  } else {
    for (const child of node) collectFiles(child, out);
  }
  return out;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function download(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// Verifica un archivo local: sha256(contenido)[:10] debe ser el nombre sin .bin
async function localValid(name) {
  try {
    const buf = await readFile(path.join(TREE_DIR, name));
    return sha256(buf).slice(0, 10) === name.replace(/\.bin$/, '');
  } catch {
    return false;
  }
}

// Pool de concurrencia simple, sin dependencias.
async function pool(items, size, worker) {
  let index = 0;
  const results = new Array(items.length);
  const runners = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

function firstFile(idx) {
  return collectFiles(idx && idx.fsroot, [])[0] || null;
}

async function main() {
  const base = baseUrl();
  const checkOnly = arg('check') === 'true';
  const force = arg('force') === 'true';

  console.log(`\n${C.rosa}✦${C.reset} Rootfs de Alpine ${C.dim}→ ${OUT_DIR}${C.reset}\n`);

  if (!base && !checkOnly) {
    console.error(`${C.red}✗ Falta la base.${C.reset} Usa ${C.dim}--base=<url>${C.reset} o la variable ${C.dim}ALPINE_ROOTFS_BASE${C.reset}.`);
    console.error(`  ${C.dim}La base debe alojar ${INDEX} y alpine-rootfs-flat/.${C.reset}\n`);
    process.exitCode = 2;
    return;
  }

  await mkdir(TREE_DIR, { recursive: true });

  let indexBuf;
  if (base) {
    process.stdout.write(`  ${C.dim}índice${C.reset}  ${base}${INDEX}\n`);
    indexBuf = await download(base + INDEX);
  } else {
    process.stdout.write(`  ${C.dim}índice${C.reset}  ${path.join(OUT_DIR, INDEX)} ${C.dim}(local)${C.reset}\n`);
    indexBuf = await readFile(path.join(OUT_DIR, INDEX));
  }
  const indexText = indexBuf.toString('utf8');
  if (indexText.trimStart().startsWith('<')) {
    throw new Error(`${INDEX} se sirvió como HTML (SPA fallback): revisa la base`);
  }
  const idx = JSON.parse(indexText);
  await writeFile(path.join(OUT_DIR, INDEX), indexBuf);

  const files = [...new Set(collectFiles(idx && idx.fsroot, []))];
  if (!files.length) throw new Error(`${INDEX} no contiene archivos`);
  console.log(`  ${C.green}✓${C.reset} índice válido ${C.dim}(${files.length} archivos, ~${(idx.size / 1048576).toFixed(1)} MB)${C.reset}\n`);

  let ok = 0;
  let skipped = 0;
  const failed = [];

  await pool(files, CONCURRENCY, async (name) => {
    const dest = path.join(TREE_DIR, name);
    if (!force && (await exists(dest)) && (await localValid(name))) { skipped++; return; }

    if (checkOnly) { failed.push(name); return; }

    try {
      const buf = await download(base + 'alpine-rootfs-flat/' + name);
      const digest = sha256(buf).slice(0, 10);
      if (digest !== name.replace(/\.bin$/, '')) {
        failed.push(`${name} (hash ${digest})`);
        return;
      }
      await writeFile(dest, buf);
      ok++;
      if (ok % 100 === 0) process.stdout.write(`  ${C.dim}… ${ok}/${files.length}${C.reset}\r`);
    } catch (err) {
      failed.push(`${name} (${err.message})`);
    }
  });

  console.log(''.padEnd(40));
  if (checkOnly) {
    if (!failed.length) console.log(`${C.green}✓${C.reset} Rootfs local completo y verificado (${files.length} archivos).\n`);
    else {
      console.log(`${C.yellow}!${C.reset} Faltan o no coinciden ${failed.length} archivo(s) de ${files.length}.`);
      console.log(`  ${C.dim}Ejecuta sin --check para descargarlos.${C.reset}\n`);
      process.exitCode = 1;
    }
    return;
  }

  if (!failed.length) {
    console.log(`${C.green}✓${C.reset} Rootfs listo ${C.dim}(${ok} descargados, ${skipped} ya presentes)${C.reset}\n`);
  } else {
    console.log(`${C.yellow}!${C.reset} ${failed.length} archivo(s) con problemas de ${files.length}:`);
    for (const f of failed.slice(0, 10)) console.log(`  ${C.red}✗${C.reset} ${f}`);
    if (failed.length > 10) console.log(`  ${C.dim}… y ${failed.length - 10} más${C.reset}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`${C.red}Error fatal:${C.reset}`, err.message || err);
  process.exitCode = 1;
});
