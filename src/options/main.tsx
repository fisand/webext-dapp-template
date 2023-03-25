import { createRoot } from 'react-dom/client'

import { Options } from './Options'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const root = createRoot(document.getElementById('root')!)

root.render(<Options />)
