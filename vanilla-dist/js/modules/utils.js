/**
 * Maclovia / Belleza Maldita — Utilities Module
 * Reloj en tiempo real sincronizado con el huso horario de la Ciudad de México (CST),
 * y controlador de scroll fluido para el botón "Volver Arriba".
 */

export function initCdmxClock() {
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

export function initBackToTop() {
  const btn = document.getElementById('btn-back-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
