import profilePicture from '@public/about-me/main-new.jpg'
import Image from 'next/image'
import type { ReactNode } from 'react'

const Text = ({ children }: { children: ReactNode }) => <p className='my-4 text-lg text-gray-600'>{children}</p>

export function HeroBio() {
  return (
    <section className='w-full pb-8 md:pt-8'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2'>
        <div className='relative h-[500px] overflow-hidden'>
          <Image
            src={profilePicture}
            alt='Fernanda Gutierrez'
            fill
            loading='eager'
            fetchPriority='high'
            sizes='(min-width: 1024px) 640px, 100vw'
            className='object-cover object-[50%_70%]'
          />
        </div>
        <article className='px-4 md:px-0'>
          <h1 className='text-4xl'>Soy Fernanda Gutiérrez</h1>
          <Text>
            Maquilladora profesional, con mas de 22 años de experiencia. Maquillo para todo tipo de eventos, dicto
            cursos de perfeccionamiento y clases de automaquillaje.
          </Text>
          <Text>
            Tengo un estilo natural, que se ve reflejado en mis trabajos, apasionada de las tendencias, las adapto
            buscando resaltar lo mejor de mis clientas.
          </Text>
          <Text>
            Me gusta estar actualizada, por ello constantemente me perfecciono en distintas técnicas para lograr
            trabajos de excelencia.
          </Text>
          <Text>Actualmente vivo en Málaga, tengo mi estudio y brindo mis servicios.</Text>
        </article>
      </div>
    </section>
  )
}
