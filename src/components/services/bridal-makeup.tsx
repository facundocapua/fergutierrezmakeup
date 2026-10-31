import bridalMakeupImage from '@public/services/5.webp'
import Image from 'next/image'
import Link from 'next/link'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { BRIDAL_MAKEUP_WHATSAPP_MESSAGE } from '@/data/services'
import { buildWhatsAppLink } from '@/lib/whatsapp'

export function BridalMakeup() {
  return (
    <section className='relative mx-auto mb-12 max-w-7xl'>
      <div className='relative h-[400px] overflow-hidden rounded-lg lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16'>
        <Image
          alt='Maquillaje de novias'
          src={bridalMakeupImage}
          className='h-full w-full object-cover object-[60%_30%]'
          fill
          sizes='(min-width: 1024px) 640px, 100vw'
        />
      </div>

      <div className='mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-12 lg:px-8 lg:pt-32'>
        <div className='lg:col-start-2'>
          <h2 className='mt-4 text-3xl font-semibold tracking-tight text-gray-900 lg:text-4xl'>Maquillaje de novias</h2>
          <p className='my-4'>
            Me gustaría ser parte de tu día especial y que juntas creemos el maquillaje perfecto para vos.
          </p>
          <p className='my-4'>
            Comenzamos con una entrevista para conocernos personalmente y ver que estilo de maquillaje te gusta. Luego,
            realizamos una prueba de maquillaje, tomando en cuenta tus ideas, mis consejos y lo que charlamos en la
            cita.
          </p>
          <p className='my-4'>
            El día de la boda podes elegir maquillarte en mi estudio o en el lugar que vos elijas (si es domicilio se
            cobra adicional).
          </p>
          <div>
            <Link
              href={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, BRIDAL_MAKEUP_WHATSAPP_MESSAGE)}
              className='mt-6 inline-block rounded-md bg-black px-8 py-2 text-xl text-white uppercase transition-all duration-300 hover:scale-110'
            >
              solicitar presupuesto
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
