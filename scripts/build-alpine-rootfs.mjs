#!/usr/bin/env node

/**
 * ✦ MACLOVIA — Construye el rootfs de Alpine con escritorio i3 (v86)
 *
 * Genera el rootfs 9p (`alpine-fs.json` + `alpine-rootfs-flat/`) a partir de la
 * imagen Docker de `docker/alpine-i3/` y lo deja en `public/wasm/v86/`.
 *
 * Requisitos: Docker en marcha, git y Python 3.
 *
 * Uso:
 *   npm run wasm:rootfs:build
 *   npm run wasm:rootfs:build -- --with-node     # incluye node (~46 MB más)
 *   npm run wasm:rootfs:build -- --no-trim       # conserva System.map, /var/cache…
 *   npm run wasm:rootfs:build -- --zstd          # comprime los .bin (requiere zstandard)
 *   npm run wasm:rootfs:build -- --v86=<ruta>    # reutiliza un checkout de v86
 *   npm run wasm:rootfs:build -- --out=<ruta>    # otro directorio de salida
 *
 * Los scripts `fs2json.py` y `copy-to-sha256.py` se toman del repo de v86
 * (se clona en `.cache/v86` si no existe). El rootfs NO se versiona.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  rosa: '\x1b[38;2;228;0;124m',
  green: '\x1b[38;2;52;211;153m',
  yellow: '\x1b[38;2;251;191;36m',
  red: '\x1b[38;2;244;63;94m',
};

const IMAGE = 'maclovia/alpine-i3:3.21';
const CONTAINER = 'maclovia-alpine-rootfs';

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

function run(cmd, argv, opts = {}) {
  if (!opts.quiet) console.log(`${C.dim}$ ${cmd} ${argv.join(' ')}${C.reset}`);
  const r = spawnSync(cmd, argv, opts.quiet ? { encoding: 'utf8' } : { stdio: 'inherit' });
  if (r.error) throw new Error(`${cmd}: ${r.error.message}`);
  if (r.status !== 0) {
    if (opts.quiet && r.stderr) console.error(r.stderr);
    throw new Error(`${cmd} terminó con código ${r.status}`);
  }
}

function capture(cmd, argv) {
  const r = spawnSync(cmd, argv, { encoding: 'utf8' });
  return { ok: r.status === 0, out: `${r.stdout || ''}${r.stderr || ''}`.trim() };
}

function findPython() {
  for (const cand of [['python'], ['python3'], ['py', '-3']]) {
    if (capture(cand[0], [...cand.slice(1), '--version']).ok) return cand;
  }
  return null;
}

function mb(bytes) {
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function main() {
  const out = path.resolve(arg('out', path.join('public', 'wasm', 'v86')));
  const v86 = path.resolve(arg('v86', path.join('.cache', 'v86')));
  const withNode = arg('with-node') === 'true';
  const trim = arg('no-trim') !== 'true';
  const useZstd = arg('zstd') === 'true';
  let apkScheme = arg('apk-scheme', '');

  console.log(`\n${C.rosa}✦${C.reset} Rootfs Alpine + i3 para v86`);
  console.log(`  ${C.dim}salida: ${out}${C.reset}`);
  console.log(`  ${C.dim}node: ${withNode ? 'sí' : 'no'} · trim: ${trim ? 'sí' : 'no'} · zstd: ${useZstd ? 'sí' : 'no'}${C.reset}\n`);

  const docker = capture('docker', ['info', '--format', '{{.ServerVersion}}']);
  if (!docker.ok) {
    console.error(`${C.red}Docker no está disponible.${C.reset} Arranca Docker Desktop y reintenta.`);
    if (docker.out) console.error(`${C.dim}${docker.out.split('\n')[0]}${C.reset}`);
    process.exitCode = 1;
    return;
  }

  const python = findPython();
  if (!python) {
    console.error(`${C.red}Python 3 no encontrado.${C.reset} Instala Python y reintenta.`);
    process.exitCode = 1;
    return;
  }

  if (!existsSync(path.join(v86, 'tools', 'fs2json.py'))) {
    console.log(`${C.yellow}•${C.reset} Clonando copy/v86 en ${v86} …`);
    mkdirSync(path.dirname(v86), { recursive: true });
    run('git', ['clone', '--depth', '1', 'https://github.com/copy/v86.git', v86]);
  } else {
    console.log(`${C.green}✓${C.reset} v86 ya está en ${v86}`);
  }

  console.log(`\n${C.yellow}•${C.reset} Construyendo imagen ${IMAGE} (linux/386) …`);
  if (!apkScheme) {
    // Docker Desktop y algunos antivirus interceptan TLS con un certificado que
    // el contenedor no confía. Si HTTPS falla, usamos HTTP (paquetes firmados).
    const probe = spawnSync('docker', ['run', '--rm', '--platform', 'linux/386',
      'i386/alpine:3.21.0', 'sh', '-c',
      'wget -q -O /dev/null https://dl-cdn.alpinelinux.org/alpine/v3.21/main/x86/APKINDEX.tar.gz'],
    { stdio: 'ignore' });
    apkScheme = probe.status === 0 ? 'https' : 'http';
    if (apkScheme === 'http') {
      console.log(`  ${C.yellow}aviso:${C.reset} HTTPS falla dentro del contenedor (inspección TLS); se usará HTTP con verificación de firma apk.`);
    }
  }
  run('docker', [
    'build', '--platform', 'linux/386', '--progress=plain',
    '--build-arg', `WITH_NODE=${withNode ? '1' : '0'}`,
    '--build-arg', `APK_SCHEME=${apkScheme}`,
    '-t', IMAGE, path.join('docker', 'alpine-i3'),
  ]);

  console.log(`\n${C.yellow}•${C.reset} Exportando el sistema de archivos …`);
  capture('docker', ['rm', '-f', CONTAINER]);
  run('docker', ['create', '--platform', 'linux/386', '--hostname', 'localhost', '--name', CONTAINER, IMAGE]);

  mkdirSync(out, { recursive: true });
  const tarPath = path.join(out, 'alpine-rootfs.tar');
  run('docker', ['export', '-o', tarPath, CONTAINER]);
  capture('docker', ['rm', '-f', CONTAINER]);

  // .dockerenv no aporta nada (y fs2json no lo excluye en modo tar).
  const del = spawnSync('tar', ['-f', tarPath, '--delete', '.dockerenv'], { stdio: 'ignore' });
  if (del.status !== 0) console.log(`  ${C.dim}(aviso: no se pudo borrar .dockerenv del tar; se quitará del índice)${C.reset}`);

  console.log(`\n${C.yellow}•${C.reset} Generando índice 9p y árbol content-addressed …`);
  rmSync(path.join(out, 'alpine-rootfs-flat'), { recursive: true, force: true });
  mkdirSync(path.join(out, 'alpine-rootfs-flat'), { recursive: true });

  const zstd = useZstd ? ['--zstd'] : [];
  run(python[0], [...python.slice(1), path.join(v86, 'tools', 'fs2json.py'), ...zstd,
    '--out', path.join(out, 'alpine-fs.json'), tarPath]);
  run(python[0], [...python.slice(1), path.join(v86, 'tools', 'copy-to-sha256.py'), ...zstd,
    tarPath, path.join(out, 'alpine-rootfs-flat')], { quiet: true });

  if (trim) {
    console.log(`\n${C.yellow}•${C.reset} Recortando el rootfs …`);
    const remove = ['/.dockerenv', '/boot/System.map', '/boot/config'];
    if (!withNode) remove.push('/usr/bin/node');
    run('node', ['scripts/trim-alpine-rootfs.mjs', '--dir', out, '--remove', remove.join(',')]);
  }

  const flat = path.join(out, 'alpine-rootfs-flat');
  const files = existsSync(flat) ? readdirSync(flat).filter((f) => /\.bin(\.zst)?$/.test(f)) : [];
  const bytes = files.reduce((sum, f) => sum + statSync(path.join(flat, f)).size, 0);

  console.log(`\n${C.green}✓${C.reset} Rootfs listo en ${out}`);
  console.log(`  ${C.dim}${files.length} archivos · ${mb(bytes)}${C.reset}`);
  console.log(`  ${C.dim}tar: ${mb(existsSync(tarPath) ? statSync(tarPath).size : 0)}${C.reset}\n`);
}

try {
  main();
} catch (err) {
  console.error(`\n${C.red}Error:${C.reset} ${err.message || err}\n`);
  process.exitCode = 1;
}
