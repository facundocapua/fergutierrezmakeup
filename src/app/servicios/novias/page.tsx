import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { JsonLd } from '@/components/json-ld'
import { BRIDAL_MAKEUP_WHATSAPP_MESSAGE } from '@/data/services'
import { buildPageMetadata } from '@/lib/metadata'
import { buildServiceStructuredData } from '@/lib/structured-data'
import { SectionTitle } from '@/components/section-title'
import { BridalMakeup } from '@/components/services/bridal-makeup'

const PATH = '/servicios/novias'
const DESCRIPTION =
  'Maquillaje para tu boda en Benalmádena (Málaga), con entrevista y prueba previas, en el estudio o a domicilio. Pide presupuesto por WhatsApp.'

export const metadata: Metadata = buildPageMetadata({
  title: 'Maquillaje de novias en Benalmádena',
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
          serviceType: 'Maquillaje de novias',
          whatsAppMessage: BRIDAL_MAKEUP_WHATSAPP_MESSAGE
        })}
      />
      <div className='mx-auto mb-4 max-w-7xl'>
        <Breadcrumb
          pages={[
            { name: 'Servicios', href: '/servicios' },
            { name: 'Maquillaje Novias', href: '/servicios/novias', current: true }
          ]}
        />
      </div>
      <SectionTitle>Maquillaje Novias</SectionTitle>
      <BridalMakeup />
    </>
  )
}
