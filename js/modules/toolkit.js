/**
 * Maclovia / Belleza Maldita — SVG Toolkit & Wallpaper Studio Module
 * Banco de trabajo de identidad oficial: renderizado interactivo con retícula técnica blueprint,
 * inspección de código (XML, HTML5, React JSX, DataURI Base64), generador de fondos 4K en Canvas
 * y exportador de tokens CSS y JSON.
 *
 * Fachada delgada: los assets viven en toolkit/assets.js,
 * el preview en toolkit/preview.js, las descargas en toolkit/exporters.js
 * y los wallpapers en toolkit/wallpaper.js.
 */

import { MACLOVIA_ASSETS } from './toolkit/assets.js';
import { initPreviewController } from './toolkit/preview.js';
import { initExporters } from './toolkit/exporters.js';
import { initWallpaper } from './toolkit/wallpaper.js';

// Re-exportado por compatibilidad (antes vivía en este módulo)
export { MACLOVIA_ASSETS };

export function initSvgToolkitWorkbench() {
  const els = {
    previewFrame: document.getElementById('toolkit-frame'),
    previewSvg: document.getElementById('toolkit-interactive-svg'),
    assetBtns: document.querySelectorAll('[data-asset-type]'),
    themeBtns: document.querySelectorAll('[data-svg-theme]'),
    sizeBtns: document.querySelectorAll('[data-svg-size]'),
    blueprintToggleBtn: document.getElementById('toolkit-blueprint-toggle'),
    animToggleBtn: document.getElementById('toolkit-anim-toggle'),
    assetBadge: document.getElementById('toolkit-asset-badge'),
    assetTitle: document.getElementById('toolkit-asset-title'),
    assetDesc: document.getElementById('toolkit-asset-desc'),
    downloadBtn: document.getElementById('toolkit-download-btn'),
    downloadPngBtn: document.getElementById('toolkit-download-png-btn'),
    downloadFaviconsBtn: document.getElementById('toolkit-download-favicons-btn'),
    copyXmlBtn: document.getElementById('toolkit-copy-xml-btn'),
    inlineCopyBtn: document.getElementById('toolkit-inline-copy-btn'),
    codeTabs: document.querySelectorAll('.toolkit-code-tab-btn'),
    codePreview: document.getElementById('toolkit-code-display'),
    wallpaperRes: document.getElementById('wallpaper-resolution'),
    wallpaperPalette: document.getElementById('wallpaper-palette'),
    wallpaperGenBtn: document.getElementById('wallpaper-generate-btn'),
    downloadTokensCssBtn: document.getElementById('download-tokens-css-btn'),
    downloadTokensJsonBtn: document.getElementById('download-tokens-json-btn'),
  };

  const state = {
    assetKey: 'mark',
    theme: document.documentElement.getAttribute('data-theme') || 'dark',
    size: 120,
    animated: true,
    blueprint: false,
    codeTab: 'xml',
  };

  initPreviewController(els, state);
  initExporters(els, state);
  initWallpaper(els);
}
