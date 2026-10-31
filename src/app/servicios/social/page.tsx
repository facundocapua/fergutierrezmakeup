import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionTitle } from '@/components/section-title'
import { SocialMakeup } from '@/components/services/social-makeup'

export const metadata: Metadata = {
  alternates: { canonical: '/servicios/social' }
}

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
