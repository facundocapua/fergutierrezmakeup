/** Builds a WhatsApp click-to-chat link with a pre-filled message. */
export const buildWhatsAppLink = (whatsAppUrl: string, message: string): string =>
  `${whatsAppUrl}?text=${encodeURIComponent(message)}`
