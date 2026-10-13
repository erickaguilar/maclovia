import { test } from 'node:test';
import assert from 'node:assert/strict';

const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};
globalThis.window = { dispatchEvent: () => {}, location: { search: '' } };
globalThis.document = {
  documentElement: { lang: '' },
  title: '',
  querySelectorAll: () => [],
  querySelector: () => null,
  getElementById: () => null,
};

const { translations, getTranslation, getLanguage, setLanguage } = await import('../js/i18n.js');

const LANGUAGES = ['es', 'en', 'zh'];

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

test('paridad de claves entre es/en/zh', () => {
  const keySets = Object.fromEntries(LANGUAGES.map((lang) => [lang, new Set(flatten(translations[lang]))]));
  const base = keySets.es;
  for (const lang of LANGUAGES.slice(1)) {
    for (const key of base) {
      assert.ok(keySets[lang].has(key), `falta clave en ${lang}: ${key}`);
    }
    assert.equal(keySets[lang].size, base.size, `número de claves distinto en ${lang}`);
  }
});

test('getTranslation devuelve la cadena de la lengua activa', () => {
  assert.equal(getTranslation('hero.ctaPortfolio', 'es'), 'Explorar Portafolio');
  assert.equal(getTranslation('hero.ctaPortfolio', 'en'), 'Explore Portfolio');
  assert.equal(getTranslation('hero.ctaPortfolio', 'zh'), '探索工程项目');
});

test('getTranslation devuelve la ruta si la clave no existe en ningún idioma', () => {
  assert.equal(getTranslation('no.existe.clave'), 'no.existe.clave');
  assert.equal(getTranslation('no.existe.clave', 'zh'), 'no.existe.clave');
});

test('setLanguage persiste y actualiza el idioma activo', () => {
  setLanguage('zh');
  assert.equal(getLanguage(), 'zh');
  assert.equal(localStorage.getItem('maclovia_lang'), 'zh');
  setLanguage('en');
  assert.equal(getLanguage(), 'en');
});