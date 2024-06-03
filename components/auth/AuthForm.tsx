// components/Auth/AuthForm.tsx
'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Label } from "@/components/ui/label"
import CustomInput from '../customInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true);

      try {
        if(type === 'sign-up') {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            email: data.email,
            password: data.password,
          }

          const newUser = await signUp(userData);

          if(newUser) router.push('/');

        }

        if(type === 'sign-in') {
          const userData = {
            email: data.email,
            password: data.password
          }
          const response = await signIn({
            email: data.email,
            password: data.password,
          })

        if(response) router.push('/')
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md md:w-[350]">
        <CardHeader>
          <CardTitle className="text-2xl">
            {type === 'sign-up' ? 'Sign up' : 'Sign in'}
          </CardTitle>
          <CardDescription>
            {type === 'sign-up' 
            ? 'Enter your details below to sign up for an account' 
            : 'Enter your details below to sign in to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {type === 'sign-up' && (
                <>
                  <div className="flex flex-col gap-6 md:flex-row lg:flex-row">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' suggested='first-name'/>
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' suggested='family-name'/>
                  </div>
                </>
              )}

              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" suggested='email'/>
              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" suggested='current-password'/>
              
              <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                  <>
                  <Loader2 size={20} className='animate-spin' />
                  &nbsp; Loading...
                  </>
                ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
            <footer className="pt-6">
                <Label className="flex justify-center text-sm text-center gap-1 text-gray-600 font-normal">
                {type === 'sign-in' 
                ? "Don't have an account?" 
                : "Already have an account?"}
                  <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="text-sm font-normal text-primary">
                    {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                  </Link>
                </Label>
              </footer>
          </Form>
        </CardContent>
      </Card>
    </div>
    )
}

export default AuthForm
