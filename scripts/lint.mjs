import { spawn } from 'child_process';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import process from 'process';

const roots = ['js', 'bin'];
const CONCURRENCY = 6;
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (full.endsWith('.js')) files.push(full);
  }
}

for (const root of roots) {
  if (statSync(root, { throwIfNoEntry: false })) walk(root);
}

function check(file) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['--check', file], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    let stderr = '';
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('close', (code) => resolve({ file, code, stderr }));
  });
}

const results = [];
let cursor = 0;

async function worker() {
  while (cursor < files.length) {
    const file = files[cursor++];
    results.push(await check(file));
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));

const failed = results.filter((r) => r.code !== 0);
for (const failure of failed) {
  console.error(`FAIL ${failure.file}`);
  if (failure.stderr) console.error(failure.stderr);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} archivo(s) con errores de sintaxis.`);
  process.exit(1);
}

console.log(`OK: sintaxis valida en ${files.length} archivos.`);
process.exit(0);