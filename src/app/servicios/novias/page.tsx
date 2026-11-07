import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { buildPageMetadata } from '@/lib/metadata'
import { SectionTitle } from '@/components/section-title'
import { BridalMakeup } from '@/components/services/bridal-makeup'

export const metadata: Metadata = buildPageMetadata({
  title: 'Maquillaje de novias en Benalmádena',
  description:
    'Maquillaje para tu boda en Benalmádena (Málaga), con entrevista y prueba previas, en el estudio o a domicilio. Pide presupuesto por WhatsApp.',
  path: '/servicios/novias'
})

export default function Page() {
  return (
    <>
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
