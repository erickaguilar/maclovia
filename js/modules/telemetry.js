/**
 * Maclovia / Belleza Maldita — Real-Time GitHub API Telemetry Module
 * Conexión en vivo con GitHub REST API v3 para métricas de estrellas, forks y actividad
 * con caché persistente (TTL 10 min), stale-while-revalidate, detección de rate-limit
 * y degradación elegante ante pérdida de conexión.
 */

import { PROJECTS } from '../data/projects.js';
import { getLanguage } from '../i18n.js';

const GITHUB_CACHE_KEY = 'maclovia_github_metrics_v2';
const GITHUB_CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache TTL

export const githubState = {
  stats: {},
  totalStars: 0,
  totalForks: 0,
  isLoading: false,
  lastSync: null,
  isCached: false,
  isRateLimited: false,
  rateLimitReset: null,
  isOffline: false,
};

let retryTimer = null;

function readCache() {
  try {
    const raw = localStorage.getItem(GITHUB_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.stats) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getCachedGitHubMetrics() {
  const parsed = readCache();
  if (!parsed) return null;
  if (Date.now() - parsed.timestamp > GITHUB_CACHE_TTL) return null;
  return parsed;
}

export function getStaleGitHubMetrics() {
  return readCache();
}

export function saveCachedGitHubMetrics(stats, totals) {
  try {
    localStorage.setItem(
      GITHUB_CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        stats,
        totals,
      })
    );
  } catch {}
}

function applyMetrics(cached) {
  githubState.stats = cached.stats || {};
  githubState.totalStars = cached.totals?.stars ?? 0;
  githubState.totalForks = cached.totals?.forks ?? 0;
  githubState.lastSync = new Date(cached.timestamp);
  githubState.isCached = true;
  githubState.isRateLimited = false;
  githubState.rateLimitReset = null;
  githubState.isOffline = false;
}

function scheduleRateLimitRetry() {
  clearTimeout(retryTimer);
  if (!githubState.rateLimitReset) return;
  const MAX_DELAY = 2_147_483_647;
  const delay = Math.min(MAX_DELAY, Math.max(1000, githubState.rateLimitReset - Date.now() + 1000));
  retryTimer = setTimeout(() => {
    if (githubState.isRateLimited) fetchGitHubMetrics(true);
  }, delay);
}

function clearRateLimitRetry() {
  clearTimeout(retryTimer);
  retryTimer = null;
}

