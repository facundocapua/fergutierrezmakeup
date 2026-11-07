import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { buildPageMetadata } from '@/lib/metadata'
import { SectionTitle } from '@/components/section-title'
import { AboutMyWork } from '@/components/services/about-my-work'
import { ServicesGrid } from '@/components/services/services-grid'

export const metadata: Metadata = buildPageMetadata({
  title: 'Servicios de maquillaje en Benalmádena',
  description:
    'Maquillaje social, maquillaje de novias y diseño de cejas en Benalmádena (Málaga), en el estudio o a domicilio. Reserva por WhatsApp.',
  path: '/servicios'
})

export default function ServicesPage() {
  return (
    <>
      <div className='mx-auto mb-4 max-w-7xl'>
        <Breadcrumb pages={[{ name: 'Servicios', href: '/servicios', current: true }]} />
      </div>
      <SectionTitle>Servicios</SectionTitle>
      <ServicesGrid />
      <AboutMyWork />
    </>
  )
}
