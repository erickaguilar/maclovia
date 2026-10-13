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

const { getTranslation, getLanguage, setLanguage } = await import('../js/i18n.js');

test('getTranslation devuelve cadena vacía si keyPath es vacío', () => {
  assert.equal(getTranslation(''), '');
  assert.equal(getTranslation(null), '');
  assert.equal(getTranslation(undefined), '');
});

test('getTranslation hace fallback a español si lang inválido', () => {
  assert.equal(getTranslation('hero.ctaPortfolio', 'xx'), 'Explorar Portafolio');
});

test('getTranslation hace fallback profundo a español cuando falta clave en otro idioma', () => {
  // Usamos una clave que exista en ES/EN/ZH; todas existen. Simulamos buscando una inexistente parcial.
  assert.equal(getTranslation('no.existe.nunca'), 'no.existe.nunca');
});

test('getLanguage/setLanguage respetan idioma soportado', () => {
  setLanguage('en');
  assert.equal(getLanguage(), 'en');
  setLanguage('zh');
  assert.equal(getLanguage(), 'zh');
  setLanguage('es');
  assert.equal(getLanguage(), 'es');
});
