/**
 * Maclovia / Belleza Maldita — Terminal Output Helpers
 * Fábrica de primitivas de render (escape, scroll, log, bienvenida)
 * desacopladas del wiring del DOM.
 */

import { ASCII_BANNER } from './banner.js';

export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function createTerminalOutput({ viewport, history }) {
  function scrollToBottom() {
    viewport.scrollTop = viewport.scrollHeight;
  }

  function appendLog(rawHtml, command = null) {
    const entry = document.createElement('div');
    entry.className = 'cli-log-entry';

    let html = '';
    if (command !== null) {
      html += `
        <div class="cli-log-command">
          <span class="text-rosa font-bold">erick@cdmx</span>:<span style="color: #60a5fa;">~/projects</span><span class="text-rosa">$</span>
          <span class="command-text">${escapeHtml(command)}</span>
        </div>
      `;
    }
    html += `<div class="cli-log-result">${rawHtml}</div>`;
    entry.innerHTML = html;
    history.appendChild(entry);
    scrollToBottom();
  }

  function printWelcome() {
    history.innerHTML = `
      <pre class="text-rosa" style="font-family: var(--font-mono); font-weight: 700; font-size: clamp(0.46rem, 1.1vw, 0.7rem); line-height: 1.15; margin-bottom: 0.85rem; text-shadow: 0 0 15px rgba(228,0,124,0.4); overflow-x: auto;">${ASCII_BANNER}</pre>
      <div style="color: var(--text-muted); display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1rem; font-size: 0.72rem;">
        <div>[✦] Entorno de terminal interactivo <strong style="color: #ffffff;">Maclovia. Belleza Maldita</strong> (CDMX) v1.1.0</div>
        <div>[OK] CEO &amp; Arquitecto Principal: <span class="text-rosa" style="font-weight: 600;">Erick Jonathan Aguilar García</span></div>
        <div>[i] Escribe <button type="button" class="cli-chip" data-cli-cmd="help" style="padding: 0.1rem 0.4rem; margin: 0 0.2rem;">help</button> para explorar los comandos, o usa los chips superiores.</div>
      </div>
    `;
    scrollToBottom();
  }

  return { scrollToBottom, appendLog, printWelcome };
}
