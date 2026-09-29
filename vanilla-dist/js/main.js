/**
 * Maclovia / Belleza Maldita — Main Native Orchestrator
 * Arquitectura Vanilla • Cero React • Cero Framer Motion
 */

import { initI18n, getLanguage } from './i18n.js';
import { initMockupTabs, copyTextToClipboard } from './mockups.js';
import { PROJECTS } from './data/projects.js';
import { CEO_PROFILE } from './data/team.js';

// --- Theme Management (Dark / Light) ---
function initTheme() {
  const savedTheme = localStorage.getItem('maclovia_theme') || 'dark';
  applyTheme(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Listener for interactive CLI theme change
  window.addEventListener('maclovia:set-theme', (e) => {
    if (e.detail && (e.detail.theme === 'light' || e.detail.theme === 'dark')) {
      applyTheme(e.detail.theme);
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('maclovia_theme', theme);

  const iconUse = document.querySelector('#theme-toggle-btn use');
  if (iconUse) {
    iconUse.setAttribute('href', theme === 'dark' ? 'assets/icons/sprite.svg#icon-sun' : 'assets/icons/sprite.svg#icon-moon');
  }

  // Update site marks if they use the adaptive symbol
  const markSymbolId = theme === 'light' ? 'icon-maclovia-mark-light' : 'icon-maclovia-mark-dark';
  document.querySelectorAll('.site-brand-logo use, .brand-link use, .footer-brand-logo use').forEach((use) => {
    use.setAttribute('href', `assets/icons/sprite.svg#${markSymbolId}`);
  });

  // Sync SVG Toolkit if initialized
  if (toolkitWorkbenchInstance) {
    toolkitWorkbenchInstance.setTheme(theme);
  }
}

// --- Brand Mode Switcher (Unified / Maclovia / Belleza Maldita) ---
const BRAND_MODES = ['unified', 'maclovia', 'belleza'];
let currentBrandMode = 'unified';

function setBrandMode(mode) {
  if (!BRAND_MODES.includes(mode)) return;
  currentBrandMode = mode;

  // Update hero views
  document.querySelectorAll('.brand-view').forEach((view) => {
    view.classList.remove('active');
  });
  const activeView = document.getElementById(`brand-view-${mode}`);
  if (activeView) {
    activeView.classList.add('active');
  }

  // Update pills
  document.querySelectorAll('.brand-switch-btn').forEach((btn) => {
    if (btn.getAttribute('data-brand-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update header button label
  const modeLabel = document.getElementById('brand-mode-label');
  if (modeLabel) {
    modeLabel.textContent = mode.toUpperCase();
  }
}

function initBrandSwitcher() {
  document.querySelectorAll('.brand-switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-brand-mode');
      setBrandMode(mode);
    });
  });

  const headerModeBtn = document.getElementById('brand-mode-btn');
  if (headerModeBtn) {
    headerModeBtn.addEventListener('click', () => {
      const currentIndex = BRAND_MODES.indexOf(currentBrandMode);
      const nextIndex = (currentIndex + 1) % BRAND_MODES.length;
      setBrandMode(BRAND_MODES[nextIndex]);
    });
  }
}

// --- Live CDMX Clock ---
function initCdmxClock() {
  const clockEl = document.getElementById('footer-cdmx-clock');
  if (!clockEl) return;

  const updateTime = () => {
    try {
      const timeStr = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
      clockEl.textContent = `${timeStr} CST`;
    } catch {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  };

  updateTime();
  setInterval(updateTime, 1000);
}

// --- Back to Top Button ---
function initBackToTop() {
  const btn = document.getElementById('btn-back-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// --- Render Portfolio Projects with Expandable Architecture Specs ---
function renderProjects(filter = 'all') {
  const container = document.getElementById('portfolio-grid-container');
  if (!container) return;

  const currentLang = getLanguage();
  const isEn = currentLang === 'en';

  const filtered = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  const countEl = document.getElementById('portfolio-project-count');
  if (countEl) {
    countEl.textContent = `${filtered.length} ${isEn ? 'certified modules' : 'módulos certificados'}`;
  }

  container.innerHTML = filtered.map((p) => {
    const arch = p.architectureDetails;
    const highlights = isEn ? arch.highlightsEn : arch.highlightsEs;

    return `
      <div class="project-card" data-category="${p.category}" id="project-card-${p.id}">
        <div>
          <div class="project-badge">
            ${isEn ? p.badgeCategoryEn : p.badgeCategoryEs}
          </div>
          <h4 class="project-title">${p.name}</h4>
          <p class="project-desc">${isEn ? p.descriptionEn : p.descriptionEs}</p>
          
          <!-- Terminal Command Box -->
          <div class="terminal-box">
            <code>${p.cloneCmd}</code>
            <button class="copy-btn" data-copy-text="${p.cloneCmd}" title="Copiar comando">
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-copy"></use></svg>
            </button>
          </div>

          <!-- Tech Stack Tags -->
          <div class="ceo-specialties" style="margin-bottom: 1rem;">
            ${p.techStack.map((tech) => `<span class="specialty-pill">${tech}</span>`).join('')}
          </div>

          <!-- Architecture Specs Toggle Button -->
          <button class="btn btn-ghost" data-toggle-arch="${p.id}" style="width: 100%; justify-content: space-between; padding: 0.4rem 0.75rem; margin-bottom: 0.75rem;">
            <span style="display: flex; align-items: center; gap: 0.4rem; color: var(--color-rosa-chilango);">
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-cpu"></use></svg>
              <span>${isEn ? 'Architecture & Benchmarks' : 'Arquitectura & Métricas'}</span>
            </span>
            <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-arrow-down"></use></svg>
          </button>

          <!-- Collapsible Architecture Specs Drawer -->
          <div class="architecture-drawer" id="arch-drawer-${p.id}">
            <div style="color: var(--text-primary); margin-bottom: 0.35rem;">
              <strong class="text-rosa">Runtime:</strong> ${arch.runtime}
            </div>
            <div style="color: var(--text-primary); margin-bottom: 0.35rem;">
              <strong class="text-rosa">Throughput:</strong> ${arch.throughput}
            </div>
            <div style="color: var(--text-secondary); margin-bottom: 0.5rem;">
              <strong class="text-rosa">Format / Quant:</strong> ${arch.quantizationOrType}
            </div>

            <!-- Highlights -->
            <ul style="list-style: none; padding-left: 0; margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.25rem;">
              ${highlights.map((h) => `
                <li style="display: flex; align-items: flex-start; gap: 0.35rem; color: var(--text-muted); font-size: 0.65rem;">
                  <span class="text-rosa">✦</span>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>

            <!-- Benchmarks Grid -->
            ${arch.benchmarks ? `
              <div class="benchmark-badge-grid">
                ${arch.benchmarks.map((b) => `
                  <div class="benchmark-pill">
                    <div style="color: var(--color-rosa-chilango); font-weight: 700; font-size: 0.75rem;">${b.value}</div>
                    <div style="font-size: 0.6rem; color: var(--text-primary);">${b.label}</div>
                    <div style="font-size: 0.55rem; color: var(--text-muted);">${b.subtext}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Action Links -->
        <div class="project-card-actions">
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
            <svg class="icon"><use href="assets/icons/sprite.svg#icon-github"></use></svg>
            <span>GitHub</span>
            <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-arrow-up-right"></use></svg>
          </a>

          ${p.demoUrl ? `
            <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>Demo</span>
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-arrow-up-right"></use></svg>
            </a>
          ` : ''}

          ${p.huggingFaceUrl ? `
            <a href="${p.huggingFaceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg class="icon"><use href="assets/icons/sprite.svg#icon-cpu"></use></svg>
              <span>Hugging Face</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Attach drawer toggles
  container.querySelectorAll('[data-toggle-arch]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-toggle-arch');
      const drawer = document.getElementById(`arch-drawer-${id}`);
      if (drawer) {
        drawer.classList.toggle('open');
        btn.classList.toggle('open');
      }
    });
  });
}

// --- Portfolio Filter Controls ---
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('btn-primary'));
      filterBtns.forEach((b) => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

// --- Render CEO Card ---
function renderCeoProfile() {
  const container = document.getElementById('ceo-profile-container');
  if (!container) return;

  const isEn = getLanguage() === 'en';

  container.innerHTML = `
    <div class="ceo-card">
      <div class="ceo-grid">
        <!-- Top bar -->
        <div class="ceo-topbar">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="ceo-badge">
              ${isEn ? CEO_PROFILE.roleEn : CEO_PROFILE.roleEs}
            </span>
            <span class="font-mono text-muted" style="font-size: 0.65rem; display: flex; align-items: center; gap: 0.35rem;">
              <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-map-pin"></use></svg>
              ${CEO_PROFILE.location}
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <a href="https://github.com/${CEO_PROFILE.githubHandle}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg class="icon"><use href="assets/icons/sprite.svg#icon-github"></use></svg>
              <span>@${CEO_PROFILE.githubHandle}</span>
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-arrow-up-right"></use></svg>
            </a>

            <a href="mailto:${CEO_PROFILE.email}" class="btn btn-primary">
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-mail"></use></svg>
              <span>${isEn ? 'Executive Contact' : 'Contacto Ejecutivo'}</span>
            </a>
          </div>
        </div>

        <!-- Main avatar + info -->
        <div class="ceo-main">
          <div class="ceo-avatar-wrap">
            <img src="https://avatars.githubusercontent.com/u/8192280?v=4" alt="${CEO_PROFILE.name}" class="ceo-avatar" />
            <span class="ceo-tag">CEO</span>
          </div>

          <div class="ceo-details">
            <h3>${CEO_PROFILE.name}</h3>
            <p class="ceo-role-title">${isEn ? CEO_PROFILE.roleEn : CEO_PROFILE.roleEs}</p>
            <p class="ceo-bio">${isEn ? CEO_PROFILE.bioEn : CEO_PROFILE.bioEs}</p>
            
            <div class="ceo-specialties">
              ${CEO_PROFILE.specialties.map((spec) => `<span class="specialty-pill">${spec}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Footer metrics -->
        <div class="ceo-footer">
          <div class="ceo-metrics">
            <div>
              <div class="metric-val">${CEO_PROFILE.metrics.experience}</div>
              <div class="metric-lbl">${isEn ? CEO_PROFILE.metrics.experienceLabelEn : CEO_PROFILE.metrics.experienceLabelEs}</div>
            </div>
            <div>
              <div class="metric-val" style="color: var(--text-primary);">${CEO_PROFILE.metrics.systems}</div>
              <div class="metric-lbl">${isEn ? CEO_PROFILE.metrics.systemsLabelEn : CEO_PROFILE.metrics.systemsLabelEs}</div>
            </div>
            <div>
              <div class="metric-val" style="color: var(--text-secondary);">${CEO_PROFILE.metrics.focus}</div>
              <div class="metric-lbl">${isEn ? CEO_PROFILE.metrics.focusLabelEn : CEO_PROFILE.metrics.focusLabelEs}</div>
            </div>
          </div>

          <a href="#portfolio-section" class="btn btn-secondary">
            <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-briefcase"></use></svg>
            <span>${isEn ? 'View Engineering Portfolio' : 'Ver Portafolio de Ingeniería'}</span>
            <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-arrow-down"></use></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

// --- Standalone SVG Assets & Media Hub (Dark & Light Variants) ---
const MACLOVIA_ASSETS = {
  mark: {
    id: 'mark',
    badge: 'ASSET 01 · VECTOR MAESTRO',
    title: "Isotipo Pentagonal Sigilo 'ꂵ' (Vectorial SVG)",
    desc: "Escudo pentagonal con sigilo criptográfico 'ꂵ' (MAT) cincelado en Rosa Chilango neón y obsidiana. Tres pilares, puente estructural y portales cuánticos. 100% vectorial nativo.",
    viewBox: '0 0 200 200',
    aspectRatio: 1,
    symbolDark: 'icon-maclovia-mark',
    symbolLight: 'icon-maclovia-mark-light',
    filename: 'maclovia-sigil-mark',
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
  <circle cx="100" cy="14" r="3.5" fill="#FF66B8" />
  <circle cx="182" cy="73" r="3.5" fill="#FF66B8" />
  <circle cx="151" cy="170" r="3.5" fill="#E4007C" />
  <circle cx="49" cy="170" r="3.5" fill="#E4007C" />
  <circle cx="18" cy="73" r="3.5" fill="#FF66B8" />
  <g id="sigil-mat-body">
    <path fill-rule="evenodd" fill="url(#maclovia-sigil-light)" d="M 72.2 141.0 L 72.2 61.0 L 103.3 75.6 L 103.3 63.5 L 127.8 76.3 L 125.1 82.6 L 110.8 75.5 L 110.8 141.0 L 103.3 141.0 L 103.3 106.8 L 94.9 106.8 L 94.9 141.0 L 87.5 141.0 L 87.5 106.8 L 79.1 106.8 L 79.1 141.0 Z M 79.1 100.9 L 87.5 100.9 L 87.5 75.1 L 79.1 71.5 Z M 94.9 100.9 L 103.3 100.9 L 103.3 83.4 L 94.9 79.3 Z" />
    <path fill="url(#maclovia-sigil-dark)" opacity="0.85" d="M 75.6 62.6 L 79.1 64.3 L 79.1 71.5 L 75.6 73.0 Z M 75.6 100.9 L 79.1 100.9 L 79.1 141.0 L 75.6 141.0 Z" />
    <path fill="url(#maclovia-sigil-dark)" opacity="0.85" d="M 91.2 76.8 L 94.9 79.3 L 94.9 100.9 L 91.2 100.9 Z M 91.2 106.8 L 94.9 106.8 L 94.9 141.0 L 91.2 141.0 Z" />
    <path fill="url(#maclovia-sigil-dark)" opacity="0.85" d="M 107.0 75.5 L 110.8 75.5 L 110.8 141.0 L 107.0 141.0 Z" />
    <path fill="url(#maclovia-sigil-dark)" opacity="0.9" d="M 110.8 75.5 L 127.8 76.3 L 125.1 82.6 L 110.8 78.8 Z" />
    <rect x="72.2" y="102.5" width="38.6" height="2.5" fill="#FFA3D5" opacity="0.75" />
    <line x1="75.6" y1="73.0" x2="75.6" y2="141.0" stroke="#FFFFFF" stroke-width="1.0" opacity="0.45" />
    <line x1="91.2" y1="77.0" x2="91.2" y2="141.0" stroke="#FFFFFF" stroke-width="1.0" opacity="0.45" />
    <line x1="107.0" y1="76.0" x2="107.0" y2="141.0" stroke="#FFFFFF" stroke-width="1.0" opacity="0.45" />
  </g>
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="maclovia-light-medallion" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFF0F7" />
      <stop offset="65%" stop-color="#FFE4F0" />
      <stop offset="100%" stop-color="#FFFFFF" />
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
  <circle cx="100" cy="14" r="3.5" fill="#FF2B92" />
  <circle cx="182" cy="73" r="3.5" fill="#FF2B92" />
  <circle cx="151" cy="170" r="3.5" fill="#C2006A" />
  <circle cx="49" cy="170" r="3.5" fill="#C2006A" />
  <circle cx="18" cy="73" r="3.5" fill="#FF2B92" />
  <g>
    <path fill-rule="evenodd" fill="url(#maclovia-light-sigil-light)" d="M 72.2 141.0 L 72.2 61.0 L 103.3 75.6 L 103.3 63.5 L 127.8 76.3 L 125.1 82.6 L 110.8 75.5 L 110.8 141.0 L 103.3 141.0 L 103.3 106.8 L 94.9 106.8 L 94.9 141.0 L 87.5 141.0 L 87.5 106.8 L 79.1 106.8 L 79.1 141.0 Z M 79.1 100.9 L 87.5 100.9 L 87.5 75.1 L 79.1 71.5 Z M 94.9 100.9 L 103.3 100.9 L 103.3 83.4 L 94.9 79.3 Z" />
    <path fill="url(#maclovia-light-sigil-dark)" opacity="0.85" d="M 75.6 62.6 L 79.1 64.3 L 79.1 71.5 L 75.6 73.0 Z M 75.6 100.9 L 79.1 100.9 L 79.1 141.0 L 75.6 141.0 Z" />
    <path fill="url(#maclovia-light-sigil-dark)" opacity="0.85" d="M 91.2 76.8 L 94.9 79.3 L 94.9 100.9 L 91.2 100.9 Z M 91.2 106.8 L 94.9 106.8 L 94.9 141.0 L 91.2 141.0 Z" />
    <path fill="url(#maclovia-light-sigil-dark)" opacity="0.85" d="M 107.0 75.5 L 110.8 75.5 L 110.8 141.0 L 107.0 141.0 Z" />
    <path fill="url(#maclovia-light-sigil-dark)" opacity="0.9" d="M 110.8 75.5 L 127.8 76.3 L 125.1 82.6 L 110.8 78.8 Z" />
    <rect x="72.2" y="102.5" width="38.6" height="2.5" fill="#FFB3DC" opacity="0.8" />
    <line x1="75.6" y1="73.0" x2="75.6" y2="141.0" stroke="#FFFFFF" stroke-width="1.0" opacity="0.75" />
    <line x1="91.2" y1="77.0" x2="91.2" y2="141.0" stroke="#FFFFFF" stroke-width="1.0" opacity="0.75" />
    <line x1="107.0" y1="76.0" x2="107.0" y2="141.0" stroke="#FFFFFF" stroke-width="1.0" opacity="0.75" />
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
    filename: 'maclovia-brand-lockup',
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="100%" height="100%">
  <g transform="translate(15, 10) scale(0.7)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#070707" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <polygon points="100,26 170,77 144,160 56,160 30,77" fill="none" stroke="#E4007C" stroke-width="1.5" stroke-dasharray="5 3.5" opacity="0.6" stroke-linejoin="round" />
    <path fill-rule="evenodd" fill="#FF4DA6" d="M 72.2 141.0 L 72.2 61.0 L 103.3 75.6 L 103.3 63.5 L 127.8 76.3 L 125.1 82.6 L 110.8 75.5 L 110.8 141.0 L 103.3 141.0 L 103.3 106.8 L 94.9 106.8 L 94.9 141.0 L 87.5 141.0 L 87.5 106.8 L 79.1 106.8 L 79.1 141.0 Z M 79.1 100.9 L 87.5 100.9 L 87.5 75.1 L 79.1 71.5 Z M 94.9 100.9 L 103.3 100.9 L 103.3 83.4 L 94.9 79.3 Z" />
  </g>
  <text x="175" y="85" font-family="'Abril Fatface', Georgia, serif" font-size="52" fill="#FFFFFF" letter-spacing="1">MACLOVIA.</text>
  <text x="180" y="132" font-family="'Cookie', cursive" font-size="44" fill="#E4007C">Belleza Maldita</text>
  <rect x="500" y="58" width="55" height="24" rx="4" fill="none" stroke="#E4007C" stroke-width="1.5" />
  <text x="527" y="74" font-family="'Fira Code', monospace" font-size="11" fill="#E4007C" font-weight="700" text-anchor="middle">CDMX</text>
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="100%" height="100%">
  <g transform="translate(15, 10) scale(0.7)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#FFFFFF" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <polygon points="100,26 170,77 144,160 56,160 30,77" fill="none" stroke="#E4007C" stroke-width="1.5" stroke-dasharray="5 3.5" opacity="0.6" stroke-linejoin="round" />
    <path fill-rule="evenodd" fill="#E4007C" d="M 72.2 141.0 L 72.2 61.0 L 103.3 75.6 L 103.3 63.5 L 127.8 76.3 L 125.1 82.6 L 110.8 75.5 L 110.8 141.0 L 103.3 141.0 L 103.3 106.8 L 94.9 106.8 L 94.9 141.0 L 87.5 141.0 L 87.5 106.8 L 79.1 106.8 L 79.1 141.0 Z M 79.1 100.9 L 87.5 100.9 L 87.5 75.1 L 79.1 71.5 Z M 94.9 100.9 L 103.3 100.9 L 103.3 83.4 L 94.9 79.3 Z" />
  </g>
  <text x="175" y="85" font-family="'Abril Fatface', Georgia, serif" font-size="52" fill="#0A0A0A" letter-spacing="1">MACLOVIA.</text>
  <text x="180" y="132" font-family="'Cookie', cursive" font-size="44" fill="#E4007C">Belleza Maldita</text>
  <rect x="500" y="58" width="55" height="24" rx="4" fill="none" stroke="#E4007C" stroke-width="1.5" />
  <text x="527" y="74" font-family="'Fira Code', monospace" font-size="11" fill="#E4007C" font-weight="700" text-anchor="middle">CDMX</text>
</svg>`
  },

  wordmark: {
    id: 'wordmark',
    badge: 'ASSET 03 · MONOGRAMA EDITORIAL',
    title: 'Monograma Editorial & Sello CDMX',
    desc: 'Tipografía display de gran escala para portadas de libros técnicos, membretes corporativos y tarjetas de presentación de 600g.',
    viewBox: '0 0 450 140',
    aspectRatio: 450 / 140,
    symbolDark: 'icon-maclovia-wordmark',
    symbolLight: 'icon-maclovia-wordmark-light',
    filename: 'maclovia-wordmark',
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 140" width="100%" height="100%">
  <text x="20" y="82" font-family="'Abril Fatface', Georgia, serif" font-size="70" fill="#FFFFFF" letter-spacing="-0.5">MACLOVIA.</text>
  <text x="24" y="118" font-family="'Fira Code', monospace" font-size="12" fill="#E4007C" font-weight="700" letter-spacing="3.5">DEVELOPMENT GROUP • CIUDAD DE MÉXICO</text>
  <circle cx="430" cy="74" r="5" fill="#E4007C" />
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 140" width="100%" height="100%">
  <text x="20" y="82" font-family="'Abril Fatface', Georgia, serif" font-size="70" fill="#070707" letter-spacing="-0.5">MACLOVIA.</text>
  <text x="24" y="118" font-family="'Fira Code', monospace" font-size="12" fill="#E4007C" font-weight="700" letter-spacing="3.5">DEVELOPMENT GROUP • CIUDAD DE MÉXICO</text>
  <circle cx="430" cy="74" r="5" fill="#E4007C" />
</svg>`
  },

  badge: {
    id: 'badge',
    badge: 'ASSET 04 · INSIGNIA HERÁLDICA',
    title: 'Insignia de Certificación de Sistemas',
    desc: "Medallón técnico con el lema perimetral 'HIGH-SCALE RESILIENT SYSTEMS • CDMX • SLA 99.98%' para sellos de certificación de software y auditorías de código.",
    viewBox: '0 0 240 240',
    aspectRatio: 1,
    symbolDark: 'icon-maclovia-badge',
    symbolLight: 'icon-maclovia-badge-light',
    filename: 'maclovia-certified-badge',
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <circle cx="120" cy="120" r="115" fill="#070709" stroke="#E4007C" stroke-width="2.5" />
  <circle cx="120" cy="120" r="105" fill="none" stroke="#E4007C" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.6" />
  <circle cx="120" cy="120" r="82" fill="#000000" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
  <text x="120" y="30" font-family="'Fira Code', monospace" font-size="8.5" font-weight="700" fill="#FFA3D5" letter-spacing="1.8" text-anchor="middle">✦ HIGH-SCALE RESILIENT SYSTEMS ✦</text>
  <text x="120" y="222" font-family="'Fira Code', monospace" font-size="8.5" font-weight="700" fill="#FFA3D5" letter-spacing="1.8" text-anchor="middle">CIUDAD DE MÉXICO • SLA 99.98%</text>
  <g transform="translate(70, 70) scale(0.5)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#070707" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <path fill-rule="evenodd" fill="#FF4DA6" d="M 72.2 141.0 L 72.2 61.0 L 103.3 75.6 L 103.3 63.5 L 127.8 76.3 L 125.1 82.6 L 110.8 75.5 L 110.8 141.0 L 103.3 141.0 L 103.3 106.8 L 94.9 106.8 L 94.9 141.0 L 87.5 141.0 L 87.5 106.8 L 79.1 106.8 L 79.1 141.0 Z M 79.1 100.9 L 87.5 100.9 L 87.5 75.1 L 79.1 71.5 Z M 94.9 100.9 L 103.3 100.9 L 103.3 83.4 L 94.9 79.3 Z" />
  </g>
</svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <circle cx="120" cy="120" r="115" fill="#FAF8F8" stroke="#E4007C" stroke-width="2.5" />
  <circle cx="120" cy="120" r="105" fill="none" stroke="#E4007C" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.6" />
  <circle cx="120" cy="120" r="82" fill="#FFFFFF" stroke="rgba(0,0,0,0.08)" stroke-width="1" />
  <text x="120" y="30" font-family="'Fira Code', monospace" font-size="8.5" font-weight="700" fill="#C2006A" letter-spacing="1.8" text-anchor="middle">✦ HIGH-SCALE RESILIENT SYSTEMS ✦</text>
  <text x="120" y="222" font-family="'Fira Code', monospace" font-size="8.5" font-weight="700" fill="#C2006A" letter-spacing="1.8" text-anchor="middle">CIUDAD DE MÉXICO • SLA 99.98%</text>
  <g transform="translate(70, 70) scale(0.5)">
    <polygon points="100,14 182,73 151,170 49,170 18,73" fill="#FFFFFF" stroke="#E4007C" stroke-width="4.5" stroke-linejoin="round" />
    <path fill-rule="evenodd" fill="#E4007C" d="M 72.2 141.0 L 72.2 61.0 L 103.3 75.6 L 103.3 63.5 L 127.8 76.3 L 125.1 82.6 L 110.8 75.5 L 110.8 141.0 L 103.3 141.0 L 103.3 106.8 L 94.9 106.8 L 94.9 141.0 L 87.5 141.0 L 87.5 106.8 L 79.1 106.8 L 79.1 141.0 Z M 79.1 100.9 L 87.5 100.9 L 87.5 75.1 L 79.1 71.5 Z M 94.9 100.9 L 103.3 100.9 L 103.3 83.4 L 94.9 79.3 Z" />
  </g>
</svg>`
  }
};

let toolkitWorkbenchInstance = null;

function initSvgToolkitWorkbench() {
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
        previewSvg.style.width = '88%';
        previewSvg.style.maxWidth = '250px';
        previewSvg.style.height = 'auto';
        previewSvg.style.maxHeight = '95px';
      } else {
        const px = Math.min(currentSize, 180);
        previewSvg.style.width = `${px}px`;
        previewSvg.style.height = `${px}px`;
        previewSvg.style.maxWidth = '85%';
        previewSvg.style.maxHeight = '85%';
      }

      // Update Symbol Use
      const symbolId = currentTheme === 'light' ? asset.symbolLight : asset.symbolDark;
      const useEl = previewSvg.querySelector('use');
      if (useEl) {
        useEl.setAttribute('href', `assets/icons/sprite.svg#${symbolId}`);
      }

      // Animation
      if (isAnimated) {
        previewSvg.classList.add('glow-rosa', 'animate-pulse-glow');
      } else {
        previewSvg.classList.remove('glow-rosa', 'animate-pulse-glow');
      }
    }

    // Frame styling
    if (previewFrame) {
      if (currentTheme === 'light') {
        previewFrame.classList.add('theme-light');
      } else {
        previewFrame.classList.remove('theme-light');
      }

      if (isBlueprintActive) {
        previewFrame.classList.add('blueprint-active');
      } else {
        previewFrame.classList.remove('blueprint-active');
      }
    }

    // Update Text Content
    if (assetBadge) assetBadge.textContent = asset.badge;
    if (assetTitle) assetTitle.textContent = asset.title;
    if (assetDesc) assetDesc.textContent = asset.desc;

    // Sync Asset Switcher Buttons
    assetBtns.forEach((btn) => {
      if (btn.getAttribute('data-asset-type') === currentAssetKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Sync Theme Buttons
    themeBtns.forEach((btn) => {
      if (btn.getAttribute('data-svg-theme') === currentTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  const updateCodeDisplay = () => {
    if (!codePreview) return;
    const rawSvg = getActiveSvgRaw();
    const asset = getActiveAsset();

    if (currentCodeTab === 'xml') {
      codePreview.textContent = rawSvg;
    } else if (currentCodeTab === 'html') {
      codePreview.textContent = `<!-- Embeber en HTML5 (${currentTheme.toUpperCase()} MODE) -->\n<div class="maclovia-brand-asset" style="width: ${currentSize}px;">\n  ${rawSvg.trim()}\n</div>`;
    } else if (currentCodeTab === 'jsx') {
      const componentName = asset.id.charAt(0).toUpperCase() + asset.id.slice(1);
      codePreview.textContent = `// React / Next.js Component\nimport React from 'react';\n\nexport const Maclovia${componentName} = ({ width = ${currentSize}, className = '' }) => (\n  <div className={className} style={{ width, display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: \`${rawSvg.replace(/`/g, '\\`')}\` }} />\n);`;
    } else if (currentCodeTab === 'datauri') {
      const base64 = btoa(unescape(encodeURIComponent(rawSvg)));
      codePreview.textContent = `data:image/svg+xml;base64,${base64}`;
    }
  };

  // Helper to trigger file download
  const triggerDownload = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Switch Asset Type
  assetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentAssetKey = btn.getAttribute('data-asset-type') || 'mark';
      updatePreview();
      updateCodeDisplay();
    });
  });

  // Switch Theme Variant
  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentTheme = btn.getAttribute('data-svg-theme') || 'dark';
      updatePreview();
      updateCodeDisplay();
    });
  });

  // Switch Size
  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => b.classList.remove('active', 'btn-primary'));
      sizeBtns.forEach((b) => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary', 'active');
      currentSize = parseInt(btn.getAttribute('data-svg-size'), 10) || 120;
      updatePreview();
      updateCodeDisplay();
    });
  });

  // Blueprint Construction Toggle
  if (blueprintToggleBtn) {
    blueprintToggleBtn.addEventListener('click', () => {
      isBlueprintActive = !isBlueprintActive;
      blueprintToggleBtn.classList.toggle('active', isBlueprintActive);
      blueprintToggleBtn.querySelector('span').textContent = isBlueprintActive
        ? '📐 Retícula: Visible (Zona Segura)'
        : '📐 Retícula Técnica & Zona Segura';
      updatePreview();
    });
  }

  // Animation Toggle
  if (animToggleBtn) {
    animToggleBtn.addEventListener('click', () => {
      isAnimated = !isAnimated;
      animToggleBtn.textContent = isAnimated ? 'Animación: Activa' : 'Animación: Estática';
      updatePreview();
    });
  }

  // Direct SVG Vector Download
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const activeSvg = getActiveSvgRaw();
      const asset = getActiveAsset();
      const blob = new Blob([activeSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, `${asset.filename}-${currentTheme}.svg`);
      URL.revokeObjectURL(url);
    });
  }

  // PNG 1024px Hi-Res Transparent Exporter
  if (downloadPngBtn) {
    downloadPngBtn.addEventListener('click', () => {
      const origText = downloadPngBtn.innerHTML;
      downloadPngBtn.innerHTML = `<span>Renderizando PNG...</span>`;

      const activeSvg = getActiveSvgRaw();
      const asset = getActiveAsset();
      const blob = new Blob([activeSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = Math.round(1024 / (asset.aspectRatio || 1));
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((pngBlob) => {
          const pngUrl = URL.createObjectURL(pngBlob);
          triggerDownload(pngUrl, `${asset.filename}-${currentTheme}-1024px.png`);
          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(url);
          downloadPngBtn.innerHTML = origText;
        }, 'image/png');
      };
      img.src = url;
    });
  }

  // Web Favicons Pack Exporter
  if (downloadFaviconsBtn) {
    downloadFaviconsBtn.addEventListener('click', () => {
      const origText = downloadFaviconsBtn.innerHTML;
      downloadFaviconsBtn.innerHTML = `<span>Generando Favicons...</span>`;

      const markSvg = MACLOVIA_ASSETS.mark[currentTheme] || MACLOVIA_ASSETS.mark.dark;
      const blob = new Blob([markSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        // 1. Generate 32x32 Favicon
        const c32 = document.createElement('canvas');
        c32.width = 32;
        c32.height = 32;
        const ctx32 = c32.getContext('2d');
        ctx32.drawImage(img, 0, 0, 32, 32);
        c32.toBlob((b32) => {
          triggerDownload(URL.createObjectURL(b32), 'favicon-32x32.png');
        });

        // 2. Generate 180x180 Apple Touch Icon
        const c180 = document.createElement('canvas');
        c180.width = 180;
        c180.height = 180;
        const ctx180 = c180.getContext('2d');
        ctx180.fillStyle = currentTheme === 'light' ? '#FFFFFF' : '#070709';
        ctx180.fillRect(0, 0, 180, 180);
        ctx180.drawImage(img, 18, 18, 144, 144);
        c180.toBlob((b180) => {
          triggerDownload(URL.createObjectURL(b180), 'apple-touch-icon-180x180.png');
          URL.revokeObjectURL(url);
          downloadFaviconsBtn.innerHTML = origText;
        });
      };
      img.src = url;
    });
  }

  // Copy XML to clipboard
  if (copyXmlBtn) {
    copyXmlBtn.addEventListener('click', () => {
      const activeSvg = getActiveSvgRaw();
      copyTextToClipboard(activeSvg, copyXmlBtn);
    });
  }

  // Code Tab Switching
  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      codeTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentCodeTab = tab.getAttribute('data-code-tab');
      updateCodeDisplay();
    });
  });

  // Wallpaper Studio 4K (HTML5 Canvas Engine)
  if (wallpaperGenBtn) {
    wallpaperGenBtn.addEventListener('click', () => {
      const res = wallpaperRes ? wallpaperRes.value : 'desktop-4k';
      const palette = wallpaperPalette ? wallpaperPalette.value : 'obsidian';

      const origText = wallpaperGenBtn.innerHTML;
      wallpaperGenBtn.innerHTML = `<span>Renderizando 4K...</span>`;

      const width = res === 'mobile-retina' ? 1170 : 3840;
      const height = res === 'mobile-retina' ? 2532 : 2160;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // 1. Fill Background
      if (palette === 'alabaster') {
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.7);
        bgGrad.addColorStop(0, '#FFFFFF');
        bgGrad.addColorStop(0.6, '#FFF2F8');
        bgGrad.addColorStop(1, '#F6EFF3');
        ctx.fillStyle = bgGrad;
      } else if (palette === 'void') {
        ctx.fillStyle = '#000000';
      } else {
        // Obsidian
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width * 0.75);
        bgGrad.addColorStop(0, '#1F0314');
        bgGrad.addColorStop(0.55, '#0C0208');
        bgGrad.addColorStop(1, '#050507');
        ctx.fillStyle = bgGrad;
      }
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Coordinate Grid Lines
      ctx.strokeStyle = palette === 'alabaster' ? 'rgba(228, 0, 124, 0.04)' : 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const step = 80;
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

      // 3. Central Ambient Glow
      const glowGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.35);
      glowGrad.addColorStop(0, 'rgba(228, 0, 124, 0.22)');
      glowGrad.addColorStop(0.5, 'rgba(228, 0, 124, 0.08)');
      glowGrad.addColorStop(1, 'rgba(228, 0, 124, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Render Centered Vector Mark
      const markSvg = MACLOVIA_ASSETS.mark[palette === 'alabaster' ? 'light' : 'dark'];
      const blob = new Blob([markSvg], { type: 'image/svg+xml;charset=utf-8' });
      const markUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const markSize = res === 'mobile-retina' ? 440 : 540;
        const markX = (width - markSize) / 2;
        const markY = (height - markSize) / 2 - (res === 'mobile-retina' ? 80 : 40);

        ctx.drawImage(img, markX, markY, markSize, markSize);

        // 5. Bottom Editorial Typography Lockup
        ctx.textAlign = 'center';
        ctx.font = `700 ${res === 'mobile-retina' ? 24 : 36}px 'Abril Fatface', Georgia, serif`;
        ctx.fillStyle = palette === 'alabaster' ? '#070707' : '#FFFFFF';
        ctx.fillText('MACLOVIA. BELLEZA MALDITA', width / 2, height - (res === 'mobile-retina' ? 160 : 180));

        ctx.font = `600 ${res === 'mobile-retina' ? 14 : 16}px 'Fira Code', monospace`;
        ctx.fillStyle = '#E4007C';
        ctx.fillText('19.4326° N, 99.1332° W • CIUDAD DE MÉXICO • ZERO-OBSOLESCENCE MONOLITH', width / 2, height - (res === 'mobile-retina' ? 120 : 135));

        canvas.toBlob((wBlob) => {
          const wUrl = URL.createObjectURL(wBlob);
          triggerDownload(wUrl, `maclovia-wallpaper-${res}-${palette}.png`);
          URL.revokeObjectURL(wUrl);
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

  /* Alabaster Mode (Light) */
  --bg-alabaster-root: #FAF8F8;
  --bg-alabaster-surface: #FFFFFF;
  --bg-alabaster-card: #FFFFFF;
  --border-alabaster: rgba(0, 0, 0, 0.08);

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
            alabaster: {
              root: { value: "#FAF8F8" },
              surface: { value: "#FFFFFF" }
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

  // Expose updater for site theme changes
  toolkitWorkbenchInstance = {
    setTheme(newTheme) {
      currentTheme = newTheme;
      updatePreview();
      updateCodeDisplay();
    }
  };
}

// --- App Bootstrap ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initBrandSwitcher();
  initCdmxClock();
  initBackToTop();
  initMockupTabs();
  initPortfolioFilters();
  initSvgToolkitWorkbench();

  renderCeoProfile();
  renderProjects('all');

  window.addEventListener('languagechange', () => {
    renderCeoProfile();
    const activeFilterBtn = document.querySelector('[data-filter].btn-primary');
    const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    renderProjects(filter);

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
