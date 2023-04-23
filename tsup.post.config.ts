import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['extension/dist/contentScripts/index.js', 'extension/dist/contentScripts/sdk.js'],
  format: ['iife'],
  minify: true,
  outDir: 'extension/dist/contentScripts',
})
