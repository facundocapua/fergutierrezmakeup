import type { StaticImageData } from 'next/image'
import socialMakeupImage from '@public/services/2.jpg'
import browDesignImage from '@public/services/3.jpg'
import bridalMakeupImage from '@public/services/5.webp'

export type ServiceSummary = {
  title: string
  image: StaticImageData
  href: string
}

/** The Services listed on /servicios. */
export const SERVICES: ServiceSummary[] = [
  { title: 'Maquillaje Social', image: socialMakeupImage, href: '/servicios/social' },
  { title: 'Maquillaje Novias', image: bridalMakeupImage, href: '/servicios/novias' },
  { title: 'Diseño Cejas', image: browDesignImage, href: '/servicios/cejas' }
]

export type SocialMakeupOption = {
  name: string
  subtitle: string
  description: string[]
  durationMinutes: number
  image: string
  secondaryImage: string
  whatsAppMessage: string
}

/** Social Makeup options offered for Booking. */
export const SOCIAL_MAKEUP_OPTIONS: SocialMakeupOption[] = [
  {
    name: 'Maquillaje eventos',
    subtitle: 'Ideal para realzar tus facciones',
    description: ['Invitadas / Bautizos / Cumpleaños / Fiestas', 'Larga duración'],
    durationMinutes: 60,
    image: '/services/social/4.webp',
    secondaryImage: '/services/social/5.webp',
    whatsAppMessage: '¡Hola! ¿Cómo estás? Quisiera reservar un turno para *Makeup Básico*.'
  }
]

export const BRIDAL_MAKEUP_WHATSAPP_MESSAGE =
  'Hola, me gustaría solicitar presupuesto para el servicio de maquillaje de novias.'

export const BROW_DESIGN_WHATSAPP_MESSAGE = 'Hola, me gustaría solicitar turno para perfilado de cejas.'
