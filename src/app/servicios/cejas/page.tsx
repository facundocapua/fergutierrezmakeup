import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { JsonLd } from '@/components/json-ld'
import { BROW_DESIGN_WHATSAPP_MESSAGE } from '@/data/services'
import { buildPageMetadata } from '@/lib/metadata'
import { buildServiceStructuredData } from '@/lib/structured-data'
import { SectionTitle } from '@/components/section-title'
import { BrowDesign } from '@/components/services/brow-design'

const PATH = '/servicios/cejas'
const DESCRIPTION =
  'Diseño y perfilado de cejas en Benalmádena (Málaga) para realzar tu belleza natural. Reserva por WhatsApp.'

export const metadata: Metadata = buildPageMetadata({
  title: 'Diseño de cejas en Benalmádena',
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
          serviceType: 'Diseño de cejas',
          whatsAppMessage: BROW_DESIGN_WHATSAPP_MESSAGE
        })}
      />
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
