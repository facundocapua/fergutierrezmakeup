'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import { NAVIGATION } from '@/lib/navigation'
import { Logo } from './logo'
import { NavLink } from './nav-link'

export function Header() {
  const pathname = usePathname()
  // The menu stays open only on the page it was opened on, so any navigation closes it.
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null)
  const mobileMenuOpen = menuOpenedAt === pathname
  const closeMobileMenu = () => setMenuOpenedAt(null)

  const navLeft = NAVIGATION.slice(0, 2)
  const navRight = NAVIGATION.slice(2)

  return (
    <header className='bg-neutral-600 pt-4 pb-8'>
      <div className='grid w-full grid-cols-[auto_1fr_auto] items-center px-4 lg:grid-cols-[1fr_auto]'>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md text-gray-100'
            onClick={() => setMenuOpenedAt(pathname)}
          >
            <span className='sr-only'>Abrir menú principal</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>

        <nav className='mx-auto hidden max-w-xl grow items-center justify-center gap-16 lg:flex'>
          {navLeft.map((item) => (
            <NavLink key={item.href} href={item.href} name={item.name} active={pathname.startsWith(item.href)} />
          ))}
          <Logo />
          {navRight.map((item) => (
            <NavLink key={item.href} href={item.href} name={item.name} active={pathname.startsWith(item.href)} />
          ))}
        </nav>

        <div className='flex items-center justify-center lg:hidden'>
          <Logo />
        </div>
      </div>

      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as='div' className='relative z-40 lg:hidden' onClose={closeMobileMenu}>
          <TransitionChild
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-neutral-600' />
          </TransitionChild>

          <div className='fixed inset-0 z-40 flex'>
            <TransitionChild
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <DialogPanel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-neutral-600 pb-12 shadow-xl'>
                <div className='flex justify-between px-4 pt-5 pb-2'>
                  <Logo />
                  <button
                    type='button'
                    className='-m-2 inline-flex items-center justify-center rounded-md p-2 text-neutral-100'
                    onClick={closeMobileMenu}
                  >
                    <span className='sr-only'>Cerrar menu</span>
                    <XMarkIcon className='h-8 w-8' aria-hidden='true' />
                  </button>
                </div>

                <div className='mt-6 space-y-2'>
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-100 focus-visible:outline-2 focus-visible:outline-white'
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </header>
  )
}
