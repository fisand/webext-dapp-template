import { WindowPostMessageStream } from '@metamask/post-message-stream'

const CONTENT_SCRIPT = 'fisand-contentscript'
const INPAGE = 'fisand-inpage'

const fisandStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT,
})

fisandStream.on('data', (message) => {
  console.log(message)
})

window.fisand = {
  connectionStream: fisandStream,
}
