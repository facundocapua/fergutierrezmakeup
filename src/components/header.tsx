'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import { CLASSES_ENQUIRY_WHATSAPP_MESSAGE } from '@/data/classes'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { MAKEUP_BOOKING_WHATSAPP_MESSAGE } from '@/data/services'
import { NAVIGATION } from '@/lib/navigation'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { ActionLink } from './action-link'
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
    <header className='border-b border-ink/15 bg-paper py-3 font-chart text-ink'>
      <div className='grid w-full grid-cols-[auto_1fr_auto] items-center px-4 lg:grid-cols-[1fr_auto]'>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
            onClick={() => setMenuOpenedAt(pathname)}
          >
            <span className='sr-only'>Abrir menú principal</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>

        <nav className='hidden w-full grid-cols-[1fr_auto_1fr] items-center gap-16 lg:col-span-2 lg:grid'>
          <div className='flex justify-end gap-16'>
            {navLeft.map((item) => (
              <NavLink key={item.href} href={item.href} name={item.name} active={pathname.startsWith(item.href)} />
            ))}
          </div>
          <Logo />
          <div className='flex gap-16'>
            {navRight.map((item) => (
              <NavLink key={item.href} href={item.href} name={item.name} active={pathname.startsWith(item.href)} />
            ))}
          </div>
        </nav>

        <div className='flex items-center justify-center lg:hidden'>
          <Logo className='w-[150px]' />
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
            <div className='fixed inset-0 bg-ink' />
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
              <DialogPanel className='relative flex w-full flex-col overflow-y-auto bg-ink px-4 pb-8 font-chart text-paper'>
                <div className='flex justify-between pt-5 pb-2'>
                  <Logo />
                  <button
                    type='button'
                    className='-m-2 inline-flex items-center justify-center p-2 text-paper focus-visible:outline-2 focus-visible:outline-paper'
                    onClick={closeMobileMenu}
                  >
                    <span className='sr-only'>Cerrar menú</span>
                    <XMarkIcon className='h-8 w-8' aria-hidden='true' />
                  </button>
                </div>

                <div className='mt-10 border-t border-paper/30'>
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='block border-b border-paper/30 py-5 text-5xl leading-none font-bold tracking-tight text-paper [font-stretch:80%] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper'
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className='mt-auto flex flex-col items-start gap-4 pt-10'>
                  <ActionLink
                    href={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, MAKEUP_BOOKING_WHATSAPP_MESSAGE)}
                    external
                    variant='paper'
                  >
                    Reservar un maquillaje
                  </ActionLink>
                  <ActionLink
                    href={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, CLASSES_ENQUIRY_WHATSAPP_MESSAGE)}
                    external
                    variant='labial'
                    className='focus-visible:outline-paper'
                  >
                    Preguntar por las clases
                  </ActionLink>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </header>
  )
}
