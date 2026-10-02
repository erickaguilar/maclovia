/**
 * Maclovia / Belleza Maldita — Native i18n Engine (Vanilla)
 * Cero dependencias • Reactivo • Persistencia en localStorage • Soporte ES / EN / ZH
 */

import { translations } from './data/translations.js';

export { translations };

const SUPPORTED_LANGS = ['es', 'en', 'zh'];

// Check URL query param first, then localStorage, then default to 'es'
const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const paramLang = urlParams ? urlParams.get('lang') : null;

let currentLang = (paramLang && SUPPORTED_LANGS.includes(paramLang))
  ? paramLang
  : (localStorage.getItem('maclovia_lang') || 'es');

/**
 * Obtiene el idioma actualmente seleccionado ('es', 'en', o 'zh')
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
      // Fallback a español si la clave no existe en el idioma seleccionado
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
 * @param {'es' | 'en' | 'zh'} newLang
 */
export function setLanguage(newLang) {
  if (!SUPPORTED_LANGS.includes(newLang)) return;
  currentLang = newLang;
  localStorage.setItem('maclovia_lang', newLang);
  document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : newLang;

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

  // Actualizar etiqueta del botón de alternancia en la barra de navegación (ES -> EN -> ZH)
  const toggleBtn = document.getElementById('lang-toggle-btn');
  if (toggleBtn) {
    const label = toggleBtn.querySelector('.lang-label');
    if (label) {
      label.textContent = newLang.toUpperCase();
    }
    const titles = {
      es: 'Cambiar a Inglés (Switch to English)',
      en: 'Switch to Chinese (切换为中文)',
      zh: '切换为西班牙语 (Cambiar a Español)',
    };
    toggleBtn.setAttribute('title', titles[newLang] || 'Cambiar idioma');
  }

  // Actualizar metadatos SEO en vivo
  const descMeta = document.querySelector('meta[name="description"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');

  if (newLang === 'zh') {
    document.title = 'Maclovia / Belleza Maldita — 高精度软件工作室 • 墨西哥城 (CDMX)';
    const zhDesc = '高精度软件工程、Rust语义模型压缩与分布式系统，兼具独特审美特质与技术严谨性，锻造于墨西哥城。';
    if (descMeta) descMeta.setAttribute('content', zhDesc);
    if (ogDesc) ogDesc.setAttribute('content', zhDesc);
  } else if (newLang === 'en') {
    document.title = 'Maclovia / Belleza Maldita — Software Studio & Systems Craft • CDMX';
    const enDesc = 'High-precision software engineering, semantic compression in Rust, and distributed architectures forged in Mexico City.';
    if (descMeta) descMeta.setAttribute('content', enDesc);
    if (ogDesc) ogDesc.setAttribute('content', enDesc);
  } else {
    document.title = 'Maclovia / Belleza Maldita — Studio de Software • CDMX';
    const esDesc = 'Studio de software de alta precisión, compresión de modelos en Rust y sistemas distribuidos con artesanía de autor en la Ciudad de México.';
    if (descMeta) descMeta.setAttribute('content', esDesc);
    if (ogDesc) ogDesc.setAttribute('content', esDesc);
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
      const currentIndex = SUPPORTED_LANGS.indexOf(currentLang);
      const nextLang = SUPPORTED_LANGS[(currentIndex + 1) % SUPPORTED_LANGS.length];
      setLanguage(nextLang);
    });
  }
}
