/* eslint-disable no-console */
import { WindowPostMessageStream } from '@metamask/post-message-stream'
import { createRoot } from 'react-dom/client'
import { onMessage } from 'webext-bridge/content-script'

import { App } from './views/App'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const CONTENT_SCRIPT = 'fisand-contentscript'
const INPAGE = 'fisand-inpage'

const setupPageStream = () => {
  const pageStream = new WindowPostMessageStream({
    name: CONTENT_SCRIPT,
    target: INPAGE,
  })

  pageStream.on('data', (data) => {
    console.log(data + ', world')
    setTimeout(() => {
      pageStream.write('callback')
    }, 1500)
  })
}

// init stream
;(() => {
  setupPageStream()
})()

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
// eslint-disable-next-line import/newline-after-import
;(() => {
  console.info('[webext-template] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[webext-template] Navigate from page "${data?.title}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  const root = document.createElement('div')
  container.className = 'webext-template'
  const styleEl = document.createElement('link')
  const scriptEl = document.createElement('script')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container

  scriptEl.setAttribute('src', browser.runtime.getURL('dist/contentScripts/sdk.js'))
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))

  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  shadowDOM.appendChild(scriptEl)
  document.body.appendChild(container)
  const $root = createRoot(root)
  $root.render(<App />)
})()
