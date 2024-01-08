import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'

import type PkgType from '../package.json'
import { isDev, port, r } from '../scripts/utils'

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    // @ts-expect-error -- use pkg displayName if available
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/wallet.png',
      default_popup: './dist/popup/index.html',
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
    },
    background: {
      service_worker: './dist/background/index.global.js',
    },
    icons: {
      16: './assets/wallet.png',
      48: './assets/wallet.png',
      128: './assets/wallet.png',
    },
    permissions: ['tabs', 'storage', 'activeTab'],
    host_permissions: ['http://*/', 'https://*/', 'file:///*'],
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', 'file:///*'],
        js: ['./dist/contentScripts/index.global.js'],
      },
    ],
    web_accessible_resources: [
      {
        resources: ['dist/contentScripts/style.css', 'dist/contentScripts/sdk.global.js'],
        matches: ['<all_urls>'],
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        ? // this is required on dev for Vite script to load
          `script-src 'self' http://localhost:${port}; object-src 'self' http://localhost:${port}`
        : "script-src 'self'; object-src 'self'",
    },
  }

  if (isDev) {
    manifest.permissions?.push('webNavigation')
  }

  return manifest
}
