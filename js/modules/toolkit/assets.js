/**
 * Maclovia / Belleza Maldita — SVG Toolkit Brand Assets (Data)
 * Catálogo oficial de identidad: isotipos, logotipos e insignias
 * en variantes dark/light como strings SVG.
 */

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
    desc: 'Composición horizontal equilibrada que une el isotipo pentagonal con la tipografía de alto impacto MACLOVIA. en Abril Fatface, la firma en Tipo Movin CDMX y el sello de origen CDMX.',
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
  <text x="180" y="130" font-family="'Tipo Movin CDMX', 'Space Grotesk', sans-serif" font-size="34" font-weight="700" letter-spacing="1.5" fill="#E4007C">Belleza Maldita</text>
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
  <text x="180" y="130" font-family="'Tipo Movin CDMX', 'Space Grotesk', sans-serif" font-size="34" font-weight="700" letter-spacing="1.5" fill="#E4007C">Belleza Maldita</text>
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
  <text font-family="'Tipo Movin CDMX', 'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#E4007C" letter-spacing="2">
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
  <text font-family="'Tipo Movin CDMX', 'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#E4007C" letter-spacing="2">
    <textPath href="#badge-bottom-curve-light" startOffset="50%" text-anchor="middle">✦ Belleza Maldita ✦</textPath>
  </text>
</svg>`
  }
};
