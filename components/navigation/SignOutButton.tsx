"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { logoutAccount } from '@/lib/actions/user.actions';
import { Button } from '../ui/button';

const SignOutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push('/sign-in');
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-700">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
