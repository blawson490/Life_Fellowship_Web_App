"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const SignInButton = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/sign-in');
  };

  return (
    <Button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
      Sign In
    </Button>
  );
};

export default SignInButton;
