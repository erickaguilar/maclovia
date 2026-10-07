/**
 * Maclovia / Belleza Maldita — Executive Leadership & Team Module
 * Renderizado de la ficha directiva del CEO & Arquitecto Principal de Software,
 * biografía localizada, métricas de resiliencia y canales ejecutivos directos.
 */

import { CEO_PROFILE } from '../data/team.js';
import { getLanguage } from '../i18n.js';

const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' rx='16' fill='%23070709'/%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23E4007C' stroke-width='2' opacity='0.5'/%3E%3Ctext x='50' y='59' font-family='monospace' font-size='26' font-weight='bold' fill='%23E4007C' text-anchor='middle'%3EEJ%3C/text%3E%3C/svg%3E";

export function renderCeoProfile() {
  const container = document.getElementById('ceo-profile-container');
  if (!container) return;

  const currentLang = getLanguage();
  const isZh = currentLang === 'zh';
  const isEn = currentLang === 'en';

  const role = isZh && CEO_PROFILE.roleZh
    ? CEO_PROFILE.roleZh
    : (isEn ? CEO_PROFILE.roleEn : CEO_PROFILE.roleEs);

  const bio = isZh && CEO_PROFILE.bioZh
    ? CEO_PROFILE.bioZh
    : (isEn ? CEO_PROFILE.bioEn : CEO_PROFILE.bioEs);

  const specialties = isZh && CEO_PROFILE.specialtiesZh
    ? CEO_PROFILE.specialtiesZh
    : CEO_PROFILE.specialties;

  const experienceLabel = isZh && CEO_PROFILE.metrics.experienceLabelZh
    ? CEO_PROFILE.metrics.experienceLabelZh
    : (isEn ? CEO_PROFILE.metrics.experienceLabelEn : CEO_PROFILE.metrics.experienceLabelEs);

  const systemsLabel = isZh && CEO_PROFILE.metrics.systemsLabelZh
    ? CEO_PROFILE.metrics.systemsLabelZh
    : (isEn ? CEO_PROFILE.metrics.systemsLabelEn : CEO_PROFILE.metrics.systemsLabelEs);

  const focusLabel = isZh && CEO_PROFILE.metrics.focusLabelZh
    ? CEO_PROFILE.metrics.focusLabelZh
    : (isEn ? CEO_PROFILE.metrics.focusLabelEn : CEO_PROFILE.metrics.focusLabelEs);

  container.innerHTML = `
    <div class="ceo-card">
      <div class="ceo-grid">
        <!-- Top bar -->
        <div class="ceo-topbar">
          <div class="flex-row-center gap-md">
            <span class="ceo-badge">
              ${role}
            </span>
            <span class="font-mono text-muted text-xs-muted flex-row-center gap-xs">
              <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-map-pin"></use></svg>
              ${CEO_PROFILE.location}
            </span>
          </div>

          <div class="flex-row-center gap-md">
            <a href="https://github.com/${CEO_PROFILE.githubHandle}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg class="icon"><use href="assets/icons/sprite.svg#icon-github"></use></svg>
              <span>@${CEO_PROFILE.githubHandle}</span>
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-arrow-up-right"></use></svg>
            </a>

            <button data-copy-text="${CEO_PROFILE.email}" class="btn btn-primary" title="Copiar email ejecutivo al portapapeles">
              <svg class="icon icon-stroke"><use href="assets/icons/sprite.svg#icon-mail"></use></svg>
              <span>${isZh ? '业务联络' : (isEn ? 'Executive Contact' : 'Contacto Ejecutivo')}</span>
            </button>
          </div>
        </div>

        <!-- Main avatar + info -->
        <div class="ceo-main">
          <div class="ceo-avatar-wrap">
            <img 
              src="${CEO_PROFILE.avatarUrl || 'https://github.com/AUGE1405.png'}" 
              alt="${CEO_PROFILE.name}" 
              class="ceo-avatar"
              width="104"
              height="104"
              loading="lazy"
              decoding="async"
            />
            <span class="ceo-tag">CEO</span>
          </div>

          <div class="ceo-details">
            <h3>${CEO_PROFILE.name}</h3>
            <p class="ceo-role-title">${role}</p>
            <p class="ceo-bio">${bio}</p>
            
            <div class="ceo-specialties">
              ${specialties.map((spec) => `<span class="specialty-pill">${spec}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Footer metrics -->
        <div class="ceo-footer">
          <div class="ceo-metrics">
            <div>
              <div class="metric-val">${CEO_PROFILE.metrics.experience}</div>
              <div class="metric-lbl">${experienceLabel}</div>
            </div>
            <div>
              <div class="metric-val text-primary">${CEO_PROFILE.metrics.systems}</div>
              <div class="metric-lbl">${systemsLabel}</div>
            </div>
            <div>
              <div class="metric-val text-secondary">${CEO_PROFILE.metrics.focus}</div>
              <div class="metric-lbl">${focusLabel}</div>
            </div>
          </div>

          <a href="#portfolio-section" class="btn btn-secondary">
            <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-briefcase"></use></svg>
            <span>${isZh ? '查看工程项目' : (isEn ? 'View Engineering Portfolio' : 'Ver Portafolio de Ingeniería')}</span>
            <svg class="icon icon-stroke text-rosa"><use href="assets/icons/sprite.svg#icon-arrow-down"></use></svg>
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach safe fallback listener
  const avatarImg = container.querySelector('.ceo-avatar');
  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      avatarImg.src = FALLBACK_AVATAR;
    }, { once: true });
  }
}
