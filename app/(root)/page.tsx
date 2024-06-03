'use client';
import { getLoggedInUser, logoutAccount } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center h-16 p-4 pt-6'>
      <h1 className='text-3xl font-bold text-gray-900'>Home</h1>
    </div>
  )
}

export default page
