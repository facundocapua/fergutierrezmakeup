'use client'

import { useEffect } from 'react'
import { BOOKING_CLICK_EVENT } from '@/lib/analytics'

declare global {
  interface Window {
    pirsch?: (name: string, options?: { meta?: Record<string, string> }) => Promise<unknown>
  }
}

/**
 * Sends a Pirsch event when a link marked with `bookingAttributes` is clicked.
 * One listener on the document instead of Pirsch's `data-pirsch-event` attributes, which pa.js
 * binds only once on page load and so misses links on pages reached by client-side navigation.
 */
export function BookingClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-booking]') : null
      const booking = link?.dataset.booking
      if (booking) void window.pirsch?.(BOOKING_CLICK_EVENT, { meta: { booking } }).catch(() => {})
    }
    document.addEventListener('click', onClick)
    document.addEventListener('auxclick', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('auxclick', onClick)
    }
  }, [])

  return null
}
