import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
import Link from 'next/link'
import { Label } from './ui/label'

const formSchema = authFormSchema('sign-up')

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    suggested: string,
}

const CustomInput = ({ control, name, label, placeholder, suggested}: CustomInput) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
            {name == 'password' && (
                <FormLabel>
                <div className="flex justify-between">
                  <Label className="text-gray-700" htmlFor={name}>{label}</Label>
                  {/* TODO: */}
                  {/* <Link href="#" className="text-xs font-normal">Forgot your password?</Link> */}
                </div>
              </FormLabel>
            )}
            {name != 'password' && (
            <FormLabel className="text-gray-700">{label}</FormLabel>
            )}
            <FormControl>
                <Input placeholder={placeholder} type={name === 'password' ? 'password' : 'text'} autoComplete={suggested} {...field} />
            </FormControl>
            <FormMessage className='text-xs mt-2'/>
            </FormItem>
        )}
    />
  )
}

export default CustomInput
