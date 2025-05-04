import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Recursively collect all .html files in 'src'
function findHtmlFiles(dir, entries = {}) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, entries);
    } else if (file.endsWith('.html')) {
      const name = fullPath
        .replace(__dirname + '/', '')     // relative path from root
        .replace(/\.html$/, '');          // remove extension
      entries[name] = fullPath;
    }
  }
  return entries;
}

const input = findHtmlFiles(resolve(__dirname, 'src'));

export default defineConfig({
  base: './',
  server: {
    port: 5551,
  },
  build: {
    rollupOptions: {
      input
    },
  },
});
