import { defineConfig } from 'vite'

import { isDev, r } from './scripts/utils'
import { sharedConfig } from './vite.config'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  build: {
    // target: 'es2020',
    watch: isDev
      ? {
          include: [r('src/contentScripts/**/*')],
        }
      : undefined,
    outDir: r('extension/dist/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/contentScripts/index.tsx'),
      formats: ['es'],
      name: 'fisandExt',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
})
