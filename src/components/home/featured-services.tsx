import service1 from '@public/services/1.jpg'
import service2 from '@public/services/2.jpg'
import service4 from '@public/services/3.jpg'
import service3 from '@public/services/social/4.webp'
import Image from 'next/image'
import { ButtonLink } from '../button-link'
import { Paragraph } from '../paragraph'

const IMAGES = [
  { src: service1, alt: 'Maquillaje de novia natural con tonos cálidos' },
  { src: service2, alt: 'Maquillaje social con ojos ahumados y labios nude' },
  { src: service3, alt: 'Maquillaje de evento con delineado y labios rojos' },
  { src: service4, alt: 'Diseño de cejas y delineado en primer plano' }
]

export function FeaturedServices() {
  return (
    <section className='pt-0 pb-8 md:pt-8'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row'>
        <div className='grid w-full grid-cols-2 gap-4 sm:w-4/6 md:w-1/2'>
          {IMAGES.map((image) => (
            <div key={image.alt} className='aspect-square overflow-hidden'>
              <Image
                className='w-full'
                alt={image.alt}
                src={image.src}
                sizes='(min-width: 768px) 280px, (min-width: 640px) 33vw, 50vw'
              />
            </div>
          ))}
        </div>
        <div className='px-4 text-left md:w-1/2 md:px-0'>
          <h2 className='mb-8 text-3xl font-extralight text-black'>Servicios</h2>

          <Paragraph>Los servicios pueden ser en el estudio o a domicilio. Tienen distintos honorarios.</Paragraph>
          <Paragraph>Para reservar el turno de servicio de maquillaje se debe realizar una seña del 50%.</Paragraph>
          <Paragraph>De esta manera queda el lugar reservado.</Paragraph>

          <ButtonLink variant='secondary' href='/servicios'>
            Más info
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