export async function refreshFromGitHub(repos) {
  const responses = await Promise.allSettled(
    repos.map(async (repoName) => ({
      repoName,
      response: await fetch(`https://api.github.com/repos/${repoName}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      }),
    }))
  );

  let rateLimited = false;
  let rateLimitReset = null;
  let offline = false;
  let fetched = 0;
  const found = {};

  for (const result of responses) {
    if (result.status === 'rejected') {
      offline = true;
      continue;
    }
    const { repoName, response } = result.value;
    const remaining = response.headers.get('x-ratelimit-remaining');
    const isRateLimit = (response.status === 403 || response.status === 429) && remaining === '0';
    if (isRateLimit) {
      rateLimited = true;
      const resetSecs = parseInt(response.headers.get('x-ratelimit-reset'), 10);
      if (!Number.isNaN(resetSecs)) rateLimitReset = resetSecs * 1000;
      continue;
    }

    let data = null;
    try {
      data = await response.json();
    } catch {
      // Respuesta inválida: se conserva el valor previo (stale) de este repo
      continue;
    }
    if (!data || !data.full_name) continue;

    found[repoName] = {
      stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : 0,
      forks: typeof data.forks_count === 'number' ? data.forks_count : 0,
    };
    fetched++;
  }

  githubState.stats = { ...githubState.stats, ...found };
  githubState.totalStars = repos.reduce((acc, r) => acc + (githubState.stats[r]?.stars || 0), 0);
  githubState.totalForks = repos.reduce((acc, r) => acc + (githubState.stats[r]?.forks || 0), 0);
  githubState.lastSync = new Date();
  githubState.isCached = false;
  githubState.isRateLimited = rateLimited;
  githubState.rateLimitReset = rateLimitReset;
  githubState.isOffline = offline;

  if (fetched > 0) {
    saveCachedGitHubMetrics(githubState.stats, {
      stars: githubState.totalStars,
      forks: githubState.totalForks,
    });
  }

  if (rateLimited) {
    scheduleRateLimitRetry();
  } else {
    clearRateLimitRetry();
  }
}

async function runRefresh(repos) {
  const refreshIcon = document.getElementById('github-refresh-icon');
  const refreshBtn = document.getElementById('github-refresh-btn');

  githubState.isLoading = true;
  if (refreshIcon) refreshIcon.classList.add('spinning');
  if (refreshBtn) refreshBtn.setAttribute('disabled', 'true');
  updateTelemetryUI();

  await refreshFromGitHub(repos);

  githubState.isLoading = false;
  if (refreshIcon) refreshIcon.classList.remove('spinning');
  if (refreshBtn) refreshBtn.removeAttribute('disabled');

  updateTelemetryUI();
  updateProjectCardsTelemetry();
}

export async function fetchGitHubMetrics(forceRefresh = false) {
  if (githubState.isLoading) return;

  const repos = [...new Set(PROJECTS.map((p) => p.repoName).filter(Boolean))];
  if (repos.length === 0) return;

  if (!forceRefresh) {
    const fresh = getCachedGitHubMetrics();
    const stale = fresh || getStaleGitHubMetrics();
    if (stale) {
      applyMetrics(stale);
      updateTelemetryUI();
      updateProjectCardsTelemetry();
      if (fresh) return;
      await runRefresh(repos);
      return;
    }
  }

  await runRefresh(repos);
}

function formatClockTime(timestamp, isEn, isZh) {
  try {
    return new Intl.DateTimeFormat(isZh ? 'zh-CN' : (isEn ? 'en-US' : 'es-MX'), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(timestamp));
  } catch {
    return '';
  }
}

export function updateTelemetryUI() {
  const syncStatusEl = document.getElementById('github-sync-status');
  const syncDotEl = document.getElementById('github-sync-dot');
  const lastSyncEl = document.getElementById('github-last-sync-time');
  const totalStarsEl = document.getElementById('github-total-stars');
  const totalForksEl = document.getElementById('github-total-forks');
  const totalReposEl = document.getElementById('github-total-repos');

  const lang = getLanguage();
  const isZh = lang === 'zh';
  const isEn = lang === 'en';

  if (totalStarsEl) {
    totalStarsEl.textContent = String(githubState.totalStars);
  }
  if (totalForksEl) {
    totalForksEl.textContent = String(githubState.totalForks);
  }
  if (totalReposEl) {
    totalReposEl.textContent = String(PROJECTS.length);
  }

  if (syncStatusEl && syncDotEl) {
    let status;
    let color;

    if (githubState.isLoading) {
      status = isZh ? '正在请求 GitHub API...' : (isEn ? 'Querying GitHub API...' : 'Consultando GitHub API...');
      color = '#f59e0b';
    } else if (githubState.isRateLimited) {
      const time = githubState.rateLimitReset ? formatClockTime(githubState.rateLimitReset, isEn, isZh) : '';
      status = isZh
        ? `请求数已达上限${time ? ` · ${time} 重试` : ''}`
        : (isEn
          ? `Rate limit reached${time ? ` · retry ${time}` : ''}`
          : `Límite alcanzado${time ? ` · reintento ${time}` : ''}`);
      color = '#ef4444';
    } else if (githubState.isOffline) {
      status = isZh ? '离线 · 缓存数据' : (isEn ? 'Offline · cached data' : 'Sin conexión · datos en caché');
      color = '#6b7280';
    } else if (githubState.isCached) {
      status = isZh ? '已缓存 · 实时可用' : (isEn ? 'Cached Data · Ready' : 'En Caché · Disponible');
      color = '#38bdf8';
    } else {
      status = 'API Online · 200 OK';
      color = '#10b981';
    }

    syncStatusEl.textContent = status;
    syncDotEl.style.backgroundColor = color;
    syncDotEl.style.boxShadow = `0 0 8px ${color}`;
  }

  if (lastSyncEl && githubState.lastSync) {
    try {
      const timeStr = new Intl.DateTimeFormat(isZh ? 'zh-CN' : (isEn ? 'en-US' : 'es-MX'), {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(githubState.lastSync);
      lastSyncEl.textContent = `${isZh ? '同步于' : (isEn ? 'Synced at' : 'Sincronizado')} ${timeStr}`;
    } catch {
      lastSyncEl.textContent = githubState.lastSync.toLocaleTimeString();
    }
  }
}

export function updateProjectCardsTelemetry() {
  PROJECTS.forEach((p) => {
    const stats = githubState.stats[p.repoName];
    if (!stats) return;

    const starEl = document.getElementById(`star-count-${p.id}`);
    if (starEl) {
      starEl.textContent = String(stats.stars ?? 0);
    }

    const forkEl = document.getElementById(`fork-count-${p.id}`);
    if (forkEl) {
      forkEl.textContent = String(stats.forks ?? 0);
    }
  });
}

export function initGitHubTelemetry() {
  const refreshBtn = document.getElementById('github-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      fetchGitHubMetrics(true);
    });
  }

  fetchGitHubMetrics(false);
}