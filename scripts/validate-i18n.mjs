import { translations } from '../js/data/translations.js';
import process from 'process';

const langs = Object.keys(translations);

function flatten(obj, prefix = '', keys = []) {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') {
      flatten(value, full, keys);
    } else {
      keys.push(full);
    }
  }
  return keys;
}

const keySets = {};
for (const lang of langs) {
  keySets[lang] = new Set(flatten(translations[lang]));
}

const base = langs[0];
const baseKeys = keySets[base];
const issues = [];

for (const lang of langs) {
  if (lang === base) continue;
  for (const key of baseKeys) {
    if (!keySets[lang].has(key)) issues.push(`${lang} falta: ${key}`);
  }
  for (const key of keySets[lang]) {
    if (!baseKeys.has(key)) issues.push(`${lang} extra (no existe en ${base}): ${key}`);
  }
}

if (issues.length > 0) {
  console.error(`i18n: ${issues.length} problema(s) de paridad entre ${langs.join('/')}:`);
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exit(1);
}

const totals = langs.map((lang) => `${lang}:${keySets[lang].size}`).join(' ');
console.log(`OK: paridad de claves ${totals}.`);