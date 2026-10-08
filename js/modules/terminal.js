/**
 * Maclovia / Belleza Maldita — Interactive UNIX Shell CLI Engine
 * Emulador de consola en el navegador con soporte para comandos de ingeniería,
 * evaluación de snippets de Rust a través de Rust Playground API,
 * historial con flechas arriba/abajo y auto-completado con tecla Tab.
 *
 * Fachada delgada: el rendering vive en terminal/output.js,
 * los comandos en terminal/commands-*.js y Rust en terminal/rust.js.
 */

import { ASCII_BANNER, AVAILABLE_COMMANDS } from './terminal/banner.js';
import { escapeHtml, createTerminalOutput } from './terminal/output.js';
import { executeRustCode } from './terminal/rust.js';
import { handleCargo, handleRustc, handleRustup, handleGaje } from './terminal/commands-rust.js';
import {
  handleHelp,
  handleProjects,
  handleCeo,
  handleTheme,
  handleTokens,
  handleSpecs,
  handleBench,
  handleTime,
} from './terminal/commands-info.js';
import {
  resolveCliAlias,
  handleInit,
  handleBanner,
  handleEcho,
  handleUnknown,
} from './terminal/commands-scaffold.js';

// Re-exportados por compatibilidad (antes vivían en este módulo)
export { ASCII_BANNER, AVAILABLE_COMMANDS };

/**
 * Motor de Terminal Shell Interactiva (Vanilla JS)
 */
export function initInteractiveTerminal() {
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

  const { appendLog, printWelcome } = createTerminalOutput({
    viewport: cliViewport,
    history: cliHistory,
  });

  const commandHistory = [];
  let historyIndex = -1;

  const clearScreen = () => {
    cliHistory.innerHTML = '';
  };

  async function executeCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    const ctx = {
      log: appendLog,
      esc: escapeHtml,
      runRust: executeRustCode,
      clear: clearScreen,
      raw: trimmed,
    };

    const { cmd, args } = resolveCliAlias(trimmed, ctx);
    if (!cmd) return;

    switch (cmd) {
      case 'cargo':
        await handleCargo(args, ctx);
        break;
      case 'rustc':
        await handleRustc(args, ctx);
        break;
      case 'rustup':
        handleRustup(args, ctx);
        break;
      case './gaje-server':
      case 'gaje-server':
      case 'gaje':
        handleGaje(args, ctx);
        break;
      case 'help':
        handleHelp(args, ctx);
        break;
      case 'projects':
      case 'ls':
        handleProjects(args, ctx);
        break;
      case 'ceo':
      case 'whoami':
        handleCeo(args, ctx);
        break;
      case 'theme':
        handleTheme(args, ctx);
        break;
      case 'tokens':
        handleTokens(args, ctx);
        break;
      case 'specs':
      case 'sysinfo':
        handleSpecs(args, ctx);
        break;
      case 'bench':
        handleBench(args, ctx);
        break;
      case 'time':
        handleTime(args, ctx);
        break;
      case 'init':
        handleInit(args, ctx);
        break;
      case 'banner':
        handleBanner(args, ctx);
        break;
      case 'clear':
        clearScreen();
        break;
      case 'echo':
        handleEcho(args, ctx);
        break;
      default:
        handleUnknown(cmd, args, ctx);
        break;
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
      clearScreen();
      cliInput.focus();
    });
  }

  if (termDotRed) {
    termDotRed.addEventListener('click', () => {
      clearScreen();
      cliInput.focus();
    });
  }

  if (termDotYellow) {
    termDotYellow.addEventListener('click', () => {
      printWelcome();
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
  printWelcome();
}
