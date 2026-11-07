import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { buildPageMetadata } from '@/lib/metadata'
import { SectionTitle } from '@/components/section-title'
import { SocialMakeup } from '@/components/services/social-makeup'

export const metadata: Metadata = buildPageMetadata({
  title: 'Maquillaje social en Benalmádena',
  description:
    'Maquillaje de larga duración para invitadas, bautizos, cumpleaños y fiestas en Benalmádena (Málaga). Reserva por WhatsApp.',
  path: '/servicios/social'
})

export default function Page() {
  return (
    <>
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
