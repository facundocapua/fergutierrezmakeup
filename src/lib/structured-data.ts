import { CLASSES, type MakeupClass } from '@/data/classes'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { SERVICES } from '@/data/services'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site'
import { buildWhatsAppLink } from './whatsapp'

const STUDIO_ID = `${SITE_URL}/#studio`

/** Where the Artist works: the Studio's town and, for home visits, its province. */
const AREA_SERVED = [
  { '@type': 'City', name: CONTACT_DETAILS.city },
  { '@type': 'AdministrativeArea', name: `Provincia de ${CONTACT_DETAILS.state}` }
]

/** URL-safe fragment for a Class name: "Automaquillaje individual" -> "automaquillaje-individual". */
const slugify = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** JSON-LD `@id` of the Service described on a page, e.g. `/servicios/novias`. */
export const serviceId = (path: string): string => `${SITE_URL}${path}#service`

/** JSON-LD `@id` of a Class, which are all described on /clases. */
export const classId = (name: string): string => `${SITE_URL}/clases#${slugify(name)}`

/** How to book: the WhatsApp link with the page's message, and the Studio's phone. */
const bookingChannel = (whatsAppMessage: string) => ({
  '@type': 'ServiceChannel',
  serviceUrl: buildWhatsAppLink(whatsAppMessage),
  servicePhone: { '@type': 'ContactPoint', telephone: CONTACT_DETAILS.phoneE164 },
  availableLanguage: 'es'
})

/** schema.org description of the Studio, for search engines (JSON-LD). */
export function buildStudioStructuredData() {
  const {
    email,
    phoneE164,
    address,
    city,
    state,
    postalCode,
    country,
    openingHours,
    coordinates,
    mapLink,
    socialNetworks
  } = CONTACT_DETAILS

  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': STUDIO_ID,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    email,
    telephone: phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: city,
      addressRegion: state,
      postalCode,
      addressCountry: country
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: openingHours.days,
        opens: openingHours.opens,
        closes: openingHours.closes
      }
    ],
    areaServed: AREA_SERVED,
    geo: { '@type': 'GeoCoordinates', ...coordinates },
    hasMap: mapLink,
    sameAs: [socialNetworks.facebook, socialNetworks.instagram, socialNetworks.tiktok],
    founder: { '@type': 'Person', name: 'Fernanda Gutiérrez', jobTitle: 'Maquilladora profesional' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios y clases',
      itemListElement: [
        ...SERVICES.map(({ title, href }) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', '@id': serviceId(href), name: title }
        })),
        ...CLASSES.map(({ name }) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', '@id': classId(name), name }
        }))
      ]
    }
  }
}

type ServiceStructuredDataInput = {
  /** Page path of the Service, one of the SERVICES hrefs. */
  path: string
  /** What the Service is, e.g. the page's meta description. */
  description: string
  /** Kind of Service in plain Spanish, e.g. "Maquillaje de novias". */
  serviceType: string
  /** The page's WhatsApp Booking or Quote message. */
  whatsAppMessage: string
}

/**
 * schema.org Service (JSON-LD) for a Service page, linked to the Studio. No prices or reviews:
 * prices aren't published (backlog C2) and Google forbids self-serving review markup.
 */
export function buildServiceStructuredData({
  path,
  description,
  serviceType,
  whatsAppMessage
}: ServiceStructuredDataInput) {
  const service = SERVICES.find((summary) => summary.href === path)
  if (!service) throw new Error(`No Service with path ${path} in src/data/services.ts`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceId(path),
    name: service.title,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    image: new URL(service.image.src, SITE_URL).toString(),
    provider: { '@id': STUDIO_ID },
    areaServed: AREA_SERVED,
    availableChannel: bookingChannel(whatsAppMessage)
  }
}

/** schema.org Service (JSON-LD) for a Class, taught in person at the Studio or online. */
export function buildClassStructuredData({ name, description, topics, whatsAppMessage }: MakeupClass) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': classId(name),
    name,
    description: [...description, ...(topics ? [`Temas: ${topics.join(', ')}.`] : [])].join(' '),
    serviceType: 'Clase de maquillaje',
    url: `${SITE_URL}/clases`,
    provider: { '@id': STUDIO_ID },
    areaServed: AREA_SERVED,
    availableChannel: bookingChannel(whatsAppMessage)
  }
}

/** Serializes JSON-LD safely for an inline <script> tag. */
export const toJsonLd = (data: object): string => JSON.stringify(data).replace(/</g, '\\u003c')

/** schema.org BreadcrumbList (JSON-LD) for a page, starting at the home page. */
export function buildBreadcrumbStructuredData(pages: { name: string; href: string }[]) {
  const items = [{ name: 'Inicio', href: '/' }, ...pages]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.name,
      item: new URL(page.href, SITE_URL).toString()
    }))
  }
}
