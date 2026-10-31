import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { FacebookIcon } from './icons/facebook-icon'
import { InstagramIcon } from './icons/instagram-icon'
import { TikTokIcon } from './icons/tiktok-icon'
import { WhatsAppIcon } from './icons/whatsapp-icon'
import { Logo } from './logo'

const { email, phone, phoneE164, address, city, state, mapLink, socialNetworks } = CONTACT_DETAILS

const SOCIAL_PROFILES = [
  { name: 'Facebook', href: socialNetworks.facebook, icon: FacebookIcon },
  { name: 'Instagram', href: socialNetworks.instagram, icon: InstagramIcon },
  { name: 'TikTok', href: socialNetworks.tiktok, icon: TikTokIcon }
]

export function Footer() {
  return (
    <footer className='bg-neutral-600'>
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row lg:px-8'>
        <Logo />
        <div className='flex flex-col gap-4 text-gray-300'>
          <h3 className='text-xl text-gray-200 uppercase'>Contacto</h3>
          <Link
            href={`mailto:${email}`}
            className='flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
          >
            <EnvelopeIcon className='h-5 w-5' /> {email}
          </Link>
          <Link
            href={`tel:${phoneE164}`}
            className='flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
          >
            <PhoneIcon className='h-5 w-5' /> {phone}
          </Link>
          <Link
            href={mapLink}
            target='_blank'
            rel='noreferrer nofollow'
            className='flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
          >
            <MapPinIcon className='h-5 w-5' /> {address} - {city}, {state}
          </Link>
        </div>
      </div>
      <hr className='mx-auto max-w-7xl border-gray-700' />
      <div className='mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8'>
        <div className='flex justify-center space-x-6 md:order-2'>
          {SOCIAL_PROFILES.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target='_blank'
              rel='noreferrer nofollow'
              className='rounded-sm text-gray-300 hover:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </Link>
          ))}
        </div>
        <div className='mt-8 md:order-1 md:mt-0'></div>
      </div>

      <Link
        href={socialNetworks.whatsapp}
        target='_blank'
        rel='noreferrer nofollow'
        className='fixed right-1 bottom-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:right-4 md:bottom-4 md:m-4'
      >
        <span className='sr-only'>WhatsApp</span>
        <WhatsAppIcon className='block w-16' aria-hidden='true' />
      </Link>
    </footer>
  )
}
