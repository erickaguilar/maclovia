/**
 * Maclovia / Belleza Maldita — Browser Mockup Module
 * Emulador interactivo de ventana de navegador web: barra de direcciones,
 * cambio reactivo de rutas internas (/studio, /manifesto, /architecture, /licensing),
 * controles de ventana (cerrar, minimizar, expandir), recarga y consola DevTools simulada.
 */

export function initBrowserMockup() {
  const routeButtons = document.querySelectorAll('[data-mockup-route]');
  const urlBarInput = document.getElementById('mockup-url-input');
  const routeViews = document.querySelectorAll('.browser-route-view');

  function navigateBrowserRoute(rawRoute) {
    const route = (rawRoute === '/' || rawRoute === '/home') ? '/studio' : rawRoute;
    if (urlBarInput) {
      urlBarInput.value = `https://maclovia.mx${route}`;
    }

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
  const dotRed = document.querySelector('.browser-dot.dot-red:not(#term-dot-red)');
  const dotYellow = document.querySelector('.browser-dot.dot-yellow:not(#term-dot-yellow)');
  const dotGreen = document.querySelector('.browser-dot.dot-green:not(#term-dot-green)');
  const browserChrome = document.querySelector('.browser-chrome:not(#terminal-window)');
  const browserViewport = document.querySelector('.browser-viewport:not(#cli-viewport)');

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

  return {
    navigateBrowserRoute,
  };
}
