import { CONTACT_DETAILS } from '@/data/contact-details'
import { SOCIAL_MAKEUP_OPTIONS } from '@/data/services'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { SocialMakeupOption } from './social-makeup-option'

export function SocialMakeup() {
  return (
    <section className='mx-auto max-w-7xl'>
      <div className='flex flex-col gap-12'>
        {SOCIAL_MAKEUP_OPTIONS.map(({ whatsAppMessage, ...option }, index) => (
          <SocialMakeupOption
            key={option.name}
            {...option}
            align={index % 2 === 0 ? 'left' : 'right'}
            bookingHref={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, whatsAppMessage)}
          />
        ))}
      </div>
    </section>
  )
}
