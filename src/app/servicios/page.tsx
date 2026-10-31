import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionTitle } from '@/components/section-title'
import { AboutMyWork } from '@/components/services/about-my-work'
import { ServicesGrid } from '@/components/services/services-grid'

export const metadata: Metadata = {
  alternates: { canonical: '/servicios' }
}

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
