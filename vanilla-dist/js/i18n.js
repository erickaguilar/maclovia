/**
 * Maclovia / Belleza Maldita — Native i18n Engine (Vanilla)
 * Cero dependencias • Reactivo • Persistencia en localStorage • Soporte ES / EN
 */

import { translations } from './data/translations.js';

export { translations };

let currentLang = localStorage.getItem('maclovia_lang') || 'es';

/**
 * Obtiene el idioma actualmente seleccionado ('es' o 'en')
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Resuelve una ruta de claves (e.g. 'hero.title') en el diccionario del idioma
 */
export function getTranslation(keyPath, lang = currentLang) {
  if (!keyPath) return '';
  const parts = keyPath.split('.');
  let current = translations[lang] || translations['es'];
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback a español si la clave no existe en inglés
      let fallback = translations['es'];
      for (const fPart of parts) {
        if (fallback && typeof fallback === 'object' && fPart in fallback) {
          fallback = fallback[fPart];
        } else {
          return keyPath;
        }
      }
      return fallback;
    }
  }
  return current;
}

/**
 * Establece el idioma activo, traduce los nodos del DOM y persiste la selección en localStorage
 * @param {'es' | 'en'} newLang
 */
export function setLanguage(newLang) {
  if (newLang !== 'es' && newLang !== 'en') return;
  currentLang = newLang;
  localStorage.setItem('maclovia_lang', newLang);
  document.documentElement.lang = newLang;

  // Actualizar todos los elementos con atributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translated = getTranslation(key, newLang);
    if (translated && typeof translated === 'string') {
      const textSpan = el.querySelector('span:not([class*="icon"])');
      if (textSpan && el.querySelector('svg')) {
        textSpan.textContent = translated;
      } else {
        el.textContent = translated;
      }
    }
  });

  // Actualizar atributos dinámicos con data-i18n-attr (e.g., "title:hero.ctaPortfolio")
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    if (!spec) return;
    const [attr, key] = spec.split(':');
    const translated = getTranslation(key, newLang);
    if (translated && attr) {
      el.setAttribute(attr, translated);
    }
  });

  // Actualizar etiqueta del botón de alternancia en la barra de navegación
  const toggleBtn = document.getElementById('lang-toggle-btn');
  if (toggleBtn) {
    const label = toggleBtn.querySelector('.lang-label');
    if (label) {
      label.textContent = newLang.toUpperCase();
    }
    toggleBtn.setAttribute(
      'title',
      newLang === 'es' ? 'Cambiar a Inglés (Switch to English)' : 'Switch to Spanish (Cambiar a Español)'
    );
  }

  // Notificar a todos los módulos y componentes para re-renderizado
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: newLang } }));
}

/**
 * Inicializa el motor de internacionalización al cargar el DOM
 */
export function initI18n() {
  setLanguage(currentLang);

  const toggleBtn = document.getElementById('lang-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'es' ? 'en' : 'es';
      setLanguage(nextLang);
    });
  }
}
