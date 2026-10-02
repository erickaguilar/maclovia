/**
 * Maclovia / Belleza Maldita — Brand Guidelines & Mockup Tabs Orchestrator
 * Control de pestañas del Manual de Marca (Mockups interactivos vs Manual Normativo),
 * sub-pestañas (Terminal, OpenGraph, Navegador, Tarjeta) y navegación mediante Hash URL.
 */

import { initInteractiveTerminal } from './terminal.js';
import { initBrowserMockup } from './browser-mockup.js';
import { copyText, initClipboardListeners } from './clipboard.js';

/**
 * Cambia la vista principal de la sección de Guidelines ('mockups-sub-section' o 'guidelines-sub-section')
 * @param {'mockups-sub-section' | 'guidelines-sub-section'} targetView
 */
export function switchGuidelinesView(targetView) {
  const guidelinesSection = document.getElementById('guidelines-section');
  if (!guidelinesSection) return;

  const validViews = ['mockups-sub-section', 'guidelines-sub-section'];
  const finalView = validViews.includes(targetView) ? targetView : 'mockups-sub-section';

  const viewBtns = guidelinesSection.querySelectorAll('.guidelines-view-btn[data-view]');
  const viewSections = guidelinesSection.querySelectorAll('.guidelines-view-content');

  viewBtns.forEach((b) => {
    if (b.getAttribute('data-view') === finalView) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  viewSections.forEach((section) => {
    if (section.id === finalView) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

/**
 * Cambia la sub-pestaña de mockups activa ('tab-terminal', 'tab-opengraph', 'tab-browser', 'tab-card')
 * @param {string} targetTabId
 */
export function switchMockupTab(targetTabId) {
  const guidelinesSection = document.getElementById('guidelines-section');
  if (!guidelinesSection) return;

  const tabs = guidelinesSection.querySelectorAll('.mockup-tab-btn[data-tab]');
  const panels = guidelinesSection.querySelectorAll('.mockup-panel');

  let matched = false;
  tabs.forEach((t) => {
    if (t.getAttribute('data-tab') === targetTabId) {
      t.classList.add('active');
      matched = true;
    } else {
      t.classList.remove('active');
    }
  });

  if (!matched && tabs.length > 0) {
    targetTabId = 'tab-terminal';
    tabs[0].classList.add('active');
  }

  panels.forEach((p) => {
    if (p.id === targetTabId) {
      p.style.display = 'block';
      if (targetTabId === 'tab-terminal') {
        const cliInput = document.getElementById('cli-input');
        if (cliInput) setTimeout(() => cliInput.focus(), 50);
      }
    } else {
      p.style.display = 'none';
    }
  });
}

/**
 * Inicializador de controladores de interactividad y estado para las pestañas de mockups y navegador
 */
export function initMockupTabs() {
  const guidelinesSection = document.getElementById('guidelines-section');
  if (!guidelinesSection) return;

  // Main Guidelines vs Mockups Switcher (Scoped estrictamente a #guidelines-section con [data-view])
  const viewBtns = guidelinesSection.querySelectorAll('.guidelines-view-btn[data-view]');

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.getAttribute('data-view');
      if (!targetView) return;
      switchGuidelinesView(targetView);
    });
  });

  // Mockup Sub-tabs (Scoped estrictamente a #guidelines-section con [data-tab])
  const tabs = guidelinesSection.querySelectorAll('.mockup-tab-btn[data-tab]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-tab');
      if (!targetId) return;
      switchMockupTab(targetId);
    });
  });

  // Handle URL hash routing (#manual, #mockups, etc.)
  function handleHashNavigation() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#manual' || hash === '#normativa' || hash === '#guidelines-manual' || hash === '#manual-normativa') {
      switchGuidelinesView('guidelines-sub-section');
    } else if (hash === '#mockups' || hash === '#escenarios') {
      switchGuidelinesView('mockups-sub-section');
    } else if (hash === '#terminal') {
      switchGuidelinesView('mockups-sub-section');
      switchMockupTab('tab-terminal');
    } else if (hash === '#opengraph' || hash === '#og') {
      switchGuidelinesView('mockups-sub-section');
      switchMockupTab('tab-opengraph');
    } else if (hash === '#browser') {
      switchGuidelinesView('mockups-sub-section');
      switchMockupTab('tab-browser');
    } else if (hash === '#card' || hash === '#tarjeta') {
      switchGuidelinesView('mockups-sub-section');
      switchMockupTab('tab-card');
    }
  }

  // Initial Hash Check & State Fallback
  handleHashNavigation();
  window.addEventListener('hashchange', handleHashNavigation);

  // Fallback verification: asegurar que al menos una vista esté visible
  const mockupsView = document.getElementById('mockups-sub-section');
  const guidelinesView = document.getElementById('guidelines-sub-section');
  if (mockupsView && guidelinesView) {
    const isMockupsVisible = mockupsView.style.display !== 'none';
    const isGuidelinesVisible = guidelinesView.style.display !== 'none';
    if (!isMockupsVisible && !isGuidelinesVisible) {
      mockupsView.style.display = 'block';
      const defaultBtn = guidelinesSection.querySelector('.guidelines-view-btn[data-view="mockups-sub-section"]');
      if (defaultBtn) defaultBtn.classList.add('active');
    }
  }

  // Initialize Browser Mockup Navigation & Chrome
  initBrowserMockup();

  // Initialize Interactive Terminal Shell
  initInteractiveTerminal();

  // Initialize delegated clipboard copy handlers
  initClipboardListeners();
}
