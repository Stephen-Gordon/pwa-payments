'use client'
import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      <div className='bg-[#2b2b2b] w-screen h-screen text-white'>
      {/*   <h1 className='text-3xl font-bold underline'>wagmi + Next.js</h1> */}

        <Connect />

        {isConnected && (
          <>
            <Account />
            <NetworkSwitcher />
          </>
        )}
      </div>
    </>
  )
}

export default Page
