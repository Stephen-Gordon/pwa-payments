'use client'


import { useAccount, useConnect, useDisconnect } from 'wagmi'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../GlobalRedux/Features/login/loginSlice'
import { RootState } from '../GlobalRedux/store'
import { useEffect } from 'react'

export function Connect() {
  const { connector, isConnected } = useAccount()
  const { connect, error, connectors, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  const loginState = useSelector((state: RootState) => state.login.value)

  //Redux
  const dispatch = useDispatch()
  const handleConnect = () => {
    dispatch(login())
    console.log('connected')
  }
  useEffect(() => {
    console.log('loginState', loginState)
  }, [loginState])

  return (
    <div>
      <div>
        {loginState}
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => {
              connect({ connector: x })
              handleConnect()
            }}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  )
}
