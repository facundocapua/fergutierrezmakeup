/** Event name in Pirsch for clicks on WhatsApp links, the site's only conversion. */
export const BOOKING_CLICK_EVENT = 'WhatsApp click'

/**
 * Marks a WhatsApp link with what it books, e.g. `{...bookingAttributes('Maquillaje de novias')}`.
 * BookingClickTracker sends this value with the click event; the message text is never sent.
 */
export const bookingAttributes = (booking: string) => ({ 'data-booking': booking })
