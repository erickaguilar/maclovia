/**
 * Maclovia / Belleza Maldita — SVG Toolkit & Wallpaper Studio Module
 * Banco de trabajo de identidad oficial: renderizado interactivo con retícula técnica blueprint,
 * inspección de código (XML, HTML5, React JSX, DataURI Base64), generador de fondos 4K en Canvas
 * y exportador de tokens CSS y JSON.
 */

import { getLanguage } from '../i18n.js';
import { copyTextToClipboard } from './clipboard.js';

export const MACLOVIA_ASSETS = {
  mark: {
    id: 'mark',
    badge: 'ASSET 01 · VECTOR MAESTRO',
    title: "Isotipo Pentagonal Glifo Mexica Tepētl (Vectorial SVG)",
    desc: "Escudo pentagonal con el glifo mexica Tepētl (Cerro Sagrado / Montaña de la Civilización) de los códices de la Gran Tenochtitlan. Su silueta forja la letra 'M' monumental de Maclovia y México: dos volcanes sagrados (Iztaccíhuatl y Popocatépetl), el portal interior de origen Ōztōtl y el chalchihuite solar en Rosa Chilango neón y obsidiana volcánica.",
    viewBox: '0 0 200 200',
    aspectRatio: 1,
    symbolDark: 'icon-maclovia-mark',
    symbolLight: 'icon-maclovia-mark-light',
    filename: 'maclovia-tepetl-mark',
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="maclovia-obsidian-glow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1F0314" />
      <stop offset="65%" stop-color="#0C0208" />
      <stop offset="100%" stop-color="#050505" />
    </radialGradient>
    <linearGradient id="maclovia-pentagon-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4DA6" />
      <stop offset="50%" stop-color="#E4007C" />
      <stop offset="100%" stop-color="#7D003F" />
    </linearGradient>
    <linearGradient id="maclovia-sigil-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF66B8" />
      <stop offset="40%" stop-color="#FF2B92" />
      <stop offset="100%" stop-color="#E4007C" />
    </linearGradient>
    <linearGradient id="maclovia-sigil-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B8005F" />
      <stop offset="50%" stop-color="#75003A" />
      <stop offset="100%" stop-color="#3B001D" />
    </linearGradient>
  </defs>
  <polygon points="100,14 182,73 151,170 49,170 18,73" fill="url(#maclovia-obsidian-glow)" stroke="url(#maclovia-pentagon-stroke)" stroke-width="4.5" stroke-linejoin="round" />
  <polygon points="100,26 170,77 144,160 56,160 30,77" fill="none" stroke="#E4007C" stroke-width="1.5" stroke-dasharray="5 3.5" opacity="0.6" stroke-linejoin="round" />
  <circle cx="100" cy="14" r="4.2" fill="#FFF8E7" stroke="#FF4DA6" stroke-width="1.5" />
  <circle cx="182" cy="73" r="3.5" fill="#FF66B8" />
  <circle cx="151" cy="170" r="3.5" fill="#E4007C" />
  <circle cx="49" cy="170" r="3.5" fill="#E4007C" />
  <circle cx="18" cy="73" r="3.5" fill="#FF66B8" />
  <g id="sigil-tepetl-body">
    <path fill-rule="evenodd" fill="url(#maclovia-sigil-light)" d="M 64 141 L 64 88 L 68 88 L 68 75 C 68 62, 84 62, 84 75 L 84 94 L 100 114 L 116 94 L 116 75 C 116 62, 132 62, 132 75 L 132 88 L 136 88 L 136 141 L 123 141 L 123 100 L 112 116 C 106 124, 94 124, 88 116 L 77 100 L 77 141 Z" />
    <path fill="url(#maclovia-sigil-dark)" opacity="0.88" d="M 76 75 L 84 75 C 84 62, 76 62, 76 62 Z M 80 88 L 84 94 L 100 114 L 96 114 L 80 94 Z M 123 100 L 136 88 L 136 141 L 123 141 Z M 116 75 C 116 62, 132 62, 132 75 L 132 88 L 124 88 L 124 75 Z" />
    <path d="M 88 141 L 88 122 C 88 115, 112 115, 112 122 L 112 141 Z" fill="#0C0208" stroke="url(#maclovia-sigil-light)" stroke-width="1.5" />
    <rect x="62" y="139" width="76" height="3" rx="1.5" fill="#FFF8E7" opacity="0.95" />
    <circle cx="100" cy="80" r="5" fill="#FFF8E7" stroke="#FF4DA6" stroke-width="1.8" />
    <circle cx="100" cy="80" r="2" fill="#E4007C" />
    <line x1="100" y1="71" x2="100" y2="74" stroke="#FFF8E7" stroke-width="1.2" />
    <line x1="100" y1="86" x2="100" y2="89" stroke="#FFF8E7" stroke-width="1.2" />
    <line x1="91" y1="80" x2="94" y2="80" stroke="#FFF8E7" stroke-width="1.2" />
    <line x1="106" y1="80" x2="109" y2="80" stroke="#FFF8E7" stroke-width="1.2" />
    <line x1="76" y1="75" x2="76" y2="139" stroke="#FFF8E7" stroke-width="1.2" opacity="0.9" />
    <line x1="124" y1="75" x2="124" y2="139" stroke="#FFF8E7" stroke-width="1.2" opacity="0.9" />
  </g>
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="maclovia-light-medallion" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="50%" stop-color="#FFF8E7" />
      <stop offset="100%" stop-color="#F2E6CE" />
    </radialGradient>
    <linearGradient id="maclovia-light-pentagon-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF2B92" />
      <stop offset="50%" stop-color="#E4007C" />
      <stop offset="100%" stop-color="#A60058" />
    </linearGradient>
    <linearGradient id="maclovia-light-sigil-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E4007C" />
      <stop offset="40%" stop-color="#D10070" />
      <stop offset="100%" stop-color="#A80058" />
    </linearGradient>
    <linearGradient id="maclovia-light-sigil-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7D003F" />
      <stop offset="50%" stop-color="#57002C" />
      <stop offset="100%" stop-color="#38001C" />
    </linearGradient>
  </defs>
  <polygon points="100,14 182,73 151,170 49,170 18,73" fill="url(#maclovia-light-medallion)" stroke="url(#maclovia-light-pentagon-stroke)" stroke-width="4.5" stroke-linejoin="round" />
  <polygon points="100,26 170,77 144,160 56,160 30,77" fill="none" stroke="#E4007C" stroke-width="1.5" stroke-dasharray="5 3.5" opacity="0.55" stroke-linejoin="round" />
  <circle cx="100" cy="14" r="4.2" fill="#FFF8E7" stroke="#FF2B92" stroke-width="1.5" />
  <circle cx="182" cy="73" r="3.5" fill="#FF2B92" />
  <circle cx="151" cy="170" r="3.5" fill="#C2006A" />
  <circle cx="49" cy="170" r="3.5" fill="#C2006A" />
  <circle cx="18" cy="73" r="3.5" fill="#FF2B92" />
  <g>
    <path fill-rule="evenodd" fill="url(#maclovia-light-sigil-light)" d="M 64 141 L 64 88 L 68 88 L 68 75 C 68 62, 84 62, 84 75 L 84 94 L 100 114 L 116 94 L 116 75 C 116 62, 132 62, 132 75 L 132 88 L 136 88 L 136 141 L 123 141 L 123 100 L 112 116 C 106 124, 94 124, 88 116 L 77 100 L 77 141 Z" />
    <path fill="url(#maclovia-light-sigil-dark)" opacity="0.88" d="M 76 75 L 84 75 C 84 62, 76 62, 76 62 Z M 80 88 L 84 94 L 100 114 L 96 114 L 80 94 Z M 123 100 L 136 88 L 136 141 L 123 141 Z M 116 75 C 116 62, 132 62, 132 75 L 132 88 L 124 88 L 124 75 Z" />
    <path d="M 88 141 L 88 122 C 88 115, 112 115, 112 122 L 112 141 Z" fill="#FFFDF7" stroke="#E4007C" stroke-width="1.5" />
    <rect x="62" y="139" width="76" height="3" rx="1.5" fill="#FFF8E7" stroke="#E4007C" stroke-width="0.5" />
    <circle cx="100" cy="80" r="5" fill="#FFF8E7" stroke="#E4007C" stroke-width="1.8" />
    <circle cx="100" cy="80" r="2" fill="#E4007C" />
    <line x1="100" y1="71" x2="100" y2="74" stroke="#E4007C" stroke-width="1.2" />
    <line x1="100" y1="86" x2="100" y2="89" stroke="#E4007C" stroke-width="1.2" />
    <line x1="91" y1="80" x2="94" y2="80" stroke="#E4007C" stroke-width="1.2" />
    <line x1="106" y1="80" x2="109" y2="80" stroke="#E4007C" stroke-width="1.2" />
    <line x1="76" y1="75" x2="76" y2="139" stroke="#FFF8E7" stroke-width="1.2" opacity="0.95" />
    <line x1="124" y1="75" x2="124" y2="139" stroke="#FFF8E7" stroke-width="1.2" opacity="0.95" />
  </g>
</svg>`
  },

  lockup: {
    id: 'lockup',
    badge: 'ASSET 02 · LOCKUP MAESTRO',
    title: 'Logotipo Horizontal Completo',
    desc: 'Composición horizontal equilibrada que une el isotipo pentagonal con la tipografía de alto impacto MACLOVIA. en Abril Fatface, la firma en Cookie Script y el sello de origen CDMX.',
    viewBox: '0 0 600 160',
    aspectRatio: 600 / 160,
    symbolDark: 'icon-maclovia-lockup',
    symbolLight: 'icon-maclovia-lockup-light',
    filename: 'maclovia-horizontal-lockup',
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="100%" height="100%">
  <g transform="translate(15, 10) scale(0.7)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#0C0208" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <circle cx="100" cy="14" r="4.2" fill="#FFF8E7" stroke="#FF4DA6" stroke-width="1.5" />
    <path fill-rule="evenodd" fill="#E4007C" d="M 64 141 L 64 88 L 68 88 L 68 75 C 68 62, 84 62, 84 75 L 84 94 L 100 114 L 116 94 L 116 75 C 116 62, 132 62, 132 75 L 132 88 L 136 88 L 136 141 L 123 141 L 123 100 L 112 116 C 106 124, 94 124, 88 116 L 77 100 L 77 141 Z" />
    <circle cx="100" cy="80" r="5" fill="#FFF8E7" />
    <rect x="62" y="139" width="76" height="3" rx="1.5" fill="#FFF8E7" opacity="0.9" />
  </g>
  <text x="175" y="88" font-family="'Abril Fatface', Georgia, serif" font-size="54" font-weight="900" fill="#FFFFFF" letter-spacing="2">MACLOVIA.</text>
  <text x="180" y="132" font-family="'Cookie', cursive" font-size="44" fill="#E4007C">Belleza Maldita</text>
  <line x1="435" y1="52" x2="435" y2="128" stroke="#E4007C" stroke-width="1.5" opacity="0.6" />
  <text x="450" y="78" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="11" font-weight="700" fill="#E4007C" letter-spacing="3">STUDIO</text>
  <text x="450" y="98" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="11" font-weight="700" fill="#A1A1AA" letter-spacing="3">CDMX</text>
  <text x="450" y="118" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="9" fill="#71717A" letter-spacing="1">v1.2.0</text>
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="100%" height="100%">
  <g transform="translate(15, 10) scale(0.7)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#FFFDF7" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <circle cx="100" cy="14" r="4.2" fill="#FFF8E7" stroke="#FF2B92" stroke-width="1.5" />
    <path fill-rule="evenodd" fill="#E4007C" d="M 64 141 L 64 88 L 68 88 L 68 75 C 68 62, 84 62, 84 75 L 84 94 L 100 114 L 116 94 L 116 75 C 116 62, 132 62, 132 75 L 132 88 L 136 88 L 136 141 L 123 141 L 123 100 L 112 116 C 106 124, 94 124, 88 116 L 77 100 L 77 141 Z" />
    <circle cx="100" cy="80" r="5" fill="#FFF8E7" stroke="#E4007C" stroke-width="1.5" />
    <rect x="62" y="139" width="76" height="3" rx="1.5" fill="#FFF8E7" stroke="#E4007C" stroke-width="0.5" />
  </g>
  <text x="175" y="88" font-family="'Abril Fatface', Georgia, serif" font-size="54" font-weight="900" fill="#181511" letter-spacing="2">MACLOVIA.</text>
  <text x="180" y="132" font-family="'Cookie', cursive" font-size="44" fill="#E4007C">Belleza Maldita</text>
  <line x1="435" y1="52" x2="435" y2="128" stroke="#E4007C" stroke-width="1.5" opacity="0.6" />
  <text x="450" y="78" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="11" font-weight="700" fill="#E4007C" letter-spacing="3">STUDIO</text>
  <text x="450" y="98" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="11" font-weight="700" fill="#52525B" letter-spacing="3">CDMX</text>
  <text x="450" y="118" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="9" fill="#71717A" letter-spacing="1">v1.2.0</text>
</svg>`
  },

  wordmark: {
    id: 'wordmark',
    badge: 'ASSET 03 · MONOGRAMA EDITORIAL',
    title: 'Monograma Compacto CDMX',
    desc: 'Monograma síntesis optimizado para avatares en redes sociales, sellos de cera, favicons de 64px y marcas de agua de propiedad intelectual.',
    viewBox: '0 0 200 200',
    aspectRatio: 1,
    symbolDark: 'icon-maclovia-mark',
    symbolLight: 'icon-maclovia-mark-light',
    filename: 'maclovia-monogram-cdmx',
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" rx="32" fill="#0A0207" stroke="#E4007C" stroke-width="3" />
  <text x="42" y="138" font-family="'Abril Fatface', Georgia, serif" font-size="120" font-weight="900" fill="#FFFFFF">M</text>
  <circle cx="152" cy="126" r="14" fill="#E4007C" />
  <rect x="42" y="152" width="118" height="8" rx="4" fill="#E4007C" />
  <text x="100" y="180" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="11" font-weight="700" fill="#FFF8E7" text-anchor="middle" letter-spacing="5">CDMX</text>
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" rx="32" fill="#FFF8E7" stroke="#E4007C" stroke-width="3" />
  <text x="42" y="138" font-family="'Abril Fatface', Georgia, serif" font-size="120" font-weight="900" fill="#181511">M</text>
  <circle cx="152" cy="126" r="14" fill="#E4007C" />
  <rect x="42" y="152" width="118" height="8" rx="4" fill="#E4007C" />
  <text x="100" y="180" font-family="'Space Grotesk', 'Fira Code', monospace" font-size="11" font-weight="700" fill="#181511" text-anchor="middle" letter-spacing="5">CDMX</text>
</svg>`
  },

  badge: {
    id: 'badge',
    badge: 'ASSET 04 · INSIGNIA CIRCULAR',
    title: 'Insignia Certificada de Autor',
    desc: 'Medallón circular heráldico con micro-perforaciones perimetrales, coordenadas de Ciudad de México y glifo mexica Tepētl.',
    viewBox: '0 0 200 200',
    aspectRatio: 1,
    symbolDark: 'icon-maclovia-mark',
    symbolLight: 'icon-maclovia-mark-light',
    filename: 'maclovia-certified-badge',
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <circle cx="100" cy="100" r="92" fill="#070709" stroke="#E4007C" stroke-width="2.5" stroke-dasharray="6 3.5" />
  <circle cx="100" cy="100" r="76" fill="#0D0208" stroke="#FFF8E7" stroke-width="1" opacity="0.4" />
  <g transform="translate(35, 35) scale(0.65)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#0C0208" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <path fill-rule="evenodd" fill="#E4007C" d="M 64 141 L 64 88 L 68 88 L 68 75 C 68 62, 84 62, 84 75 L 84 94 L 100 114 L 116 94 L 116 75 C 116 62, 132 62, 132 75 L 132 88 L 136 88 L 136 141 L 123 141 L 123 100 L 112 116 C 106 124, 94 124, 88 116 L 77 100 L 77 141 Z" />
    <circle cx="100" cy="80" r="5" fill="#FFF8E7" />
  </g>
  <path id="badge-top-curve" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
  <path id="badge-bottom-curve" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
  <text font-family="'Space Grotesk', monospace" font-size="8.5" font-weight="700" fill="#FFF8E7" letter-spacing="3.2">
    <textPath href="#badge-top-curve" startOffset="50%" text-anchor="middle">MACLOVIA • CDMX • 2026</textPath>
  </text>
  <text font-family="'Cookie', cursive" font-size="14" fill="#E4007C" letter-spacing="1">
    <textPath href="#badge-bottom-curve" startOffset="50%" text-anchor="middle">✦ Belleza Maldita ✦</textPath>
  </text>
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <circle cx="100" cy="100" r="92" fill="#FFF8E7" stroke="#E4007C" stroke-width="2.5" stroke-dasharray="6 3.5" />
  <circle cx="100" cy="100" r="76" fill="#FFFDF7" stroke="#E4007C" stroke-width="1" opacity="0.4" />
  <g transform="translate(35, 35) scale(0.65)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#FFF8E7" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <circle cx="100" cy="14" r="4.2" fill="#FFF8E7" stroke="#FF2B92" stroke-width="1.5" />
    <path fill-rule="evenodd" fill="#E4007C" d="M 64 141 L 64 88 L 68 88 L 68 75 C 68 62, 84 62, 84 75 L 84 94 L 100 114 L 116 94 L 116 75 C 116 62, 132 62, 132 75 L 132 88 L 136 88 L 136 141 L 123 141 L 123 100 L 112 116 C 106 124, 94 124, 88 116 L 77 100 L 77 141 Z" />
    <circle cx="100" cy="80" r="5" fill="#FFF8E7" stroke="#E4007C" stroke-width="1.5" />
  </g>
  <path id="badge-top-curve-light" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
  <path id="badge-bottom-curve-light" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
  <text font-family="'Space Grotesk', monospace" font-size="8.5" font-weight="700" fill="#181511" letter-spacing="3.2">
    <textPath href="#badge-top-curve-light" startOffset="50%" text-anchor="middle">MACLOVIA • CDMX • 2026</textPath>
  </text>
  <text font-family="'Cookie', cursive" font-size="14" fill="#E4007C" letter-spacing="1">
    <textPath href="#badge-bottom-curve-light" startOffset="50%" text-anchor="middle">✦ Belleza Maldita ✦</textPath>
  </text>
</svg>`
  }
};

