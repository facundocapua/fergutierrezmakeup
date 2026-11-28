import { describe, expect, it } from 'vitest'
import { CLASSES } from '@/data/classes'
import { SERVICES } from '@/data/services'
import {
  buildClassStructuredData,
  buildServiceStructuredData,
  buildStudioStructuredData,
  classId,
  serviceId
} from '@/lib/structured-data'

const studio = buildStudioStructuredData()
const catalogIds = studio.hasOfferCatalog.itemListElement.map((offer) => offer.itemOffered['@id'])

const services = SERVICES.map(({ href }) =>
  buildServiceStructuredData({
    path: href,
    description: 'Descripción',
    serviceType: 'Tipo',
    whatsAppMessage: 'Hola'
  })
)
const classes = CLASSES.map(buildClassStructuredData)

describe('structured data', () => {
  it("lists every Service and Class in the Studio's catalog, by the same @id their pages use", () => {
    expect(catalogIds).toEqual([...services, ...classes].map((entry) => entry['@id']))
    expect(new Set(catalogIds).size).toBe(catalogIds.length)
  })

  it('links every Service and Class to the Studio and to a WhatsApp Booking link', () => {
    for (const entry of [...services, ...classes]) {
      expect(entry.provider['@id']).toBe(studio['@id'])
      expect(entry.availableChannel.serviceUrl).toMatch(/^https:\/\/wa\.me\/34623807060\?text=/)
    }
  })

  it('never marks up reviews, ratings or prices', () => {
    const json = JSON.stringify([studio, ...services, ...classes])
    expect(json).not.toMatch(/aggregateRating|"review"|"price"|priceSpecification/)
  })

  it('builds stable, readable ids', () => {
    expect(serviceId('/servicios/novias')).toBe('https://www.fernandagutierrez.es/servicios/novias#service')
    expect(classId('Automaquillaje individual')).toBe(
      'https://www.fernandagutierrez.es/clases#automaquillaje-individual'
    )
  })

  it('rejects a path that is not a Service', () => {
    expect(() =>
      buildServiceStructuredData({ path: '/nope', description: 'x', serviceType: 'x', whatsAppMessage: 'Hola' })
    ).toThrow()
  })
})
