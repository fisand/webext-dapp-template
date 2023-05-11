import replace from '@rollup/plugin-replace'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Checker from 'vite-plugin-checker'
import EslintPlugin from 'vite-plugin-eslint'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

import { isDev, port, r } from './scripts/utils'
// import { MV3Hmr } from './vite-mv-hmr'

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    react(),
    unocss(),
    AutoImport({
      imports: [
        {
          'webextension-polyfill': [['default', 'browser']],
        },
        'react',
      ],
      dts: r('src/auto-imports.d.ts'),
    }),
    Checker({
      typescript: true,
    }),
    EslintPlugin(),
    replace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(isDev),
        'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
      },
    }),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/"\/assets\//g, '"../assets/')
      },
    },
    nodePolyfills(),
  ],
  optimizeDeps: {
    include: ['webextension-polyfill'],
    // esbuildOptions: {
    //   target: 'es2020',
    // },
  },
}

export default defineConfig(({ command }) => {
  return {
    ...sharedConfig,
    base: command === 'serve' ? `http://localhost:${port}/` : '/',
    server: {
      port,
      hmr: {
        host: 'localhost',
      },
    },
    build: {
      // target: 'es2020',
      outDir: r('extension/dist'),
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : false,
      // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
      terserOptions: {
        mangle: false,
      },
      minify: 'terser',
      rollupOptions: {
        input: {
          options: r('src/options/index.html'),
          popup: r('src/popup/index.html'),
        },
      },
    },
    plugins: [
      ...sharedConfig.plugins!,
      // popup & options page hmr
      // MV3Hmr(),
    ],
  }
})
