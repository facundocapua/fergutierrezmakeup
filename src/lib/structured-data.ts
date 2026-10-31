import { CONTACT_DETAILS } from '@/data/contact-details'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site'

/** schema.org description of the Studio, for search engines (JSON-LD). */
export function buildStudioStructuredData() {
  const { email, phoneE164, address, city, state, postalCode, country, coordinates, mapLink, socialNetworks } =
    CONTACT_DETAILS

  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${SITE_URL}/#studio`,
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
    geo: { '@type': 'GeoCoordinates', ...coordinates },
    hasMap: mapLink,
    sameAs: [socialNetworks.facebook, socialNetworks.instagram, socialNetworks.tiktok],
    founder: { '@type': 'Person', name: 'Fernanda Gutiérrez', jobTitle: 'Maquilladora profesional' }
  }
}

/** Serializes JSON-LD safely for an inline <script> tag. */
export const toJsonLd = (data: object): string => JSON.stringify(data).replace(/</g, '\\u003c')
