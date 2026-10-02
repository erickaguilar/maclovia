/**
 * Maclovia / Belleza Maldita — Theme Management Module
 * Gestiona el conmutador de tema (Obsidiana / Cosmic Latte), persistencia en localStorage,
 * adaptación del isotipo SVG y sincronización con el Shell CLI interactivo.
 */

export function initTheme() {
  const savedTheme = localStorage.getItem('maclovia_theme') || 'dark';
  applyTheme(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Listener for interactive CLI theme change
  window.addEventListener('maclovia:set-theme', (e) => {
    if (e.detail && (e.detail.theme === 'light' || e.detail.theme === 'dark')) {
      applyTheme(e.detail.theme);
    }
  });
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('maclovia_theme', theme);

  const iconUse = document.querySelector('#theme-toggle-btn use');
  if (iconUse) {
    iconUse.setAttribute('href', theme === 'dark' ? 'assets/icons/sprite.svg#icon-sun' : 'assets/icons/sprite.svg#icon-moon');
  }

  // Update site marks if they use the adaptive symbol
  const markSymbolId = theme === 'light' ? 'icon-maclovia-mark-light' : 'icon-maclovia-mark-dark';
  document.querySelectorAll(
    '.site-brand-logo use, .brand-link use, .footer-brand-logo use, .glow-rosa use, svg.glow-rosa use, .text-rosa.glow-rosa use, [class*="glow-rosa"] use, .og-card-frame svg use, .stationery-card svg use, .browser-chrome svg use'
  ).forEach((use) => {
    const currentHref = use.getAttribute('href') || '';
    if (currentHref.includes('icon-maclovia-mark')) {
      use.setAttribute('href', `assets/icons/sprite.svg#${markSymbolId}`);
    }
  });

  // Sync meta theme-color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'light' ? '#FFF8E7' : '#070709');
  }

  // Broadcast theme change to decoupled modules (e.g. SVG toolkit)
  window.dispatchEvent(new CustomEvent('maclovia:theme-changed', { detail: { theme } }));
}
