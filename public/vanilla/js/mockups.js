/**
 * Maclovia / Belleza Maldita — Mockups & Interactive CLI Terminal Facade
 * Arquitectura Modular Vanilla • Cero Framework Bloat
 * Re-exporta los submódulos especializados preservando compatibilidad retroactiva.
 */

export { copyText, copyTextToClipboard, initClipboardListeners } from './modules/clipboard.js';
export { initInteractiveTerminal, ASCII_BANNER, AVAILABLE_COMMANDS } from './modules/terminal.js';
export { initBrowserMockup } from './modules/browser-mockup.js';
export { switchGuidelinesView, switchMockupTab, initMockupTabs } from './modules/guidelines.js';
