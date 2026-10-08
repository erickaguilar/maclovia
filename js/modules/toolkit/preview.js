/**
 * Maclovia / Belleza Maldita — Toolkit Preview Controller
 * Render del preview, inspector de código y wiring de
 * asset/theme/size/blueprint/animación.
 */

import { getLanguage } from '../../i18n.js';
import { MACLOVIA_ASSETS } from './assets.js';

export function initPreviewController(els, state) {
  const {
    previewFrame,
    previewSvg,
    assetBtns,
    themeBtns,
    sizeBtns,
    blueprintToggleBtn,
    animToggleBtn,
    assetBadge,
    assetTitle,
    assetDesc,
    codeTabs,
    codePreview,
  } = els;

  const getActiveAsset = () => MACLOVIA_ASSETS[state.assetKey] || MACLOVIA_ASSETS.mark;
  const getActiveSvgRaw = () => {
    const asset = getActiveAsset();
    return asset[state.theme] || asset.dark;
  };

  const updatePreview = () => {
    const asset = getActiveAsset();

    if (previewSvg) {
      previewSvg.setAttribute('viewBox', asset.viewBox);

      // Sizing calculation based on aspect ratio with strict bounds
      if (asset.aspectRatio > 1.5) {
        previewSvg.style.width = `min(100%, ${state.size * 2.2}px)`;
        previewSvg.style.height = `min(120px, ${(state.size * 2.2) / asset.aspectRatio}px)`;
      } else {
        previewSvg.style.width = `${state.size}px`;
        previewSvg.style.height = `${state.size}px`;
      }

      const symbolId = state.theme === 'light' ? asset.symbolLight : asset.symbolDark;
      const useEl = previewSvg.querySelector('use');
      if (useEl) {
        useEl.setAttribute('href', `assets/icons/sprite.svg#${symbolId}`);
      }
    }

    if (previewFrame) {
      if (state.theme === 'light') {
        previewFrame.classList.add('light-preview');
      } else {
        previewFrame.classList.remove('light-preview');
      }
    }

    if (assetBadge) assetBadge.textContent = asset.badge;
    if (assetTitle) assetTitle.textContent = asset.title;
    if (assetDesc) assetDesc.textContent = asset.desc;
  };

  const updateCodeDisplay = () => {
    if (!codePreview) return;
    const rawSvg = getActiveSvgRaw();
    const asset = getActiveAsset();

    if (state.codeTab === 'xml') {
      codePreview.textContent = rawSvg.trim();
    } else if (state.codeTab === 'html') {
      codePreview.textContent = `<!-- Embeber en HTML5 (${state.theme.toUpperCase()} MODE) -->\n<div class="maclovia-brand-asset" style="width: ${state.size}px;">\n  ${rawSvg.trim()}\n</div>`;
    } else if (state.codeTab === 'jsx') {
      const componentName = asset.id.charAt(0).toUpperCase() + asset.id.slice(1);
      codePreview.textContent = `// React / Next.js Component\nimport React from 'react';\n\nexport const Maclovia${componentName} = ({ width = ${state.size}, className = '' }) => (\n  <div className={className} style={{ width, display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: \`${rawSvg.replace(/`/g, '\\`')}\` }} />\n);`;
    } else if (state.codeTab === 'datauri') {
      const base64 = btoa(unescape(encodeURIComponent(rawSvg.trim())));
      codePreview.textContent = `data:image/svg+xml;base64,${base64}`;
    }
  };

  const refresh = () => {
    updatePreview();
    updateCodeDisplay();
  };

  // Asset Switcher Buttons
  assetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      assetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.assetKey = btn.getAttribute('data-asset-type') || 'mark';
      refresh();
    });
  });

  // Theme Variant Buttons
  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      themeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.theme = btn.getAttribute('data-svg-theme') || 'dark';
      refresh();
    });
  });

  // Size Selector Buttons
  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-secondary');
      });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary', 'active');
      state.size = parseInt(btn.getAttribute('data-svg-size') || '120', 10);
      refresh();
    });
  });

  // Blueprint Construction Grid Overlay Toggle
  if (blueprintToggleBtn && previewFrame) {
    blueprintToggleBtn.addEventListener('click', () => {
      state.blueprint = !state.blueprint;
      if (state.blueprint) {
        previewFrame.classList.add('blueprint-active');
        blueprintToggleBtn.classList.remove('btn-secondary');
        blueprintToggleBtn.classList.add('btn-primary');
      } else {
        previewFrame.classList.remove('blueprint-active');
        blueprintToggleBtn.classList.remove('btn-primary');
        blueprintToggleBtn.classList.add('btn-secondary');
      }
    });
  }

  // Animation Pulse Toggle
  if (animToggleBtn && previewSvg) {
    animToggleBtn.addEventListener('click', () => {
      state.animated = !state.animated;
      const isEn = getLanguage() === 'en';
      if (state.animated) {
        previewSvg.classList.add('animate-pulse-glow');
        animToggleBtn.textContent = isEn ? 'Animation: Active' : 'Animación: Activa';
      } else {
        previewSvg.classList.remove('animate-pulse-glow');
        animToggleBtn.textContent = isEn ? 'Animation: Static' : 'Animación: Estática';
      }
    });
  }

  // Code Inspector Tab Switching
  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      codeTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.codeTab = tab.getAttribute('data-code-tab') || 'xml';
      updateCodeDisplay();
    });
  });

  // Listen for decoupled global theme changes
  window.addEventListener('maclovia:theme-changed', (e) => {
    if (e.detail && e.detail.theme) {
      state.theme = e.detail.theme;
      refresh();
    }
  });

  refresh();
}
