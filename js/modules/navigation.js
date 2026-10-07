/**
 * Maclovia / Belleza Maldita — Navigation & Mobile Drawer Module
 * Conmutador de perspectiva de marca (Unificada, Maclovia, Belleza Maldita)
 * y control del menú lateral responsive para dispositivos móviles.
 */

const BRAND_MODES = ['unified', 'maclovia', 'belleza'];
let currentBrandMode = 'unified';

export function setBrandMode(mode) {
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

  // Update pills and mobile brand buttons
  document.querySelectorAll('.brand-switch-btn, .mobile-brand-btn').forEach((btn) => {
    if (btn.getAttribute('data-brand-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

export function initBrandSwitcher() {
  document.querySelectorAll('.brand-switch-btn, .mobile-brand-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-brand-mode');
      setBrandMode(mode);
    });
  });
}

export function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const closeBtn = document.getElementById('mobile-nav-close-btn');
  const openIcon = menuBtn ? menuBtn.querySelector('.menu-open-icon') : null;
  const closeIcon = menuBtn ? menuBtn.querySelector('.menu-close-icon') : null;

  if (!menuBtn || !drawer) return;

  let lastFocused = null;
  const focusableSelector = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
  const getFocusable = () => Array.from(drawer.querySelectorAll(focusableSelector)).filter((el) => el.offsetParent !== null);

  const openDrawer = () => {
    lastFocused = document.activeElement;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (openIcon) openIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'inline-block';
    const first = getFocusable()[0];
    if (first) first.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (openIcon) openIcon.style.display = 'inline-block';
    if (closeIcon) closeIcon.style.display = 'none';
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  };

  menuBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close drawer on navigation click
  drawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Focus trap + Escape
  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = getFocusable();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}
