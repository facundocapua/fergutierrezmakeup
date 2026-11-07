import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { ClassesList } from '@/components/classes/classes-list'
import { buildPageMetadata } from '@/lib/metadata'
import { SectionTitle } from '@/components/section-title'

export const metadata: Metadata = buildPageMetadata({
  title: 'Clases de maquillaje en Benalmádena',
  description:
    'Clases personalizadas de automaquillaje y perfeccionamiento, presenciales en Benalmádena (Málaga) u online. Consulta por WhatsApp.',
  path: '/clases'
})

export default function ClassesPage() {
  return (
    <main className='mt-4 mb-4 w-full px-4'>
      <div className='mx-auto mb-4 max-w-7xl'>
        <Breadcrumb pages={[{ name: 'Clases', href: '/clases', current: true }]} />
      </div>
      <SectionTitle>Clases</SectionTitle>
      <ClassesList />
    </main>
  )
}
