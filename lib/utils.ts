import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: string) => z.object({
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
      }).max(50),
})

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));