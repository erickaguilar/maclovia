/**
 * Maclovia / Belleza Maldita — Mockups & Interactive CLI Terminal Engine
 * Cero frameworks • DOM nativo • Iconos SVG declarativos • Fallback seguro
 */

import { PROJECTS } from './data/projects.js';
import { CEO_PROFILE } from './data/team.js';

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback clipboard copy failed:', err);
  }
  document.body.removeChild(textArea);
}

/**
 * Gestor de Portapapeles (Copy-to-Clipboard) nativo con retroalimentación inmediata
 * @param {string} text - Texto a copiar al portapapeles
 * @param {HTMLElement} btnElement - Elemento disparador para mostrar retroalimentación
 */
export function copyText(text, btnElement) {
  if (!text) return;

  const triggerFeedback = () => {
    if (!btnElement) return;

    const originalContent = btnElement.innerHTML;
    const isSmallBtn = btnElement.classList.contains('copy-btn') || btnElement.classList.contains('color-swatch-copy');

    if (isSmallBtn) {
      btnElement.innerHTML = `<svg class="icon icon-stroke" style="color: #34d399;"><use href="assets/icons/sprite.svg#icon-check"></use></svg>`;
    } else {
      btnElement.innerHTML = `
        <svg class="icon icon-stroke" style="color: #34d399;"><use href="assets/icons/sprite.svg#icon-check"></use></svg>
        <span style="color: #34d399; font-weight: 600;">¡Copiado!</span>
      `;
    }

    setTimeout(() => {
      btnElement.innerHTML = originalContent;
    }, 2000);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(triggerFeedback)
      .catch(() => {
        fallbackCopyText(text);
        triggerFeedback();
      });
  } else {
    fallbackCopyText(text);
    triggerFeedback();
  }
}

// Alias de retrocompatibilidad
export const copyTextToClipboard = copyText;

const ASCII_BANNER = `  ███╗   ███╗ █████╗  ██████╗██╗      ██████╗ ██╗   ██╗██╗ █████╗ 
  ████╗ ████║██╔══██╗██╔════╝██║     ██╔═══██╗██║   ██║██║██╔══██╗
  ██╔████╔██║███████║██║     ██║     ██║   ██║██║   ██║██║███████║
  ██║╚██╔╝██║██╔══██║██║     ██║     ██║   ██║╚██╗ ██╔╝██║██╔══██║
  ██║ ╚═╝ ██║██║  ██║╚██████╗███████╗╚██████╔╝ ╚████╔╝ ██║██║  ██║
  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝  ╚═╝
             ✦ B E L L E Z A   M A L D I T A ✦`;

const AVAILABLE_COMMANDS = [
  { name: 'help', desc: 'Muestra la lista de comandos disponibles' },
  { name: 'projects', desc: 'Lista los módulos certificados de ingeniería (alias: ls)' },
  { name: 'ceo', desc: 'Despliega credenciales del CEO Erick Jonathan Aguilar (alias: whoami)' },
  { name: 'theme', desc: 'Alterna o define el tema: theme light | theme dark' },
  { name: 'tokens', desc: 'Imprime la paleta oficial de diseño y tokens cromáticos' },
  { name: 'specs', desc: 'Muestra las especificaciones del runtime y arquitectura' },
  { name: 'bench', desc: 'Ejecuta un micro-benchmark del CPU y latencia del cliente' },
  { name: 'time', desc: 'Muestra la hora oficial en CDMX y coordenadas geográficas' },
  { name: 'init', desc: 'Simula el andamiaje de un proyecto: init <nombre-app>' },
  { name: 'banner', desc: 'Reimprime el banner oficial de arte ASCII' },
  { name: 'clear', desc: 'Limpia la pantalla de la terminal' },
  { name: 'echo', desc: 'Imprime el texto proporcionado' },
];

/**
 * Motor de Terminal Shell Interactiva (Vanilla JS)
 */
