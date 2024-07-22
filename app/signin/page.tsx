'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import SignIn from '../components/SiginBase'

const SignInPage = () => {
  const router  = useRouter()
  return (
  <div className='w-full h-full flex flex-col items-center justify-center'>
     <SignIn/>
  </div>
  )
}

export default SignInPage