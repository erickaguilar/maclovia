/**
 * Maclovia / Belleza Maldita — Toolkit Exporters
 * Descargas SVG/PNG/favicons, copia XML y exportación de tokens CSS/JSON.
 */

import { copyTextToClipboard } from '../clipboard.js';
import { MACLOVIA_ASSETS } from './assets.js';

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function initExporters(els, state) {
  const {
    downloadBtn,
    downloadPngBtn,
    downloadFaviconsBtn,
    copyXmlBtn,
    inlineCopyBtn,
    codePreview,
    downloadTokensCssBtn,
    downloadTokensJsonBtn,
  } = els;

  const getActiveAsset = () => MACLOVIA_ASSETS[state.assetKey] || MACLOVIA_ASSETS.mark;
  const getActiveSvgRaw = () => {
    const asset = getActiveAsset();
    return asset[state.theme] || asset.dark;
  };

  // Download SVG
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const rawSvg = getActiveSvgRaw();
      const asset = getActiveAsset();
      const blob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, `${asset.filename}-${state.theme}.svg`);
      URL.revokeObjectURL(url);
    });
  }

  // Download PNG (High-Resolution Canvas Rasterizer: 1024x1024)
  if (downloadPngBtn) {
    downloadPngBtn.addEventListener('click', () => {
      const rawSvg = getActiveSvgRaw();
      const asset = getActiveAsset();
      const canvas = document.createElement('canvas');
      const targetWidth = asset.aspectRatio > 1.5 ? 1600 : 1024;
      const targetHeight = Math.round(targetWidth / asset.aspectRatio);

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      downloadPngBtn.disabled = true;
      const origText = downloadPngBtn.innerHTML;
      downloadPngBtn.innerHTML = '<span>Generando PNG...</span>';

      img.onload = () => {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            const pngUrl = URL.createObjectURL(pngBlob);
            triggerDownload(pngUrl, `${asset.filename}-${state.theme}-${targetWidth}px.png`);
            URL.revokeObjectURL(pngUrl);
          }
          URL.revokeObjectURL(url);
          downloadPngBtn.disabled = false;
          downloadPngBtn.innerHTML = origText;
        }, 'image/png');
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        downloadPngBtn.disabled = false;
        downloadPngBtn.innerHTML = origText;
      };

      img.src = url;
    });
  }

  // Download Web Favicons Kit
  if (downloadFaviconsBtn) {
    downloadFaviconsBtn.addEventListener('click', () => {
      const rawSvg = MACLOVIA_ASSETS.mark[state.theme] || MACLOVIA_ASSETS.mark.dark;
      const sizes = [16, 32, 64, 180, 192, 512];
      const origText = downloadFaviconsBtn.innerHTML;
      downloadFaviconsBtn.disabled = true;
      downloadFaviconsBtn.innerHTML = '<span>Generando Kit...</span>';

      let rendered = 0;
      const img = new Image();
      const svgBlob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        sizes.forEach((s) => {
          const canvas = document.createElement('canvas');
          canvas.width = s;
          canvas.height = s;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, s, s);
            canvas.toBlob((blob) => {
              if (blob) {
                const fUrl = URL.createObjectURL(blob);
                triggerDownload(fUrl, `favicon-${s}x${s}.png`);
                URL.revokeObjectURL(fUrl);
              }
              rendered++;
              if (rendered >= sizes.length) {
                URL.revokeObjectURL(url);
                downloadFaviconsBtn.disabled = false;
                downloadFaviconsBtn.innerHTML = origText;
              }
            }, 'image/png');
          }
        });
      };
      img.src = url;
    });
  }

  // Copy XML Button
  if (copyXmlBtn) {
    copyXmlBtn.addEventListener('click', () => {
      const rawSvg = getActiveSvgRaw();
      copyTextToClipboard(rawSvg, copyXmlBtn);
    });
  }

  // Copy Inline Code Inspector Button
  if (inlineCopyBtn && codePreview) {
    inlineCopyBtn.addEventListener('click', () => {
      copyTextToClipboard(codePreview.textContent || '', inlineCopyBtn);
    });
  }

  // Direct Tokens CSS & JSON Exporters
  if (downloadTokensCssBtn) {
    downloadTokensCssBtn.addEventListener('click', () => {
      const cssContent = `/**
 * MACLOVIA. Belleza Maldita — Design Tokens (CSS Custom Properties)
 * Ciudad de México • Zero-Obsolescence Design System
 */

:root {
  /* Brand Core Palette */
  --color-rosa-mexicano: #E4007C;
  --color-rosa-chilango: #E4007C;
  --color-rosa-light: #FF4DA6;
  --color-rosa-dark: #A60058;
  --color-rosa-subtle: rgba(228, 0, 124, 0.08);
  --color-rosa-border: rgba(228, 0, 124, 0.25);

  /* Obsidian Mode (Dark) */
  --bg-obsidian-root: #050505;
  --bg-obsidian-surface: #0a0a0a;
  --bg-obsidian-card: #0d0d0f;
  --border-obsidian: rgba(255, 255, 255, 0.08);

  /* Cosmic Latte Mode (Light) */
  --bg-cosmic-latte-root: #FFF8E7;
  --bg-cosmic-latte-surface: #FFFDF7;
  --bg-cosmic-latte-card: rgba(255, 252, 245, 0.94);
  --border-cosmic-latte: rgba(120, 95, 60, 0.12);

  /* Typography Stacks */
  --font-editorial: 'Abril Fatface', Georgia, serif;
  --font-script: 'Tipo Movin CDMX', 'Space Grotesk', sans-serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Fira Code', ui-monospace, monospace;
}
`;
      const blob = new Blob([cssContent], { type: 'text/css;charset=utf-8' });
      triggerDownload(URL.createObjectURL(blob), 'maclovia-tokens.css');
    });
  }

  if (downloadTokensJsonBtn) {
    downloadTokensJsonBtn.addEventListener('click', () => {
      const jsonContent = JSON.stringify({
        name: "Maclovia / Belleza Maldita Design Tokens",
        version: "1.1.0",
        author: "Erick Jonathan Aguilar García",
        location: "Ciudad de México (CDMX)",
        tokens: {
          color: {
            brand: {
              rosaChilango: { value: "#E4007C", pantone: "806 C", rgb: [228, 0, 124] },
              rosaNeon: { value: "#FF4DA6", rgb: [255, 77, 166] },
              rosaProfundo: { value: "#A60058", rgb: [166, 0, 88] }
            },
            obsidian: {
              root: { value: "#050505" },
              surface: { value: "#0A0A0A" },
              card: { value: "#0D0D0F" }
            },
            cosmicLatte: {
              root: { value: "#FFF8E7", name: "Cosmic Latte", description: "Average color of the universe" },
              surface: { value: "#FFFDF7" }
            }
          },
          typography: {
            editorial: { font: "Abril Fatface", fallback: "Georgia, serif" },
            script: { font: "Tipo Movin CDMX", fallback: "'Space Grotesk', sans-serif", note: "SEMOVI / Lance Wyman CDMX" },
            sans: { font: "Inter", fallback: "sans-serif" },
            mono: { font: "Fira Code", fallback: "monospace" }
          }
        }
      }, null, 2);

      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
      triggerDownload(URL.createObjectURL(blob), 'maclovia-tokens.json');
    });
  }
}