function initInteractiveTerminal() {
  const cliViewport = document.getElementById('cli-viewport');
  const cliHistory = document.getElementById('cli-history');
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  const cliClearBtn = document.getElementById('cli-clear-btn');
  const termDotRed = document.getElementById('term-dot-red');
  const termDotYellow = document.getElementById('term-dot-yellow');
  const termDotGreen = document.getElementById('term-dot-green');
  const terminalWindow = document.getElementById('terminal-window');

  if (!cliViewport || !cliHistory || !cliInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  function printInitialWelcome() {
    cliHistory.innerHTML = `
      <pre class="text-rosa" style="font-family: var(--font-mono); font-weight: 700; font-size: clamp(0.46rem, 1.1vw, 0.7rem); line-height: 1.15; margin-bottom: 0.85rem; text-shadow: 0 0 15px rgba(228,0,124,0.4); overflow-x: auto;">${ASCII_BANNER}</pre>
      <div style="color: var(--text-muted); display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1rem; font-size: 0.72rem;">
        <div>[✦] Entorno de terminal interactivo <strong style="color: #ffffff;">Maclovia. Belleza Maldita</strong> (CDMX) v1.1.0</div>
        <div>[✔] CEO &amp; Arquitecto Principal: <span class="text-rosa" style="font-weight: 600;">Erick Jonathan Aguilar García</span></div>
        <div>[i] Escribe <button type="button" class="cli-chip" data-cli-cmd="help" style="padding: 0.1rem 0.4rem; margin: 0 0.2rem;">help</button> para explorar los comandos, o usa los chips superiores.</div>
      </div>
    `;
    scrollToBottom();
  }

  function scrollToBottom() {
    cliViewport.scrollTop = cliViewport.scrollHeight;
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
    cliHistory.appendChild(entry);
    scrollToBottom();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function executeCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help': {
        const rows = AVAILABLE_COMMANDS.map(c => 
          `<tr><td>${c.name}</td><td>${c.desc}</td></tr>`
        ).join('');
        appendLog(`
          <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Comandos disponibles en Maclovia CLI:</div>
          <table class="cli-table">
            <tbody>${rows}</tbody>
          </table>
          <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.5rem;">
            Tip: Puedes usar <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">Tab</kbd> para autocompletar y las flechas <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">↑</kbd> <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">↓</kbd> para navegar en el historial.
          </div>
        `, trimmed);
        break;
      }

      case 'projects':
      case 'ls': {
        const list = PROJECTS.map((p, idx) => `
          <div style="margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; border-left: 2px solid var(--color-rosa-chilango);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem;">
              <strong style="color: #ffffff;">[${idx + 1}] ${escapeHtml(p.name)}</strong>
              <span class="text-rosa" style="font-size: 0.65rem;">${p.category.toUpperCase()}</span>
            </div>
            <div style="color: var(--text-muted); font-size: 0.7rem; margin: 0.25rem 0;">${escapeHtml(p.taglineEs)}</div>
            <div style="display: flex; gap: 0.75rem; font-size: 0.65rem; color: #60a5fa;">
              <span>Repo: <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">${p.repoName}</a></span>
              <span>Stack: ${p.techStack.slice(0, 3).join(', ')}</span>
            </div>
          </div>
        `).join('');
        appendLog(`
          <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Portafolio de Sistemas Certificados (${PROJECTS.length} módulos):</div>
          ${list}
        `, trimmed);
        break;
      }

      case 'ceo':
      case 'whoami': {
        appendLog(`
          <div style="padding: 0.75rem; background: rgba(228, 0, 124, 0.05); border: 1px solid var(--color-rosa-border); border-radius: 6px;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--color-rosa-chilango); box-shadow: 0 0 10px var(--color-rosa-chilango);"></span>
              <strong style="color: #ffffff; font-size: 0.85rem;">${CEO_PROFILE.name}</strong>
              <span class="text-rosa" style="font-size: 0.65rem; border: 1px solid var(--color-rosa-border); padding: 0.1rem 0.35rem; border-radius: 3px;">CDMX</span>
            </div>
            <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.7rem;">
              ${escapeHtml(CEO_PROFILE.bioEs)}
            </div>
            <table class="cli-table" style="margin: 0;">
              <tr><td>Rol:</td><td style="color: #ffffff;">${CEO_PROFILE.roleEs}</td></tr>
              <tr><td>Sede:</td><td style="color: #ffffff;">${CEO_PROFILE.location}</td></tr>
              <tr><td>Email:</td><td><a href="mailto:${CEO_PROFILE.email}" style="color: var(--color-rosa-chilango); text-decoration: underline;">${CEO_PROFILE.email}</a></td></tr>
              <tr><td>GitHub:</td><td><a href="https://github.com/${CEO_PROFILE.githubHandle}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">@${CEO_PROFILE.githubHandle}</a></td></tr>
              <tr><td>Enfoque:</td><td>${CEO_PROFILE.specialties.join(' • ')}</td></tr>
            </table>
          </div>
        `, trimmed);
        break;
      }

      case 'theme': {
        const targetTheme = args[0]?.toLowerCase();
        let newTheme = 'dark';
        if (targetTheme === 'light' || targetTheme === 'porcelana') {
          newTheme = 'light';
        } else if (targetTheme === 'dark' || targetTheme === 'obsidiana') {
          newTheme = 'dark';
        } else {
          // Toggle
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          newTheme = current === 'dark' ? 'light' : 'dark';
        }

        window.dispatchEvent(new CustomEvent('maclovia:set-theme', { detail: { theme: newTheme } }));

        appendLog(`
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #34d399;">
            <svg class="icon icon-stroke" style="width: 1rem; height: 1rem;"><use href="assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Tema global del sistema actualizado a: <strong style="color: #ffffff;">${newTheme === 'dark' ? 'Obsidiana (Dark Mode)' : 'Porcelana (Light Mode)'}</strong></span>
          </div>
        `, trimmed);
        break;
      }

      case 'tokens': {
        appendLog(`
          <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Sistema Cromático y Design Tokens Oficiales:</div>
          <table class="cli-table">
            <tr>
              <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #E4007C; border-radius: 2px; margin-right: 4px;"></span> Rosa Chilango</td>
              <td style="color: #ffffff;">#E4007C • RGB(228, 0, 124) • Pantone 806 C</td>
            </tr>
            <tr>
              <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #070707; border: 1px solid #333; border-radius: 2px; margin-right: 4px;"></span> Azabache Void</td>
              <td style="color: #ffffff;">#070707 • RGB(7, 7, 7) • Fondo Monolito</td>
            </tr>
            <tr>
              <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #FAF8F8; border-radius: 2px; margin-right: 4px;"></span> Alabastro</td>
              <td style="color: #ffffff;">#FAF8F8 • RGB(250, 248, 248) • Alta Costura</td>
            </tr>
            <tr>
              <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #27272A; border-radius: 2px; margin-right: 4px;"></span> Pizarra Grafito</td>
              <td style="color: #ffffff;">#27272A • RGB(39, 39, 42) • Líneas Mecánicas</td>
            </tr>
            <tr>
              <td>Tipografía Display</td>
              <td>Abril Fatface (Serif / Titulares)</td>
            </tr>
            <tr>
              <td>Tipografía Script</td>
              <td>Cookie Script (Firma / Belleza Maldita)</td>
            </tr>
            <tr>
              <td>Tipografía Código</td>
              <td>Fira Code (Monospace / Terminal & Datos)</td>
            </tr>
          </table>
        `, trimmed);
        break;
      }

      case 'specs':
      case 'sysinfo': {
        appendLog(`
          <div style="padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px;">
            <div style="color: #ffffff; font-weight: 600; margin-bottom: 0.35rem;">Especificaciones de Arquitectura Maclovia:</div>
            <table class="cli-table" style="margin: 0;">
              <tr><td>Runtime:</td><td style="color: #ffffff;">Node.js 22 LTS / Rust Sovereign Core</td></tr>
              <tr><td>Compresión:</td><td style="color: #ffffff;">Zero-copy mmap flat file (.gaje v2)</td></tr>
              <tr><td>Cliente:</td><td style="color: #ffffff;">0 KB Frameworks (Vanilla ES6+ Puro)</td></tr>
              <tr><td>Vectorial:</td><td style="color: #ffffff;">SVG Sprite Nativo (34 símbolos, Zero-Emojis)</td></tr>
              <tr><td>Lighthouse:</td><td style="color: #34d399;">100 / 100 (Perf, a11y, Best Practices, SEO)</td></tr>
              <tr><td>Latencia CDMX:</td><td style="color: #34d399;">&lt; 15ms Edge Routing</td></tr>
            </table>
          </div>
        `, trimmed);
        break;
      }

      case 'bench': {
        const start = performance.now();
        let acc = 0;
        for (let i = 0; i < 1000000; i++) {
          acc += Math.sqrt(i) * Math.sin(i);
        }
        const duration = performance.now() - start;
        const cores = navigator.hardwareConcurrency || 'N/A';
        const platform = navigator.userAgentData?.platform || navigator.platform || 'N/A';

        appendLog(`
          <div style="padding: 0.5rem 0.75rem; background: rgba(52, 211, 153, 0.05); border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 4px;">
            <div style="color: #34d399; font-weight: 600; margin-bottom: 0.35rem;">Micro-Benchmark CPU del Cliente Completado:</div>
            <table class="cli-table" style="margin: 0;">
              <tr><td>Operación:</td><td style="color: #ffffff;">1,000,000 cálculos trigonométricos de coma flotante</td></tr>
              <tr><td>Latencia CPU:</td><td style="color: #34d399; font-weight: 700;">${duration.toFixed(2)} ms</td></tr>
              <tr><td>Núcleos:</td><td style="color: #ffffff;">${cores} cores detectados</td></tr>
              <tr><td>Plataforma:</td><td style="color: #ffffff;">${escapeHtml(platform)}</td></tr>
              <tr><td>Diagnóstico:</td><td style="color: #ffffff;">Dispositivo óptimo para ejecución WASM e inferencia cliente.</td></tr>
            </table>
          </div>
        `, trimmed);
        break;
      }

      case 'time': {
        const now = new Date();
        const cdmxTime = now.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', hour12: false });
        const cdmxDate = now.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'full' });
        appendLog(`
          <div>
            <div>Hora oficial CDMX: <strong style="color: var(--color-rosa-chilango); font-size: 0.85rem;">${cdmxTime}</strong></div>
            <div style="color: var(--text-muted); font-size: 0.7rem;">${cdmxDate}</div>
            <div style="color: var(--text-muted); font-size: 0.65rem; margin-top: 0.25rem;">Coordenadas: 19.4326° N, 99.1332° W • Ciudad de México</div>
          </div>
        `, trimmed);
        break;
      }

      case 'init': {
        const appName = args[0] || 'mi-proyecto';
        appendLog(`
          <div style="display: flex; flex-direction: column; gap: 0.2rem; color: var(--text-muted);">
            <div>[✦] Generando scaffold monolítico para <strong style="color: #ffffff;">${escapeHtml(appName)}</strong>...</div>
            <div>[1/4] Inyectando tokens Rosa Chilango (#E4007C)... <span style="color: #34d399;">OK</span></div>
            <div>[2/4] Vinculando SVG Sprite Sheet unificado (34 símbolos)... <span style="color: #34d399;">OK</span></div>
            <div>[3/4] Inicializando motor reactivo i18n cliente (ES/EN)... <span style="color: #34d399;">OK</span></div>
            <div>[4/4] Arquitectura monolítica verificada con 0 dependencias de cliente.</div>
            <div style="color: #34d399; font-weight: 600; margin-top: 0.35rem;">
              ✔ ¡Listo! Ejecuta: <span style="text-decoration: underline; color: #ffffff;">cd ${escapeHtml(appName)} && npm run dev</span>
            </div>
          </div>
        `, trimmed);
        break;
      }

      case 'banner': {
        appendLog(`
          <pre class="text-rosa" style="font-family: var(--font-mono); font-weight: 700; font-size: clamp(0.46rem, 1.1vw, 0.7rem); line-height: 1.15; margin: 0.5rem 0; text-shadow: 0 0 15px rgba(228,0,124,0.4); overflow-x: auto;">${ASCII_BANNER}</pre>
        `, trimmed);
        break;
      }

      case 'clear': {
        cliHistory.innerHTML = '';
        break;
      }

      case 'echo': {
        const msg = args.join(' ');
        appendLog(`<div>${escapeHtml(msg)}</div>`, trimmed);
        break;
      }

      default: {
        appendLog(`
          <div style="color: #f43f5e;">
            maclovia-bm: comando no encontrado: <strong>${escapeHtml(cmd)}</strong>.
            <div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 0.25rem;">
              Escribe <span class="text-rosa" style="font-weight: 600;">help</span> para consultar los comandos válidos.
            </div>
          </div>
        `, trimmed);
      }
    }
  }

  // Handle command submission via Form
  cliForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = cliInput.value;
    cliInput.value = '';
    executeCommand(value);
  });

  // Keyboard navigation for history and auto-complete
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        cliInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        cliInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        cliInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = cliInput.value.trim().toLowerCase();
      if (!current) return;

      const matches = AVAILABLE_COMMANDS
        .map(c => c.name)
        .filter(name => name.startsWith(current));

      if (matches.length === 1) {
        cliInput.value = matches[0];
      } else if (matches.length > 1) {
        appendLog(`
          <div style="color: var(--text-muted); font-size: 0.7rem;">Sugerencias: ${matches.join('  •  ')}</div>
        `, current);
      }
    }
  });

  // Clicking anywhere in viewport focuses input
  cliViewport.addEventListener('click', (e) => {
    if (!e.target.closest('button') && !e.target.closest('a')) {
      cliInput.focus();
    }
  });

  // Quick Command Chips
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-cli-cmd]');
    if (chip) {
      const cmd = chip.getAttribute('data-cli-cmd');
      cliInput.value = '';
      executeCommand(cmd);
      cliInput.focus();
    }
  });

  // Clear button and window dots
  if (cliClearBtn) {
    cliClearBtn.addEventListener('click', () => {
      cliHistory.innerHTML = '';
      cliInput.focus();
    });
  }

  if (termDotRed) {
    termDotRed.addEventListener('click', () => {
      cliHistory.innerHTML = '';
      cliInput.focus();
    });
  }

  if (termDotYellow) {
    termDotYellow.addEventListener('click', () => {
      printInitialWelcome();
      cliInput.focus();
    });
  }

  if (termDotGreen) {
    termDotGreen.addEventListener('click', () => {
      if (terminalWindow) {
        terminalWindow.classList.toggle('expanded');
      }
      if (cliViewport) {
        cliViewport.style.maxHeight = cliViewport.style.maxHeight === '650px' ? '480px' : '650px';
      }
    });
  }

  // Initial welcome message render
  printInitialWelcome();
}

