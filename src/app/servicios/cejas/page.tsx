import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { buildPageMetadata } from '@/lib/metadata'
import { SectionTitle } from '@/components/section-title'
import { BrowDesign } from '@/components/services/brow-design'

export const metadata: Metadata = buildPageMetadata({
  title: 'Diseño de cejas en Benalmádena',
  description:
    'Diseño y perfilado de cejas en Benalmádena (Málaga) para realzar tu belleza natural. Reserva por WhatsApp.',
  path: '/servicios/cejas'
})

export default function Page() {
  return (
    <>
      <div className='mx-auto mb-4 max-w-7xl'>
        <Breadcrumb
          pages={[
            { name: 'Servicios', href: '/servicios' },
            { name: 'Cejas', href: '/servicios/cejas', current: true }
          ]}
        />
      </div>
      <SectionTitle>Diseño de cejas</SectionTitle>
      <BrowDesign />
    </>
  )
}
