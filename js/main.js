/**
 * Maclovia / Belleza Maldita — Main Native Orchestrator
 * Arquitectura Modular Vanilla • Cero Framework Bloat
 */

import { initI18n, getLanguage } from './i18n.js';
import { initTheme } from './modules/theme.js';
import { initBrandSwitcher, initMobileMenu } from './modules/navigation.js';
import { initCdmxClock, initBackToTop } from './modules/utils.js';
import { initGitHubTelemetry, updateTelemetryUI } from './modules/telemetry.js';
import { renderProjects, initPortfolioFilters } from './modules/portfolio.js';
import { renderCeoProfile } from './modules/team.js';
import { initClipboardListeners } from './modules/clipboard.js';
import { initScrollNarrative } from './modules/scroll-narrative.js';

/**
 * Carga diferida de módulos pesados bajo el fold (guidelines + toolkit).
 * Se disparan al entrar su sección en viewport o de inmediato si el hash
 * apunta a uno de sus tabs (#terminal, #browser, #manual, etc.).
 */
function lazyLoadBelowFold() {
  const pending = new Set();

  const loaders = {
    'guidelines-section': () => import('./modules/guidelines.js').then((m) => m.initMockupTabs()),
    'toolkit-section': () => import('./modules/toolkit.js').then((m) => m.initSvgToolkitWorkbench()),
  };

  const hash = (window.location.hash || '').toLowerCase();
  const wantsGuidelines = ['#terminal', '#opengraph', '#og', '#browser', '#card', '#tarjeta', '#manual', '#normativa', '#mockups', '#escenarios'].includes(hash);

  Object.entries(loaders).forEach(([id, load]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (wantsGuidelines && id === 'guidelines-section') {
      pending.add(load());
      return;
    }
    if (!('IntersectionObserver' in window)) {
      pending.add(load());
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          pending.add(load());
        }
      });
    }, { rootMargin: '400px 0px' });
    io.observe(el);
  });

  // Abre el tab de terminal pedido desde el nav (data-mockup-tab) cuando el chunk llegue
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-mockup-tab]');
    if (!trigger) return;
    window.__pendingMockupTab = trigger.getAttribute('data-mockup-tab');
  });

  return pending;
}

// --- App Bootstrap ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initMobileMenu();
  initBrandSwitcher();
  initCdmxClock();
  initBackToTop();
  initClipboardListeners();
  initPortfolioFilters();

  renderCeoProfile();
  renderProjects('all');
  initGitHubTelemetry();
  initScrollNarrative();
  lazyLoadBelowFold();

  window.addEventListener('languagechange', () => {
    renderCeoProfile();
    const activeFilterBtn = document.querySelector('[data-filter][aria-pressed="true"]');
    const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    renderProjects(filter);
    updateTelemetryUI();

    const animToggleBtn = document.getElementById('toolkit-anim-toggle');
    if (animToggleBtn) {
      const isEn = getLanguage() === 'en';
      const isAnimated = animToggleBtn.textContent.includes('Activa') || animToggleBtn.textContent.includes('Active');
      animToggleBtn.textContent = isAnimated 
        ? (isEn ? 'Animation: Active' : 'Animación: Activa') 
        : (isEn ? 'Animation: Static' : 'Animación: Estática');
    }
  });
});
