/**
 * Maclovia / Belleza Maldita — Real-Time GitHub API Telemetry Module
 * Conexión en vivo con GitHub REST API v3 para métricas de estrellas, forks y actividad
 * con soporte de caché persistente (TTL 10 min) y degradación elegante.
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
};

export function getCachedGitHubMetrics() {
  try {
    const raw = localStorage.getItem(GITHUB_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.stats) return null;
    const age = Date.now() - parsed.timestamp;
    if (age > GITHUB_CACHE_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
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

export async function fetchGitHubMetrics(forceRefresh = false) {
  if (githubState.isLoading) return;

  const syncStatusEl = document.getElementById('github-sync-status');
  const syncDotEl = document.getElementById('github-sync-dot');
  const refreshIcon = document.getElementById('github-refresh-icon');
  const refreshBtn = document.getElementById('github-refresh-btn');

  const lang = getLanguage();
  const isZh = lang === 'zh';
  const isEn = lang === 'en';

  // 1. Use cache if available and not forcing refresh
  if (!forceRefresh) {
    const cached = getCachedGitHubMetrics();
    if (cached) {
      githubState.stats = cached.stats;
      githubState.totalStars = cached.totals?.stars ?? 0;
      githubState.totalForks = cached.totals?.forks ?? 0;
      githubState.lastSync = new Date(cached.timestamp);
      githubState.isCached = true;

      updateTelemetryUI();
      updateProjectCardsTelemetry();
      return;
    }
  }

  // 2. Perform live fetch across repositories
  githubState.isLoading = true;
  if (refreshIcon) refreshIcon.classList.add('spinning');
  if (refreshBtn) refreshBtn.setAttribute('disabled', 'true');

  if (syncStatusEl) {
    syncStatusEl.textContent = isZh ? '正在请求 GitHub API...' : (isEn ? 'Querying GitHub API...' : 'Consultando GitHub API...');
  }
  if (syncDotEl) {
    syncDotEl.style.backgroundColor = '#f59e0b';
    syncDotEl.style.boxShadow = '0 0 8px #f59e0b';
  }

  const reposToFetch = PROJECTS.map((p) => p.repoName);
  const newStats = { ...githubState.stats };
  let calculatedStars = 0;
  let calculatedForks = 0;

  try {
    const fetchPromises = reposToFetch.map(async (repoName) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoName}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          newStats[repoName] = {
            stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : 0,
            forks: typeof data.forks_count === 'number' ? data.forks_count : 0,
            watchers: typeof data.watchers_count === 'number' ? data.watchers_count : 0,
            openIssues: typeof data.open_issues_count === 'number' ? data.open_issues_count : 0,
            updatedAt: data.updated_at,
          };
        } else {
          if (!newStats[repoName]) {
            newStats[repoName] = { stars: 0, forks: 0 };
          }
        }
      } catch {
        if (!newStats[repoName]) {
          newStats[repoName] = { stars: 0, forks: 0 };
        }
      }
    });

    await Promise.all(fetchPromises);

    // Compute aggregated totals
    for (const repoName of reposToFetch) {
      if (newStats[repoName]) {
        calculatedStars += newStats[repoName].stars || 0;
        calculatedForks += newStats[repoName].forks || 0;
      }
    }

    githubState.stats = newStats;
    githubState.totalStars = calculatedStars;
    githubState.totalForks = calculatedForks;
    githubState.lastSync = new Date();
    githubState.isCached = false;

    saveCachedGitHubMetrics(newStats, {
      stars: calculatedStars,
      forks: calculatedForks,
    });
  } catch (error) {
    console.warn('Error fetching GitHub metrics:', error);
  } finally {
    githubState.isLoading = false;
    if (refreshIcon) refreshIcon.classList.remove('spinning');
    if (refreshBtn) refreshBtn.removeAttribute('disabled');

    updateTelemetryUI();
    updateProjectCardsTelemetry();
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
    if (githubState.isCached) {
      syncStatusEl.textContent = isZh ? '已缓存 · 实时可用' : (isEn ? 'Cached Data · Ready' : 'En Caché · Disponible');
      syncDotEl.style.backgroundColor = '#38bdf8';
      syncDotEl.style.boxShadow = '0 0 8px #38bdf8';
    } else {
      syncStatusEl.textContent = isZh ? 'API 运行中 · 200 OK' : (isEn ? 'API Online · 200 OK' : 'API Online · 200 OK');
      syncDotEl.style.backgroundColor = '#10b981';
      syncDotEl.style.boxShadow = '0 0 8px #10b981';
    }
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
