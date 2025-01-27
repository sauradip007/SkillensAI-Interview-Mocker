'use client'
import { UserButton, ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function Header() {
    const path = usePathname()
  return (
    <ClerkProvider>
    <div className='flex justify-between items-center p-4 bg-secondary shadow-md'>
      <Image src="/logo.svg" alt="logo" width={70} height={70}  />
      <ul className='hidden md:flex gap-4'>
        <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}>
          Dashboard
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}`}>
            Questions
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}>
            Upgrade
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard/how-it-works' ? 'text-primary font-bold' : ''}`}>
            How it works?
        </li>
      </ul>
      <UserButton/>
    </div>
    </ClerkProvider>
  )
}

export default Header
