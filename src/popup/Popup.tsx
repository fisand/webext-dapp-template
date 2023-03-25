import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function Popup() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const { disconnect } = useDisconnect()

  return (
    <div className="container w-358px h-600px flex-col-center">
      <div className="w-full h-full">
        <div className="text-base">Account: {address}</div>
        <div>
          {connectors.map((connector) => (
            <button
              className="w-120px flex-col-center h-10 rounded bg-blue-600 text-sm text-white"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
            </button>
          ))}
          {isConnected && (
            <button
              className="w-100px flex-col-center h-10 rounded bg-red-600 text-sm text-white"
              onClick={() => {
                disconnect()
              }}
            >
              Disconnect
            </button>
          )}
        </div>

        {error && <div>{error.message}</div>}
      </div>
    </div>
  )
}
