/**
 * Maclovia / Belleza Maldita — Brand Guidelines & Mockup Tabs Orchestrator
 * Control de pestañas del Manual de Marca (Mockups interactivos vs Manual Normativo),
 * sub-pestañas (Terminal, OpenGraph, Navegador, Tarjeta) y navegación mediante Hash URL.
 */

import { initInteractiveTerminal } from './terminal.js';
import { initBrowserMockup } from './browser-mockup.js';
import { copyText, initClipboardListeners } from './clipboard.js';

/**
 * Activa un tab dentro de un tablist: actualiza .active, aria-selected,
 * tabindex y el atributo hidden de los paneles asociados.
 */
function activateTab(btns, panels, targetBtn, panelIdAttr) {
  btns.forEach((b) => {
    const on = b === targetBtn;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
    if (on) {
      b.removeAttribute('tabindex');
    } else {
      b.setAttribute('tabindex', '-1');
    }
  });
  panels.forEach((p) => {
    const show = targetBtn && p.id === targetBtn.getAttribute(panelIdAttr);
    p.classList.toggle('active', !!show);
    if (show) {
      p.removeAttribute('hidden');
    } else {
      p.setAttribute('hidden', '');
    }
  });
}

/**
 * Navegación por teclado en tablists (ArrowLeft/Right/Home/End, patrón APG).
 */
function initTablistKeyboard(tablist, btns, onActivate) {
  if (!tablist) return;
  tablist.addEventListener('keydown', (e) => {
    const current = btns.indexOf(document.activeElement);
    if (current === -1) return;
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % btns.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + btns.length) % btns.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = btns.length - 1;
    if (next === -1) return;
    e.preventDefault();
    btns[next].focus();
    onActivate(btns[next]);
  });
}

/**
 * Cambia la vista principal de la sección de Guidelines ('mockups-sub-section' o 'guidelines-sub-section')
 * @param {'mockups-sub-section' | 'guidelines-sub-section'} targetView
 */
export function switchGuidelinesView(targetView) {
  const guidelinesSection = document.getElementById('guidelines-section');
  if (!guidelinesSection) return;

  const validViews = ['mockups-sub-section', 'guidelines-sub-section'];
  const finalView = validViews.includes(targetView) ? targetView : 'mockups-sub-section';

  const viewBtns = Array.from(guidelinesSection.querySelectorAll('.guidelines-view-btn[data-view]'));
  const viewSections = Array.from(guidelinesSection.querySelectorAll('.guidelines-view-content'));
  const targetBtn = viewBtns.find((b) => b.getAttribute('data-view') === finalView) || null;
  activateTab(viewBtns, viewSections, targetBtn, 'data-view');
}

/**
 * Cambia la sub-pestaña de mockups activa ('tab-terminal', 'tab-opengraph', 'tab-browser', 'tab-card')
 * @param {string} targetTabId
 */
export function switchMockupTab(targetTabId) {
  const guidelinesSection = document.getElementById('guidelines-section');
  if (!guidelinesSection) return;

  const tabs = Array.from(guidelinesSection.querySelectorAll('.mockup-tab-btn[data-tab]'));
  const panels = Array.from(guidelinesSection.querySelectorAll('.mockup-panel'));

  let targetBtn = tabs.find((t) => t.getAttribute('data-tab') === targetTabId) || null;
  if (!targetBtn && tabs.length > 0) {
    targetTabId = 'tab-terminal';
    targetBtn = tabs[0];
  }
  activateTab(tabs, panels, targetBtn, 'data-tab');

  if (targetTabId === 'tab-terminal') {
    const cliInput = document.getElementById('cli-input');
    if (cliInput && document.activeElement && document.activeElement.getAttribute('role') === 'tab') {
      setTimeout(() => cliInput.focus(), 50);
    }
  }
}

/**
 * Inicializador de controladores de interactividad y estado para las pestañas de mockups y navegador
 */
export function initMockupTabs() {
  const guidelinesSection = document.getElementById('guidelines-section');
  if (!guidelinesSection) return;

  // Main Guidelines vs Mockups Switcher (Scoped estrictamente a #guidelines-section con [data-view])
  const viewBtns = Array.from(guidelinesSection.querySelectorAll('.guidelines-view-btn[data-view]'));

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.getAttribute('data-view');
      if (!targetView) return;
      switchGuidelinesView(targetView);
    });
  });

  // Mockup Sub-tabs (Scoped estrictamente a #guidelines-section con [data-tab])
  const tabs = Array.from(guidelinesSection.querySelectorAll('.mockup-tab-btn[data-tab]'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-tab');
      if (!targetId) return;
      switchMockupTab(targetId);
    });
  });

  // Navegación por teclado (APG tablist)
  initTablistKeyboard(
    guidelinesSection.querySelector('.guidelines-view-switcher'),
    viewBtns,
    (btn) => switchGuidelinesView(btn.getAttribute('data-view'))
  );
  initTablistKeyboard(
    guidelinesSection.querySelector('.mockup-tabs'),
    tabs,
    (btn) => switchMockupTab(btn.getAttribute('data-tab'))
  );

  // Handle URL hash routing (#manual, #mockups, etc.)
  function handleHashNavigation() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#manual' || hash === '#normativa' || hash === '#guidelines-manual' || hash === '#manual-normativa') {
      switchGuidelinesView('guidelines-sub-section');
    } else if (hash === '#mockups' || hash === '#escenarios') {
      switchGuidelinesView('mockups-sub-section');
    } else if (hash === '#terminal' || hash === '#tab-terminal' || hash === '#cli') {
      switchGuidelinesView('mockups-sub-section');
      switchMockupTab('tab-terminal');
    } else if (hash === '#opengraph' || hash === '#og' || hash === '#tab-opengraph') {
      switchGuidelinesView('mockups-sub-section');
      switchMockupTab('tab-opengraph');
    } else if (hash === '#browser' || hash === '#tab-browser') {
      switchGuidelinesView('mockups-sub-section');
      switchMockupTab('tab-browser');
    } else if (hash === '#card' || hash === '#tarjeta' || hash === '#tab-card') {
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
    if (mockupsView.hidden && guidelinesView.hidden) {
      switchGuidelinesView('mockups-sub-section');
    }
  }

  // Initialize Browser Mockup Navigation & Chrome
  initBrowserMockup();

  // Initialize Interactive Terminal Shell
  initInteractiveTerminal();

  // Initialize delegated clipboard copy handlers
  initClipboardListeners();

  // Tab pedido desde el nav (data-mockup-tab) antes de que el chunk cargara
  if (window.__pendingMockupTab) {
    switchGuidelinesView('mockups-sub-section');
    switchMockupTab(window.__pendingMockupTab);
    window.__pendingMockupTab = null;
  }
}
