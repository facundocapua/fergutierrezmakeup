import Script from 'next/script'
import { BookingClickTracker } from './booking-click-tracker'

/**
 * Pirsch, cookieless audience measurement (docs/research/analytics.md). Loads only on the
 * production deployment and only when `PIRSCH_CODE` is set, so previews and local runs send nothing.
 * Outbound-link tracking is off because it would send the whole wa.me URL, message included;
 * BookingClickTracker sends a WhatsApp click event with only the Service or Class instead.
 */
export function Analytics() {
  const code = process.env.PIRSCH_CODE
  if (process.env.VERCEL_ENV !== 'production' || !code) return null

  return (
    <>
      {/* pa.js finds its own tag by this id. */}
      <Script id='pianjs' src='https://api.pirsch.io/pa.js' data-code={code} data-disable-outbound-links />
      <BookingClickTracker />
    </>
  )
}
