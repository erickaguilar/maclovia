/**
 * Maclovia / Belleza Maldita — Toolkit Wallpaper Studio
 * Generador de fondos 4K en Canvas con retícula, sigilo y tipografía.
 */

import { MACLOVIA_ASSETS } from './assets.js';

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function initWallpaper({ wallpaperRes, wallpaperPalette, wallpaperGenBtn }) {
  if (!(wallpaperGenBtn && wallpaperRes && wallpaperPalette)) return;

  wallpaperGenBtn.addEventListener('click', () => {
    const res = wallpaperRes.value;
    const palette = wallpaperPalette.value;

    const isMobile = res === 'mobile-retina';
    const width = isMobile ? 1170 : 3840;
    const height = isMobile ? 2532 : 2160;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const origText = wallpaperGenBtn.innerHTML;
    wallpaperGenBtn.innerHTML = '<span>Renderizando 4K...</span>';

    // Background Tone
    let bgColor = '#070709';
    let sigilTheme = 'dark';
    if (palette === 'void') {
      bgColor = '#000000';
    } else if (palette === 'alabaster') {
      bgColor = '#FFF8E7';
      sigilTheme = 'light';
    }

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Ambient radial gradient glow in the center
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) * 0.45);
    if (palette === 'alabaster') {
      gradient.addColorStop(0, 'rgba(228, 0, 124, 0.12)');
      gradient.addColorStop(1, 'rgba(255, 248, 231, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(228, 0, 124, 0.22)');
      gradient.addColorStop(0.5, 'rgba(228, 0, 124, 0.06)');
      gradient.addColorStop(1, 'rgba(7, 7, 9, 0)');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Fine Background Grid
    ctx.strokeStyle = palette === 'alabaster' ? 'rgba(228, 0, 124, 0.04)' : 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    const step = isMobile ? 60 : 120;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Sigil Mark in Center
    const markSvg = MACLOVIA_ASSETS.mark[sigilTheme] || MACLOVIA_ASSETS.mark.dark;
    const img = new Image();
    const markBlob = new Blob([markSvg], { type: 'image/svg+xml;charset=utf-8' });
    const markUrl = URL.createObjectURL(markBlob);

    img.onload = () => {
      const markSize = isMobile ? Math.min(width * 0.65, 600) : 580;
      const markX = (width - markSize) / 2;
      const markY = (height - markSize) / 2 - (isMobile ? 120 : 60);

      ctx.drawImage(img, markX, markY, markSize, markSize);

      // Typography Footer on Wallpaper
      ctx.font = `900 ${isMobile ? 48 : 56}px 'Abril Fatface', Georgia, serif`;
      ctx.fillStyle = palette === 'alabaster' ? '#181511' : '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '4px';
      ctx.fillText('MACLOVIA.', width / 2, markY + markSize + (isMobile ? 100 : 90));

      ctx.font = `700 ${isMobile ? 38 : 42}px 'Tipo Movin CDMX', 'Space Grotesk', sans-serif`;
      ctx.fillStyle = '#E4007C';
      ctx.letterSpacing = '2px';
      ctx.fillText('Belleza Maldita', width / 2, markY + markSize + (isMobile ? 160 : 145));

      ctx.font = `600 ${isMobile ? 18 : 20}px 'Space Grotesk', monospace`;
      ctx.fillStyle = palette === 'alabaster' ? 'rgba(24, 21, 17, 0.45)' : 'rgba(255, 255, 255, 0.4)';
      ctx.letterSpacing = '6px';
      ctx.fillText('19.4326° N, 99.1332° W • CIUDAD DE MÉXICO • ZERO-OBSOLESCENCE MONOLITH', width / 2, height - (res === 'mobile-retina' ? 120 : 135));

      canvas.toBlob((wBlob) => {
        if (wBlob) {
          const wUrl = URL.createObjectURL(wBlob);
          triggerDownload(wUrl, `maclovia-wallpaper-${res}-${palette}.png`);
          URL.revokeObjectURL(wUrl);
        }
        URL.revokeObjectURL(markUrl);
        wallpaperGenBtn.innerHTML = origText;
      }, 'image/png');
    };
    img.src = markUrl;
  });
}
