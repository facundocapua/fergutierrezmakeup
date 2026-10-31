import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionTitle } from '@/components/section-title'
import { BridalMakeup } from '@/components/services/bridal-makeup'

export const metadata: Metadata = {
  alternates: { canonical: '/servicios/novias' }
}

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
