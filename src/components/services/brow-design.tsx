import browDesignImage from '@public/services/3.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { BROW_DESIGN_WHATSAPP_MESSAGE } from '@/data/services'
import { buildWhatsAppLink } from '@/lib/whatsapp'

export function BrowDesign() {
  return (
    <section className='relative mx-auto mb-12 max-w-7xl'>
      <div className='relative flex h-[550px] w-full flex-col lg:absolute lg:w-1/2 lg:flex-row'>
        <Image
          alt='Perfilado de cejas'
          src={browDesignImage}
          sizes='(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw'
          loading='eager'
          fetchPriority='high'
          className='h-1/2 w-full object-cover object-[50%_10%] lg:h-full lg:object-[50%_20%]'
        />
      </div>

      <div className='mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-12 lg:px-8 lg:pt-32'>
        <div className='lg:col-start-2'>
          <h2 className='mt-4 text-3xl font-semibold tracking-tight text-gray-900 lg:text-4xl'>
            Diseño y perfilado de cejas
          </h2>
          <p className='my-4'>
            El servicio de diseño y perfilado de cejas está diseñado para realzar tu belleza natural y darte una
            apariencia pulida y profesional.
          </p>
          <p className='my-4'>
            Tener unas cejas bien diseñadas no solo mejora la simetría de tu rostro, sino que también aumenta tu
            confianza, haciéndote sentir segura y radiante en cualquier ocasión.
          </p>
          <p className='my-4'>¡Dejame ayudarte a destacar tu mejor versión con unas cejas perfectamente perfiladas!</p>
          <div>
            <Link
              href={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, BROW_DESIGN_WHATSAPP_MESSAGE)}
              className='mt-6 inline-block rounded-md bg-black px-8 py-2 text-xl text-white uppercase transition-all duration-300 hover:scale-110'
            >
              solicitar turno
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
