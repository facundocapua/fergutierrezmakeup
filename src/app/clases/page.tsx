import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { BookingDetails } from '@/components/booking-details'
import { ClassesList } from '@/components/classes/classes-list'
import { buildPageMetadata } from '@/lib/metadata'
import { WHATSAPP_CHAT_URL } from '@/lib/whatsapp'
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
      <div className='mx-auto mb-12 max-w-lg lg:max-w-7xl'>
        <BookingDetails
          where='Presenciales en el estudio u online'
          bookingHref={WHATSAPP_CHAT_URL}
          bookingLabel='Consultar por las clases'
        />
      </div>
    </main>
  )
}
