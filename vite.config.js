import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Custom Vite Plugin to assemble HTML partials at build and dev time
 * Zero external dependencies, pure native Node.js fs.
 */
function htmlPartialsPlugin() {
  const processPartials = (html, rootDir) => {
    // Matches: <include src="..." />, <load src="..." />, <load ="..." />
    const regex = /<(?:load|include)\s+(?:src=["']|=")([^"']+)["']\s*(?:\/?>|\/)/gi;
    return html.replace(regex, (match, partialPath) => {
      const resolvedPath = path.resolve(rootDir, partialPath.trim());
      if (fs.existsSync(resolvedPath)) {
        const partialContent = fs.readFileSync(resolvedPath, 'utf-8');
        // Recursively resolve any nested partials
        return processPartials(partialContent, path.dirname(resolvedPath));
      }
      console.warn(`[html-partials] File not found: ${resolvedPath}`);
      return match;
    });
  };

  return {
    name: 'vite-plugin-html-partials',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.html')) {
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return processPartials(html, __dirname);
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [htmlPartialsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