export function initSvgToolkitWorkbench() {
  const previewFrame = document.getElementById('toolkit-frame');
  const previewSvg = document.getElementById('toolkit-interactive-svg');
  const assetBtns = document.querySelectorAll('[data-asset-type]');
  const themeBtns = document.querySelectorAll('[data-svg-theme]');
  const sizeBtns = document.querySelectorAll('[data-svg-size]');
  const blueprintToggleBtn = document.getElementById('toolkit-blueprint-toggle');
  const animToggleBtn = document.getElementById('toolkit-anim-toggle');

  const assetBadge = document.getElementById('toolkit-asset-badge');
  const assetTitle = document.getElementById('toolkit-asset-title');
  const assetDesc = document.getElementById('toolkit-asset-desc');

  const downloadBtn = document.getElementById('toolkit-download-btn');
  const downloadPngBtn = document.getElementById('toolkit-download-png-btn');
  const downloadFaviconsBtn = document.getElementById('toolkit-download-favicons-btn');
  const copyXmlBtn = document.getElementById('toolkit-copy-xml-btn');

  const codeTabs = document.querySelectorAll('.toolkit-code-tab-btn');
  const codePreview = document.getElementById('toolkit-code-display');

  // Wallpaper Studio Elements
  const wallpaperRes = document.getElementById('wallpaper-resolution');
  const wallpaperPalette = document.getElementById('wallpaper-palette');
  const wallpaperGenBtn = document.getElementById('wallpaper-generate-btn');

  // Tokens Exporters
  const downloadTokensCssBtn = document.getElementById('download-tokens-css-btn');
  const downloadTokensJsonBtn = document.getElementById('download-tokens-json-btn');

  let currentAssetKey = 'mark';
  let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  let currentSize = 120;
  let isAnimated = true;
  let isBlueprintActive = false;
  let currentCodeTab = 'xml';

  const getActiveAsset = () => MACLOVIA_ASSETS[currentAssetKey] || MACLOVIA_ASSETS.mark;
  const getActiveSvgRaw = () => {
    const asset = getActiveAsset();
    return asset[currentTheme] || asset.dark;
  };

  const updatePreview = () => {
    const asset = getActiveAsset();

    if (previewSvg) {
      previewSvg.setAttribute('viewBox', asset.viewBox);

      // Sizing calculation based on aspect ratio with strict bounds
      if (asset.aspectRatio > 1.5) {
        previewSvg.style.width = `min(100%, ${currentSize * 2.2}px)`;
        previewSvg.style.height = `min(120px, ${(currentSize * 2.2) / asset.aspectRatio}px)`;
      } else {
        previewSvg.style.width = `${currentSize}px`;
        previewSvg.style.height = `${currentSize}px`;
      }

      const symbolId = currentTheme === 'light' ? asset.symbolLight : asset.symbolDark;
      const useEl = previewSvg.querySelector('use');
      if (useEl) {
        useEl.setAttribute('href', `assets/icons/sprite.svg#${symbolId}`);
      }
    }

    if (previewFrame) {
      if (currentTheme === 'light') {
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

    if (currentCodeTab === 'xml') {
      codePreview.textContent = rawSvg.trim();
    } else if (currentCodeTab === 'html') {
      codePreview.textContent = `<!-- Embeber en HTML5 (${currentTheme.toUpperCase()} MODE) -->\n<div class="maclovia-brand-asset" style="width: ${currentSize}px;">\n  ${rawSvg.trim()}\n</div>`;
    } else if (currentCodeTab === 'jsx') {
      const componentName = asset.id.charAt(0).toUpperCase() + asset.id.slice(1);
      codePreview.textContent = `// React / Next.js Component\nimport React from 'react';\n\nexport const Maclovia${componentName} = ({ width = ${currentSize}, className = '' }) => (\n  <div className={className} style={{ width, display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: \`${rawSvg.replace(/`/g, '\\`')}\` }} />\n);`;
    } else if (currentCodeTab === 'datauri') {
      const base64 = btoa(unescape(encodeURIComponent(rawSvg.trim())));
      codePreview.textContent = `data:image/svg+xml;base64,${base64}`;
    }
  };

  // Asset Switcher Buttons
  assetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      assetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentAssetKey = btn.getAttribute('data-asset-type') || 'mark';
      updatePreview();
      updateCodeDisplay();
    });
  });

  // Theme Variant Buttons
  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      themeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentTheme = btn.getAttribute('data-svg-theme') || 'dark';
      updatePreview();
      updateCodeDisplay();
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
      currentSize = parseInt(btn.getAttribute('data-svg-size') || '120', 10);
      updatePreview();
      updateCodeDisplay();
    });
  });

  // Blueprint Construction Grid Overlay Toggle
  if (blueprintToggleBtn && previewFrame) {
    blueprintToggleBtn.addEventListener('click', () => {
      isBlueprintActive = !isBlueprintActive;
      if (isBlueprintActive) {
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
      isAnimated = !isAnimated;
      const isEn = getLanguage() === 'en';
      if (isAnimated) {
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
      currentCodeTab = tab.getAttribute('data-code-tab') || 'xml';
      updateCodeDisplay();
    });
  });

  // Trigger File Download Utility
  const triggerDownload = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download SVG
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const rawSvg = getActiveSvgRaw();
      const asset = getActiveAsset();
      const blob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, `${asset.filename}-${currentTheme}.svg`);
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
            triggerDownload(pngUrl, `${asset.filename}-${currentTheme}-${targetWidth}px.png`);
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
      const rawSvg = MACLOVIA_ASSETS.mark[currentTheme] || MACLOVIA_ASSETS.mark.dark;
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
  const inlineCopyBtn = document.getElementById('toolkit-inline-copy-btn');
  if (inlineCopyBtn && codePreview) {
    inlineCopyBtn.addEventListener('click', () => {
      copyTextToClipboard(codePreview.textContent || '', inlineCopyBtn);
    });
  }

  // 4K Wallpaper Canvas Generator
  if (wallpaperGenBtn && wallpaperRes && wallpaperPalette) {
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

        ctx.font = `${isMobile ? 46 : 48}px 'Cookie', cursive`;
        ctx.fillStyle = '#E4007C';
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
  --font-script: 'Cookie', cursive;
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
            script: { font: "Cookie", fallback: "cursive" },
            sans: { font: "Inter", fallback: "sans-serif" },
            mono: { font: "Fira Code", fallback: "monospace" }
          }
        }
      }, null, 2);

      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
      triggerDownload(URL.createObjectURL(blob), 'maclovia-tokens.json');
    });
  }

  updatePreview();
  updateCodeDisplay();

  // Listen for decoupled global theme changes
  window.addEventListener('maclovia:theme-changed', (e) => {
    if (e.detail && e.detail.theme) {
      currentTheme = e.detail.theme;
      updatePreview();
      updateCodeDisplay();
    }
  });
}
