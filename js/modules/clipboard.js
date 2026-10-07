/**
 * Maclovia / Belleza Maldita — Clipboard Management Module
 * Gestor de portapapeles nativo (Navigator Clipboard API con fallback a textarea ejecutable)
 * y retroalimentación visual inmediata con iconos SVG declarativos.
 */

export function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback clipboard copy failed:', err);
  }
  document.body.removeChild(textArea);
}

/**
 * Gestor de Portapapeles (Copy-to-Clipboard) nativo con retroalimentación inmediata
 * @param {string} text - Texto a copiar al portapapeles
 * @param {HTMLElement} btnElement - Elemento disparador para mostrar retroalimentación
 */
export function copyText(text, btnElement) {
  if (!text) return;

  const triggerFeedback = () => {
    if (!btnElement) return;

    const originalContent = btnElement.innerHTML;
    const isSmallBtn = btnElement.classList.contains('copy-btn') || btnElement.classList.contains('color-swatch-copy');

    if (isSmallBtn) {
      btnElement.innerHTML = `<svg class="icon icon-stroke text-emerald"><use href="assets/icons/sprite.svg#icon-check"></use></svg>`;
    } else {
      btnElement.innerHTML = `
        <svg class="icon icon-stroke text-emerald"><use href="assets/icons/sprite.svg#icon-check"></use></svg>
        <span class="text-emerald font-bold">¡Copiado!</span>
      `;
    }

    setTimeout(() => {
      btnElement.innerHTML = originalContent;
    }, 2000);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(triggerFeedback)
      .catch(() => {
        fallbackCopyText(text);
        triggerFeedback();
      });
  } else {
    fallbackCopyText(text);
    triggerFeedback();
  }
}

// Retrocompatibility alias
export const copyTextToClipboard = copyText;

/**
 * Escucha global delegada para cualquier botón con [data-copy-text]
 * Idempotente: el lazy-load de guidelines la invoca de nuevo sin duplicar.
 */
export function initClipboardListeners() {
  if (document.__macloviaClipboardBound) return;
  document.__macloviaClipboardBound = true;
  document.addEventListener('click', (e) => {
    const copyTarget = e.target.closest('[data-copy-text]');
    if (copyTarget) {
      const textToCopy = copyTarget.getAttribute('data-copy-text');
      copyText(textToCopy, copyTarget);
    }
  });
}
