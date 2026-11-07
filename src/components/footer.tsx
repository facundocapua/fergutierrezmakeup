import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { CLASSES_ENQUIRY_WHATSAPP_MESSAGE } from '@/data/classes'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { GENERAL_ENQUIRY_WHATSAPP_MESSAGE, MAKEUP_BOOKING_WHATSAPP_MESSAGE } from '@/data/services'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { ActionLink } from './action-link'
import { FacebookIcon } from './icons/facebook-icon'
import { InstagramIcon } from './icons/instagram-icon'
import { TikTokIcon } from './icons/tiktok-icon'
import { WhatsAppGlyph } from './icons/whatsapp-glyph'
import { Logo } from './logo'

const { email, phone, phoneE164, address, city, state, mapLink, socialNetworks } = CONTACT_DETAILS

const SOCIAL_PROFILES = [
  { name: 'Facebook', href: socialNetworks.facebook, icon: FacebookIcon },
  { name: 'Instagram', href: socialNetworks.instagram, icon: InstagramIcon },
  { name: 'TikTok', href: socialNetworks.tiktok, icon: TikTokIcon }
]

const CONTACT_LINK =
  'flex items-center gap-2 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper'

export function Footer() {
  return (
    <footer className='bg-ink font-chart text-paper'>
      <div className='mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-16'>
        <div className='py-14 lg:py-24'>
          <h2 className='text-5xl leading-none font-bold tracking-tight text-balance [font-stretch:80%] sm:text-7xl'>
            Escríbeme por WhatsApp.
          </h2>
          <div className='mt-8 flex flex-wrap gap-4'>
            <ActionLink
              href={buildWhatsAppLink(socialNetworks.whatsapp, MAKEUP_BOOKING_WHATSAPP_MESSAGE)}
              external
              variant='paper'
            >
              Reservar un maquillaje
            </ActionLink>
            <ActionLink
              href={buildWhatsAppLink(socialNetworks.whatsapp, CLASSES_ENQUIRY_WHATSAPP_MESSAGE)}
              external
              variant='rosa'
              className='focus-visible:outline-paper'
            >
              Preguntar por las clases
            </ActionLink>
          </div>
        </div>

        <div className='grid items-center gap-8 border-t border-paper/30 py-10 text-paper/85 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-16'>
          <Logo className='w-[190px] text-paper' />
          <address className='flex flex-col gap-3 not-italic lg:flex-row lg:flex-wrap lg:gap-x-8'>
            <Link href={`mailto:${email}`} className={CONTACT_LINK}>
              <EnvelopeIcon aria-hidden='true' className='h-5 w-5 shrink-0' /> {email}
            </Link>
            <Link href={`tel:${phoneE164}`} className={CONTACT_LINK}>
              <PhoneIcon aria-hidden='true' className='h-5 w-5 shrink-0' /> {phone}
            </Link>
            <Link href={mapLink} target='_blank' rel='noreferrer nofollow' className={CONTACT_LINK}>
              <MapPinIcon aria-hidden='true' className='h-5 w-5 shrink-0' /> {address} - {city}, {state}
            </Link>
          </address>
          <div className='flex gap-6 md:mr-16'>
            {SOCIAL_PROFILES.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target='_blank'
                rel='noreferrer nofollow'
                className='hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper'
              >
                <span className='sr-only'>{item.name}</span>
                <item.icon className='h-6 w-6' aria-hidden='true' />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={buildWhatsAppLink(socialNetworks.whatsapp, GENERAL_ENQUIRY_WHATSAPP_MESSAGE)}
        target='_blank'
        rel='noreferrer nofollow'
        className='fixed right-3 bottom-3 flex h-12 w-12 items-center justify-center border border-paper bg-ink text-paper transition-colors duration-200 hover:bg-rosa-hondo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-hondo lg:right-4 lg:bottom-4'
      >
        <span className='sr-only'>WhatsApp</span>
        <WhatsAppGlyph className='h-6 w-6' aria-hidden='true' />
      </Link>
    </footer>
  )
}
