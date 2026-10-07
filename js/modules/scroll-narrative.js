/**
 * Maclovia — Narrativa interactiva por scroll
 * Minimalismo extremo: progreso 2px, reveal editorial, capítulos 01-05.
 * Sin dependencias. Respeta prefers-reduced-motion.
 */

const CHAPTERS = [
  { id: 'hero', num: '00', label: 'Portada' },
  { id: 'executive-profile', num: '01', label: 'Dirección' },
  { id: 'portfolio-section', num: '02', label: 'Portafolio' },
  { id: 'guidelines-section', num: '03', label: 'Marca' },
  { id: 'toolkit-section', num: '04', label: 'SVG Kit' },
];

const REVEAL_SELECTOR =
  '.hero-badge, .brand-switcher-bar, .hero-brand-stage, .hero-desc, ' +
  '.hero-cta-wrap, .hero-ceo-badge-wrap, .hero-scroll-hint, ' +
  '.section-header, .portfolio-filter-bar, .github-telemetry-panel, ' +
  '.project-card, .ceo-card, .mockup-container, .guidelines-stack > div, ' +
  '.typography-spec-card, .color-swatch-card, .dos-card, .donts-card, ' +
  '.footer-pillars-grid > div';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ensureChrome() {
  let progress = document.querySelector('.narrative-progress');
  if (!progress) {
    progress = document.createElement('div');
    progress.className = 'narrative-progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.innerHTML = '<div class="narrative-progress-bar"></div>';
    document.body.prepend(progress);
  }
  let chapter = document.querySelector('.narrative-chapter');
  if (!chapter) {
    chapter = document.createElement('div');
    chapter.className = 'narrative-chapter';
    chapter.setAttribute('aria-hidden', 'true');
    chapter.innerHTML =
      '<strong>00</strong><span class="narrative-chapter-line"></span><span data-chapter-label>Portada</span>';
    document.body.appendChild(chapter);
  }
  return {
    bar: progress.querySelector('.narrative-progress-bar'),
    num: chapter.querySelector('strong'),
    label: chapter.querySelector('[data-chapter-label]'),
  };
}

function tagSections() {
  const hero = document.querySelector('.hero-section');
  if (hero && !hero.id) hero.id = 'hero';

  CHAPTERS.forEach((c) => {
    const el = document.getElementById(c.id);
    if (!el) return;
    const headerTag = el.querySelector('.section-tag span:last-child, .section-tag');
    if (el.dataset.chapterTagged) return;
    el.dataset.chapterTagged = '1';
    el.dataset.chapterNum = c.num;
    el.dataset.chapterLabel = c.label;

    // Prefija número editorial si hay section-tag y aún no tiene índice
    const tagRow = el.querySelector('.section-tag');
    if (tagRow && !tagRow.querySelector('.section-index')) {
      const idx = document.createElement('span');
      idx.className = 'section-index';
      idx.textContent = `${c.num} /`;
      tagRow.prepend(idx);
    }
  });
}

function initReveal() {
  const els = Array.from(document.querySelectorAll(REVEAL_SELECTOR)).filter(
    (el) => !el.classList.contains('reveal')
  );
  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  els.forEach((el) => {
    // Stagger dentro de grids: retrasa por índice entre hermanos visibles
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter((s) =>
        s.matches('.project-card, .color-swatch-card, .typography-spec-card')
      );
      const i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty('--reveal-delay', `${Math.min(i * 70, 280)}ms`);
    }
    el.classList.add('reveal');
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
}

function initProgressAndChapters(chrome) {
  const bar = chrome.bar;
  let ticking = false;

  const spyTargets = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-item-link'));

  const setChapter = (num, label) => {
    if (chrome.num.textContent !== num) chrome.num.textContent = num;
    if (chrome.label.textContent !== label) chrome.label.textContent = label;
    navLinks.forEach((a) => {
      const href = a.getAttribute('href') || '';
      const on = href === `#${currentId()}`;
      a.classList.toggle('is-active', on);
    });
  };

  let activeId = 'hero';
  const currentId = () => activeId;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          activeId = e.target.id;
          const meta = CHAPTERS.find((c) => c.id === activeId);
          if (meta) setChapter(meta.num, meta.label);
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  spyTargets.forEach((t) => spy.observe(t));

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.width = `${(p * 100).toFixed(2)}%`;
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initScrollNarrative() {
  tagSections();
  const chrome = ensureChrome();
  initReveal();
  initProgressAndChapters(chrome);

  // Re-etiqueta tarjetas renderizadas dinámicamente (portafolio/CEO)
  const grid = document.getElementById('portfolio-grid-container');
  if (grid) {
    const mo = new MutationObserver(() => initReveal());
    mo.observe(grid, { childList: true });
  }
  const ceo = document.getElementById('ceo-profile-container');
  if (ceo) {
    const mo2 = new MutationObserver(() => initReveal());
    mo2.observe(ceo, { childList: true });
  }
}
