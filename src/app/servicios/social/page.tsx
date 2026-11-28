import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { JsonLd } from '@/components/json-ld'
import { SOCIAL_MAKEUP_OPTIONS } from '@/data/services'
import { buildPageMetadata } from '@/lib/metadata'
import { buildServiceStructuredData } from '@/lib/structured-data'
import { SectionTitle } from '@/components/section-title'
import { SocialMakeup } from '@/components/services/social-makeup'

const PATH = '/servicios/social'
const DESCRIPTION =
  'Maquillaje de larga duración para invitadas, bautizos, cumpleaños y fiestas en Benalmádena (Málaga). Reserva por WhatsApp.'

export const metadata: Metadata = buildPageMetadata({
  title: 'Maquillaje social en Benalmádena',
  description: DESCRIPTION,
  path: PATH
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildServiceStructuredData({
          path: PATH,
          description: DESCRIPTION,
          serviceType: 'Maquillaje social',
          whatsAppMessage: SOCIAL_MAKEUP_OPTIONS[0]?.whatsAppMessage ?? ''
        })}
      />
      <div className='mx-auto mb-4 max-w-7xl'>
        <Breadcrumb
          pages={[
            { name: 'Servicios', href: '/servicios' },
            { name: 'Maquillaje Social', href: '/servicios/social', current: true }
          ]}
        />
      </div>
      <SectionTitle>Maquillaje Social</SectionTitle>
      <SocialMakeup />
    </>
  )
}
