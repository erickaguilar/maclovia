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
import { initSvgToolkitWorkbench } from './modules/toolkit.js';
import { initMockupTabs } from './modules/guidelines.js';

// --- App Bootstrap ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initMobileMenu();
  initBrandSwitcher();
  initCdmxClock();
  initBackToTop();
  initMockupTabs();
  initPortfolioFilters();
  initSvgToolkitWorkbench();

  renderCeoProfile();
  renderProjects('all');
  initGitHubTelemetry();

  window.addEventListener('languagechange', () => {
    renderCeoProfile();
    const activeFilterBtn = document.querySelector('[data-filter].btn-primary');
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
