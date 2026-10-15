#!/usr/bin/env node

/**
 * ✦ MACLOVIA — Descarga reproducible de los assets de v86
 *
 * Baja el motor (libv86.js, v86.wasm, v86-fallback.wasm) desde el release oficial
 * y las BIOS (seabios.bin, vgabios.bin) desde el repositorio, y los coloca en
 * public/wasm/v86/. Verifica el SHA-256 de cada archivo contra el valor esperado.
 *
 * Zero dependencias: usa `fetch` nativo (Node >= 18) y módulos `node:`.
 * Uso:  node scripts/fetch-wasm-assets.mjs   (o: npm run wasm:assets)
 *
 * Nota: el rootfs de Alpine NO se descarga; hay que construirlo con Docker
 * (ver public/wasm/v86/README.md).
 */

import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

// Procedencia fijada (ver public/wasm/v86/THIRD-PARTY-NOTICES.md)
const V86_COMMIT = '94faf3d6b19ecabc53a4010aaa24252fa6a162e2';
const RELEASE = 'https://github.com/copy/v86/releases/download/latest';
const RAW_BIOS = `https://raw.githubusercontent.com/copy/v86/${V86_COMMIT}/bios`;

const OUT_DIR = path.resolve('public', 'wasm', 'v86');

const ASSETS = [
  {
    name: 'libv86.js',
    url: `${RELEASE}/libv86.js`,
    sha256: '1b41074f7a5604f528dac6842baf7afccd79d7370b97ea3241944c275b67bec1',
  },
  {
    name: 'v86.wasm',
    url: `${RELEASE}/v86.wasm`,
    sha256: '2fc5609ae837fcbc77147155de6f1014677ecab5369f5584ebc670e9d56e6510',
  },
  {
    name: 'v86-fallback.wasm',
    url: `${RELEASE}/v86-fallback.wasm`,
    sha256: 'b51525d7d4d5f23cdc065e7a25cc34d4dab5f44efd15d05893ef974c57f525c7',
  },
  {
    name: 'seabios.bin',
    url: `${RAW_BIOS}/seabios.bin`,
    sha256: '73e3f359102e3a9982c35fce98eb7cd08f18303ac7f1ba6ebfbe6cdc1c244d98',
  },
  {
    name: 'vgabios.bin',
    url: `${RAW_BIOS}/vgabios.bin`,
    sha256: 'a4bc0d80cc3ca028c73dafa8fee396b8d054ce87ebd8abfbd31b06b437607880',
  },
];

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  rosa: '\x1b[38;2;228;0;124m',
  green: '\x1b[38;2;52;211;153m',
  yellow: '\x1b[38;2;251;191;36m',
  red: '\x1b[38;2;244;63;94m',
};

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

// Descarga con `fetch` nativo. En redes con inspección TLS corporativa, Node
// puede no confiar en el CA interno ("unable to get local issuer certificate").
async function viaFetch(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} al descargar ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// Plan B: `curl` del sistema, que en Windows usa el almacén de certificados del
// SO y por tanto sí confía en el CA corporativo.
function viaCurl(url) {
  const tmp = path.join(os.tmpdir(), `maclovia-v86-${process.pid}-${Date.now()}`);
  const res = spawnSync('curl', ['-fL', '--retry', '3', '--retry-delay', '1', '-s', '-o', tmp, url], {
    stdio: 'ignore',
  });
  if (res.error || res.status !== 0) {
    try { rmSync(tmp); } catch { /* noop */ }
    throw new Error(`curl falló (código ${res.status ?? 'n/a'}) para ${url}`);
  }
  const buf = readFileSync(tmp);
  rmSync(tmp);
  return buf;
}

async function getBytes(url) {
  try {
    return await viaFetch(url);
  } catch (err) {
    return viaCurl(url);
  }
}

async function download(asset) {
  process.stdout.write(`  ${asset.name} ${C.dim}← ${asset.url}${C.reset}\n`);
  const buf = await getBytes(asset.url);
  const digest = sha256(buf);
  await writeFile(path.join(OUT_DIR, asset.name), buf);

  if (digest === asset.sha256) {
    process.stdout.write(`    ${C.green}✓ ok${C.reset} ${C.dim}${digest}${C.reset}\n`);
    return { name: asset.name, ok: true };
  }
  process.stdout.write(`    ${C.yellow}! hash distinto${C.reset}\n`);
  process.stdout.write(`      ${C.dim}esperado:${C.reset} ${asset.sha256}\n`);
  process.stdout.write(`      ${C.dim}obtenido:${C.reset} ${digest}\n`);
  return { name: asset.name, ok: false, digest };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`\n${C.rosa}✦${C.reset} Assets de v86 → ${C.dim}${OUT_DIR}${C.reset}\n`);

  const results = [];
  for (const asset of ASSETS) {
    try {
      results.push(await download(asset));
    } catch (err) {
      process.stdout.write(`    ${C.red}✗ ${err.message}${C.reset}\n`);
      results.push({ name: asset.name, ok: false, error: true });
    }
  }

  const mismatched = results.filter((r) => !r.ok);
  console.log('');
  if (mismatched.length === 0) {
    console.log(`${C.green}✓${C.reset} Motor y BIOS listos.`);
    console.log(`  ${C.dim}Falta el rootfs de Alpine (Docker): ver public/wasm/v86/README.md${C.reset}\n`);
  } else {
    console.log(`${C.yellow}!${C.reset} ${mismatched.length} archivo(s) con problemas: ${mismatched.map((r) => r.name).join(', ')}`);
    console.log(`  ${C.dim}Si el release cambió, actualiza los hashes en este script y en THIRD-PARTY-NOTICES.md.${C.reset}\n`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`${C.red}Error fatal:${C.reset}`, err);
  process.exitCode = 1;
});
