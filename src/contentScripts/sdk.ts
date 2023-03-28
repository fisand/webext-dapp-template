import { WindowPostMessageStream } from '@metamask/post-message-stream'

const CONTENT_SCRIPT = 'fisand-contentscript'
const INPAGE = 'fisand-inpage'

const fisandStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT,
})

window.fisand = {
  connectionStream: fisandStream,
}
