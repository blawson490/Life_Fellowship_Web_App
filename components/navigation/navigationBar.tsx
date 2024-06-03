"use client"
import Link from 'next/link'
import React from 'react'
import { Label } from '../ui/label'
import { IconCalendarEvent, IconCoin, IconForms, IconHome, IconInfoCircle, IconLockAccess, IconMenu, IconPlayerPlay, IconUser } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'

interface NavigationBarProps {
  user: UserSessionUser | null;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ user }) => {

  const pathName = usePathname()
  const sidebarLinks = [
    { name: 'Home', route: '/', icon: <IconHome size={24} />, mode: 'both' },
    { name: 'Sermons', route: '/sermons', icon: <IconPlayerPlay size={24} />, mode: 'both' },
    { name: 'Events', route: '/events', icon: <IconCalendarEvent size={24} />, mode: 'both' },
    { name: 'More', route: '/more', icon: <IconMenu size={24} />, mode: 'mobile' },
    { name: 'About', route: '/more/about', icon: <IconInfoCircle size={24} />, mode: 'desktop' },
    { name: 'Contact', route: '/more/contact', icon: <IconForms size={24} />, mode: 'desktop' },
    { name: 'Give', route: '/more/give', icon: <IconCoin size={24} />, mode: 'desktop' },
    { name: 'Connect', route: '/more/connect', icon: <IconUser size={24} />, mode: 'desktop' },
  ]

  return (
    <section className="fixed bottom-0 left-0 w-full lg:sticky lg:top-0 lg:min-h-screen lg:w-[270px] shadow-t-lg">
      <div className='lg:flex lg:flex-col lg:space-between lg:min-h-screen'>
      <div className='lg:flex-grow'>
      <h1 className='hidden lg:block'>LOGO Life Fellowship</h1>
      <nav className='flex flex-row justify-between py-6 px-6 lg:px-2 lg:flex-col lg:gap-1'>
        {sidebarLinks.map(({name, route, icon, mode}) => {
          const isActive = pathName === route || pathName.startsWith(`${route}/`)
          const displayClass = (mode === 'both') ? '' : (mode === 'mobile' ? 'lg:hidden' : 'hidden lg:flex')

          return (
            <Link 
              key={name} 
              href={route} 
              className={cn(`flex flex-col gap-1 items-center justify-center lg:gap-3 lg:flex-row lg:py-2 lg:px-4 md:justify-center lg:justify-start lg:w-full ${displayClass}`, {
              'text-primary cursor-default lg:text-white lg:bg-blue-500 lg:rounded-md lg:font-medium' : isActive,
              'text-gray-500 lg:text-black lg:font-normal lg:hover:bg-blue-500 lg:hover:bg-opacity-10 lg:rounded-md' : !isActive})}>
                {icon}
                <Label className="text-sm mt-1 cursor-pointer">
                  {name}
                </Label>
            </Link>
          )
        })}
      </nav>
      </div>
      <div className='hidden lg:block lg:flex-shrink lg:p-4'>
      {user ? (
        <SignOutButton />
      ) : (
        <SignInButton />
      )}
    </div>
    </div>
    </section>
  )
}

export default NavigationBar
