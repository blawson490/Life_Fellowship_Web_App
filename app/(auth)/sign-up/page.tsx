import React from 'react'
import AuthForm from '@/components/auth/AuthForm'
import Image from 'next/image'

const SignUp = async () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="flex items-center justify-center lg:py-0">
        <AuthForm type="sign-up" />
      </div>
      <div className="hidden lg:block h-full w-full">
        <Image
          src="/placeholder.svg"
          alt="Placeholder"
          width="2160"
          height="3840"
          className="object-cover w-full h-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  )
}

export default SignUp
