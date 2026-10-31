import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionTitle } from '@/components/section-title'
import { BrowDesign } from '@/components/services/brow-design'

export const metadata: Metadata = {
  alternates: { canonical: '/servicios/cejas' }
}

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
