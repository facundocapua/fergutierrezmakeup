import { describe, expect, it } from 'vitest'
import { CLASSES } from '@/data/classes'
import { BRIDAL_MAKEUP_WHATSAPP_MESSAGE, BROW_DESIGN_WHATSAPP_MESSAGE, SOCIAL_MAKEUP_OPTIONS } from '@/data/services'
import { buildWhatsAppLink, MAX_WHATSAPP_MESSAGE_LENGTH, WHATSAPP_CHAT_URL } from '@/lib/whatsapp'

const SITE_MESSAGES = [
  BRIDAL_MAKEUP_WHATSAPP_MESSAGE,
  BROW_DESIGN_WHATSAPP_MESSAGE,
  ...SOCIAL_MAKEUP_OPTIONS.map((option) => option.whatsAppMessage),
  ...CLASSES.map((makeupClass) => makeupClass.whatsAppMessage)
]

describe('WHATSAPP_CHAT_URL', () => {
  it('opens a chat with the Studio', () => {
    expect(WHATSAPP_CHAT_URL).toBe('https://wa.me/34623807060')
  })
})

describe('buildWhatsAppLink', () => {
  it.each(SITE_MESSAGES)('links to the Studio and round-trips %j', (message) => {
    const url = new URL(buildWhatsAppLink(message))

    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34623807060')
    expect(url.searchParams.get('text')).toBe(message)
  })

  it('encodes characters that would otherwise break the query', () => {
    const link = buildWhatsAppLink('¿Hola? *Novia* & madrina #1 100%')

    expect(link.split('?text=')[1]).not.toMatch(/[?&# ]/)
    expect(new URL(link).searchParams.get('text')).toBe('¿Hola? *Novia* & madrina #1 100%')
  })

  it('strips formatting from the phone number', () => {
    expect(buildWhatsAppLink('Hola', '+34623807060')).toBe('https://wa.me/34623807060?text=Hola')
  })

  it('rejects a phone number that is not E.164', () => {
    expect(() => buildWhatsAppLink('Hola', '+34 623 807 060')).toThrow()
  })

  it('rejects an empty or overlong message', () => {
    expect(() => buildWhatsAppLink('   ')).toThrow()
    expect(() => buildWhatsAppLink('a'.repeat(MAX_WHATSAPP_MESSAGE_LENGTH + 1))).toThrow()
  })
})