/**
 * Inicializador de controladores de interactividad y estado para las pestañas de mockups y navegador
 */
export function initMockupTabs() {
  // Main Guidelines vs Mockups Switcher
  const viewBtns = document.querySelectorAll('.guidelines-view-btn');
  const viewSections = document.querySelectorAll('.guidelines-view-content');

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      viewBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      viewSections.forEach((section) => {
        if (section.id === targetView) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  // Mockup Sub-tabs (OpenGraph, Terminal, Browser, Business Card)
  const tabs = document.querySelectorAll('.mockup-tab-btn');
  const panels = document.querySelectorAll('.mockup-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Update tabs active state
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels active state
      panels.forEach((p) => {
        if (p.id === targetId) {
          p.style.display = 'block';
          if (targetId === 'tab-terminal') {
            const cliInput = document.getElementById('cli-input');
            if (cliInput) setTimeout(() => cliInput.focus(), 50);
          }
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  // Browser route links within mockup
  const routeButtons = document.querySelectorAll('[data-mockup-route]');
  const urlBarInput = document.getElementById('mockup-url-input');
  const routeViews = document.querySelectorAll('.browser-route-view');

  function navigateBrowserRoute(rawRoute) {
    const route = (rawRoute === '/' || rawRoute === '/home') ? '/studio' : rawRoute;
    if (urlBarInput) {
      urlBarInput.value = `https://maclovia.mx${route}`;
    }

    routeViews.forEach((view) => {
      const vRoute = view.getAttribute('data-route');
      const matches = vRoute === route || 
        ((vRoute === '/' || vRoute === '/studio') && (route === '/' || route === '/studio'));
      if (matches) {
        view.style.display = 'block';
      } else {
        view.style.display = 'none';
      }
    });

    routeButtons.forEach((btn) => {
      const btnRoute = btn.getAttribute('data-mockup-route');
      const matches = btnRoute === rawRoute || 
        ((btnRoute === '/' || btnRoute === '/studio' || btnRoute === '/home') && (rawRoute === '/' || rawRoute === '/studio' || rawRoute === '/home'));
      if (matches) {
        btn.classList.add('active', 'text-rosa');
      } else {
        btn.classList.remove('active', 'text-rosa');
      }
    });
  }

  routeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const route = btn.getAttribute('data-mockup-route');
      navigateBrowserRoute(route);
    });
  });

  // Browser Window Controls (Red / Yellow / Green Dots)
  const dotRed = document.querySelector('.browser-dot.dot-red:not(#term-dot-red)');
  const dotYellow = document.querySelector('.browser-dot.dot-yellow:not(#term-dot-yellow)');
  const dotGreen = document.querySelector('.browser-dot.dot-green:not(#term-dot-green)');
  const browserChrome = document.querySelector('.browser-chrome:not(#terminal-window)');
  const browserViewport = document.querySelector('.browser-viewport:not(#cli-viewport)');

  if (dotRed) {
    dotRed.setAttribute('title', 'Reiniciar a /studio');
    dotRed.addEventListener('click', () => {
      navigateBrowserRoute('/studio');
      if (browserViewport) {
        browserViewport.classList.remove('minimized');
        browserViewport.style.opacity = '0.4';
        setTimeout(() => {
          browserViewport.style.opacity = '1';
        }, 200);
      }
    });
  }

  if (dotYellow) {
    dotYellow.setAttribute('title', 'Minimizar / Restaurar Vista');
    dotYellow.addEventListener('click', () => {
      if (browserViewport) {
        browserViewport.classList.toggle('minimized');
      }
    });
  }

  if (dotGreen) {
    dotGreen.setAttribute('title', 'Expandir / Ancho Completo');
    dotGreen.addEventListener('click', () => {
      if (browserChrome) {
        browserChrome.classList.toggle('expanded');
      }
    });
  }

  // Browser Refresh Button Simulation
  const refreshBtn = document.getElementById('browser-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('animate-spin');
      const activeView = document.querySelector('.browser-route-view:not([style*="display: none"])');
      if (activeView) {
        activeView.style.opacity = '0.3';
        setTimeout(() => {
          activeView.style.opacity = '1';
        }, 350);
      }
      setTimeout(() => {
        refreshBtn.classList.remove('animate-spin');
      }, 600);
    });
  }

  // Browser DevTools Toggle
  const devToolsBtn = document.getElementById('browser-devtools-toggle');
  const devToolsPanel = document.getElementById('browser-devtools-panel');
  const devToolsCloseBtn = document.getElementById('browser-devtools-close');

  if (devToolsBtn && devToolsPanel) {
    devToolsBtn.addEventListener('click', () => {
      const isVisible = devToolsPanel.style.display === 'block';
      devToolsPanel.style.display = isVisible ? 'none' : 'block';
      devToolsBtn.classList.toggle('active', !isVisible);
    });
  }

  if (devToolsCloseBtn && devToolsPanel) {
    devToolsCloseBtn.addEventListener('click', () => {
      devToolsPanel.style.display = 'none';
      if (devToolsBtn) devToolsBtn.classList.remove('active');
    });
  }

  // Initialize Interactive Terminal Shell
  initInteractiveTerminal();

  // Global delegate for copy buttons
  document.addEventListener('click', (e) => {
    const copyTarget = e.target.closest('[data-copy-text]');
    if (copyTarget) {
      const textToCopy = copyTarget.getAttribute('data-copy-text');
      copyText(textToCopy, copyTarget);
    }
  });
}
