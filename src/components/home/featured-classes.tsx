import class1 from '@public/courses/1.jpg'
import class2 from '@public/courses/2.jpg'
import Image from 'next/image'
import { ButtonLink } from '../button-link'
import { Paragraph } from '../paragraph'

const IMAGES = [
  { src: class1, alt: 'Alumna aplicándose labial rojo durante una clase de automaquillaje' },
  { src: class2, alt: 'Clase de automaquillaje en el estudio' }
]

export function FeaturedClasses() {
  return (
    <section className='pb-8 md:pt-8'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row'>
        <div className='order-2 px-4 text-left md:order-1 md:ml-10 md:w-1/2 md:px-0'>
          <h2 className='mb-8 text-3xl font-extralight text-gray-700'>Clases</h2>

          <Paragraph>Las clases pueden ser presenciales u online.</Paragraph>
          <Paragraph>Podes tomar la cantidad que quieras y ver los temas que vos elijas según tu necesidad.</Paragraph>
          <Paragraph>
            Si querés aprender a hacerte un maquillaje básico, de tendencia o simplemente tener asesoramiento
            profesional.
          </Paragraph>

          <ButtonLink variant='secondary' href='/clases'>
            Más info
          </ButtonLink>
        </div>
        <div className='order-1 grid w-full grid-cols-2 gap-4 sm:w-4/6 md:order-2 md:w-1/2'>
          {IMAGES.map((image) => (
            <div key={image.alt} className='overflow-hidden'>
              <Image
                className='h-full'
                alt={image.alt}
                src={image.src}
                sizes='(min-width: 768px) 280px, (min-width: 640px) 33vw, 50vw'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
