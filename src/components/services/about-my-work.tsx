import Image from 'next/image'
import { BRANDS } from '@/data/brands'

export function AboutMyWork() {
  return (
    <section className='bg-gray-100 py-16'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row'>
        <div className='ml-10 text-left md:w-1/2'>
          <h2 className='mb-8 text-3xl font-extralight text-gray-700'>Sobre mis trabajos</h2>
          <p className='mb-4 font-extralight break-words text-gray-600'>
            Mis maquillajes tienen asegurada su durabilidad, ya que están realizados con técnicas precisas y son aptos
            para emocionarse.
          </p>
        </div>
        <div className='grid w-full grid-cols-5 items-center gap-4 sm:w-4/6 md:w-1/2'>
          {BRANDS.map(({ name, image }) => (
            <Image key={name} title={name} alt={name} src={image} className='w-36' />
          ))}
        </div>
      </div>
    </section>
  )
}
