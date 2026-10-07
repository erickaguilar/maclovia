/**
 * Maclovia / Belleza Maldita — Portfolio & Projects Module
 * Renderizado dinámico del catálogo de software con soporte multilingüe,
 * badges de telemetría de GitHub y cajón desplegable de especificaciones de arquitectura.
 */

import { PROJECTS } from '../data/projects.js';
import { getLanguage } from '../i18n.js';
import { githubState } from './telemetry.js';

export function renderProjects(filter = 'all') {
  const container = document.getElementById('portfolio-grid-container');
  if (!container) return;

  const currentLang = getLanguage();
  const isZh = currentLang === 'zh';
  const isEn = currentLang === 'en';

  const filtered = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  const countEl = document.getElementById('portfolio-project-count');
  if (countEl) {
    countEl.textContent = `${filtered.length} ${isZh ? '个认证模块' : (isEn ? 'certified modules' : 'módulos certificados')}`;
  }

  const starsLabel = isZh ? '星标' : (isEn ? 'Stars' : 'Estrellas');
  const forksLabel = isZh ? '分支' : (isEn ? 'Forks' : 'Forks');

  container.innerHTML = filtered.map((p) => {
    const arch = p.architectureDetails;
    const highlights = isZh && arch.highlightsZh
      ? arch.highlightsZh
      : (isEn ? arch.highlightsEn : arch.highlightsEs);

    const badgeCategory = isZh && p.badgeCategoryZh
      ? p.badgeCategoryZh
      : (isEn ? p.badgeCategoryEn : p.badgeCategoryEs);

    const projectName = isZh && p.nameZh ? p.nameZh : p.name;
    const projectDesc = isZh && p.descriptionZh
      ? p.descriptionZh
      : (isEn ? p.descriptionEn : p.descriptionEs);

    const repoStats = githubState.stats[p.repoName];
    const starCount = repoStats && typeof repoStats.stars === 'number' ? repoStats.stars : '--';
    const forkCount = repoStats && typeof repoStats.forks === 'number' ? repoStats.forks : '--';

    return `
      <div class="project-card" data-category="${p.category}" id="project-card-${p.id}">
        <div>
          <div class="project-badge">
            ${badgeCategory}
          </div>
          <h4 class="project-title">${projectName}</h4>
          <p class="project-desc">${projectDesc}</p>
          
          <!-- Real-Time GitHub Telemetry Badges -->
          <div class="project-card-telemetry">
            <a href="${p.githubUrl}/stargazers" target="_blank" rel="noopener noreferrer" class="project-github-stat stars" title="${p.repoName} Stars (GitHub)">
              <svg class="icon icon-stroke text-amber"><use href="assets/icons/sprite.svg#icon-star"></use></svg>
              <span id="star-count-${p.id}" class="stat-count font-bold">${starCount}</span>
              <span class="stat-label text-muted">${starsLabel}</span>
            </a>
            <a href="${p.githubUrl}/network/members" target="_blank" rel="noopener noreferrer" class="project-github-stat forks" title="${p.repoName} Forks (GitHub)">
              <svg class="icon icon-stroke text-sky"><use href="assets/icons/sprite.svg#icon-git-fork"></use></svg>
              <span id="fork-count-${p.id}" class="stat-count font-bold">${forkCount}</span>
              <span class="stat-label text-muted">${forksLabel}</span>
            </a>
          </div>

          <!-- Terminal Command Box -->
          <div class="terminal-box">
            <code>${p.cloneCmd}</code>
            <button class="copy-btn" data-copy-text="${p.cloneCmd}" title="Copiar comando">
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-copy"></use></svg>
            </button>
          </div>

          <!-- Tech Stack Tags -->
          <div class="ceo-specialties mb-md">
            ${p.techStack.map((tech) => `<span class="specialty-pill">${tech}</span>`).join('')}
          </div>

          <!-- Architecture Specs Toggle Button -->
          <button class="btn btn-ghost w-full flex-between mb-sm" data-toggle-arch="${p.id}">
            <span class="flex-row-center gap-xs text-rosa">
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-cpu"></use></svg>
              <span>${isZh ? '架构与性能基准' : (isEn ? 'Architecture & Benchmarks' : 'Arquitectura & Métricas')}</span>
            </span>
            <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-arrow-down"></use></svg>
          </button>

          <!-- Collapsible Architecture Specs Drawer -->
          <div class="architecture-drawer" id="arch-drawer-${p.id}">
            <div class="text-primary mb-xs">
              <strong class="text-rosa">Runtime:</strong> ${arch.runtime}
            </div>
            <div class="text-primary mb-xs">
              <strong class="text-rosa">Throughput:</strong> ${arch.throughput}
            </div>
            <div class="text-secondary mb-sm">
              <strong class="text-rosa">Format / Quant:</strong> ${arch.quantizationOrType}
            </div>

            <!-- Highlights -->
            <ul class="dos-list mb-sm gap-xs">
              ${highlights.map((h) => `
                <li class="flex-row-center gap-xs text-muted font-mono-xs">
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
                    <div class="text-rosa font-bold font-mono-xs">${b.value}</div>
                    <div class="text-primary font-mono-xs">${b.label}</div>
                    <div class="text-xs-muted">${b.subtext}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Action Links: 1 CTA primario + links texto -->
        <div class="project-card-actions">
          ${p.demoUrl ? `
            <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>Demo</span>
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-arrow-up-right"></use></svg>
            </a>
          ` : `
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>Ver código</span>
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-arrow-up-right"></use></svg>
            </a>
          `}

          <div class="project-links-row">
            ${p.demoUrl ? `
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                <span>GitHub</span>
              </a>
            ` : ''}
            ${p.huggingFaceUrl ? `
              <a href="${p.huggingFaceUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                <span>Hugging Face</span>
              </a>
            ` : ''}
          </div>
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

export function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}
