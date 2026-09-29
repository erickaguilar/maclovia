/**
 * Maclovia / Belleza Maldita — Mockups & Clipboard Interactions (Vanilla State Engine)
 * Cero frameworks • DOM nativo • Iconos SVG declarativos • Fallback seguro
 */

function fallbackCopyText(text) {
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
      btnElement.innerHTML = `<svg class="icon icon-stroke" style="color: #34d399;"><use href="assets/icons/sprite.svg#icon-check"></use></svg>`;
    } else {
      btnElement.innerHTML = `
        <svg class="icon icon-stroke" style="color: #34d399;"><use href="assets/icons/sprite.svg#icon-check"></use></svg>
        <span style="color: #34d399; font-weight: 600;">¡Copiado!</span>
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

// Alias de retrocompatibilidad
export const copyTextToClipboard = copyText;

/**
 * Inicializador de controladores de interactividad y estado para las pestañas de mockups y navegador
 */
export function initMockupTabs() {
  // Main Guidelines vs Mockups Switcher
  const viewBtns = document.querySelectorAll('.guidelines-view-btn');
  const viewSections = document.querySelectorAll('.guidelines-view-content');

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      viewBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      viewSections.forEach((section) => {
        if (section.id === targetView) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  // Mockup Sub-tabs (OpenGraph, Terminal, Browser, Business Card)
  const tabs = document.querySelectorAll('.mockup-tab-btn');
  const panels = document.querySelectorAll('.mockup-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Update tabs active state
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels active state
      panels.forEach((p) => {
        if (p.id === targetId) {
          p.style.display = 'block';
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  // Browser route links within mockup
  const routeButtons = document.querySelectorAll('[data-mockup-route]');
  const urlBarInput = document.getElementById('mockup-url-input');
  const routeViews = document.querySelectorAll('.browser-route-view');

  function navigateBrowserRoute(rawRoute) {
    // Normalizar rutas / /home -> /studio
    const route = (rawRoute === '/' || rawRoute === '/home') ? '/studio' : rawRoute;
    if (urlBarInput) {
      urlBarInput.value = `https://maclovia.mx${route}`;
    }

    // Switch route views con animación limpia
    routeViews.forEach((view) => {
      const vRoute = view.getAttribute('data-route');
      const matches = vRoute === route || 
        ((vRoute === '/' || vRoute === '/studio') && (route === '/' || route === '/studio'));
      if (matches) {
        view.style.display = 'block';
      } else {
        view.style.display = 'none';
      }
    });

    // Update active state on route buttons
    routeButtons.forEach((btn) => {
      const btnRoute = btn.getAttribute('data-mockup-route');
      const matches = btnRoute === rawRoute || 
        ((btnRoute === '/' || btnRoute === '/studio' || btnRoute === '/home') && (rawRoute === '/' || rawRoute === '/studio' || rawRoute === '/home'));
      if (matches) {
        btn.classList.add('active', 'text-rosa');
      } else {
        btn.classList.remove('active', 'text-rosa');
      }
    });
  }

  routeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const route = btn.getAttribute('data-mockup-route');
      navigateBrowserRoute(route);
    });
  });

  // Browser Window Controls (Red / Yellow / Green Dots)
  const dotRed = document.querySelector('.browser-dot.dot-red');
  const dotYellow = document.querySelector('.browser-dot.dot-yellow');
  const dotGreen = document.querySelector('.browser-dot.dot-green');
  const browserChrome = document.querySelector('.browser-chrome');
  const browserViewport = document.querySelector('.browser-viewport');

  if (dotRed) {
    dotRed.setAttribute('title', 'Reiniciar a /studio');
    dotRed.addEventListener('click', () => {
      navigateBrowserRoute('/studio');
      if (browserViewport) {
        browserViewport.classList.remove('minimized');
        browserViewport.style.opacity = '0.4';
        setTimeout(() => {
          browserViewport.style.opacity = '1';
        }, 200);
      }
    });
  }

  if (dotYellow) {
    dotYellow.setAttribute('title', 'Minimizar / Restaurar Vista');
    dotYellow.addEventListener('click', () => {
      if (browserViewport) {
        browserViewport.classList.toggle('minimized');
      }
    });
  }

  if (dotGreen) {
    dotGreen.setAttribute('title', 'Expandir / Ancho Completo');
    dotGreen.addEventListener('click', () => {
      if (browserChrome) {
        browserChrome.classList.toggle('expanded');
      }
    });
  }

  // Browser Refresh Button Simulation
  const refreshBtn = document.getElementById('browser-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('animate-spin');
      const activeView = document.querySelector('.browser-route-view:not([style*="display: none"])');
      if (activeView) {
        activeView.style.opacity = '0.3';
        setTimeout(() => {
          activeView.style.opacity = '1';
        }, 350);
      }
      setTimeout(() => {
        refreshBtn.classList.remove('animate-spin');
      }, 600);
    });
  }

  // Browser DevTools Toggle
  const devToolsBtn = document.getElementById('browser-devtools-toggle');
  const devToolsPanel = document.getElementById('browser-devtools-panel');
  const devToolsCloseBtn = document.getElementById('browser-devtools-close');

  if (devToolsBtn && devToolsPanel) {
    devToolsBtn.addEventListener('click', () => {
      const isVisible = devToolsPanel.style.display === 'block';
      devToolsPanel.style.display = isVisible ? 'none' : 'block';
      devToolsBtn.classList.toggle('active', !isVisible);
    });
  }

  if (devToolsCloseBtn && devToolsPanel) {
    devToolsCloseBtn.addEventListener('click', () => {
      devToolsPanel.style.display = 'none';
      if (devToolsBtn) devToolsBtn.classList.remove('active');
    });
  }

  // Global delegate for copy buttons
  document.addEventListener('click', (e) => {
    const copyTarget = e.target.closest('[data-copy-text]');
    if (copyTarget) {
      const textToCopy = copyTarget.getAttribute('data-copy-text');
      copyText(textToCopy, copyTarget);
    }
  });
}
