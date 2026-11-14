import { CONTACT_DETAILS } from '@/data/contact-details'

/**
 * Longest pre-filled message accepted. WhatsApp documents no limit for `text`, so this is a
 * conservative cap that keeps links short for people and agents (docs/research/llm-agents.md, O6).
 */
export const MAX_WHATSAPP_MESSAGE_LENGTH = 500

/** wa.me wants the full international number as digits only: no `+`, spaces or dashes. */
const toWhatsAppNumber = (phoneE164: string): string => {
  const digits = phoneE164.replace(/^\+/, '')
  if (!/^\d{8,15}$/.test(digits)) {
    throw new Error(`Invalid E.164 phone for WhatsApp: ${phoneE164}`)
  }
  return digits
}

/** Opens a chat with the Studio, without a pre-filled message. */
export const WHATSAPP_CHAT_URL = `https://wa.me/${toWhatsAppNumber(CONTACT_DETAILS.phoneE164)}`

/**
 * Builds a WhatsApp click-to-chat link to the Studio with a pre-filled message.
 * Throws on an empty or overlong message, so a bad message fails the build instead of shipping.
 */
export const buildWhatsAppLink = (message: string, phoneE164: string = CONTACT_DETAILS.phoneE164): string => {
  const text = message.trim()
  if (text.length === 0 || text.length > MAX_WHATSAPP_MESSAGE_LENGTH) {
    throw new Error(`WhatsApp message must be 1–${MAX_WHATSAPP_MESSAGE_LENGTH} characters, got ${text.length}`)
  }
  return `https://wa.me/${toWhatsAppNumber(phoneE164)}?text=${encodeURIComponent(text)}`
}
