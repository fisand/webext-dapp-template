import ready from 'document-ready'
import { createRoot } from 'react-dom/client'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, arbitrumGoerli, bsc, bscTestnet, goerli, mainnet, polygon } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

import { Popup } from './Popup'
import { metamaskProvider } from './utils/index'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum, arbitrumGoerli, bsc, bscTestnet, mainnet, polygon, goerli],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        getProvider: () => metamaskProvider,
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      } as any,
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

ready(() => {
  const root = createRoot(document.getElementById('root')!)

  root.render(
    <WagmiConfig config={config}>
      <Popup />
    </WagmiConfig>
  )
})
