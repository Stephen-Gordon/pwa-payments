'use client'

//wagmi
import { useAccount } from 'wagmi'

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

//components
import { Account, Connect, NetworkSwitcher } from '../components'
import { useEffect } from 'react';
import { useRouter } from "next/router";

function Page() {
  const { isConnected } = useAccount()
  const loginState = useSelector((state: RootState) => state.login.value);

  const router = useRouter();

  useEffect(() => {
    console.log('loginState index', loginState)
    !loginState ? router.push('/login') : router.push('/home')
  }, [loginState])

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
