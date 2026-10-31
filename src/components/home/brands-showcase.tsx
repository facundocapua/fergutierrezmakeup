import Image from 'next/image'
import { BRANDS } from '@/data/brands'
import { FeaturedTitle } from '../featured-title'

export function BrandsShowcase() {
  return (
    <section className='py-8'>
      <FeaturedTitle>Marcas que utilizo</FeaturedTitle>
      <div className='grid w-full grid-cols-2 place-items-center items-center gap-12 px-4 lg:grid-cols-5 xl:flex xl:flex-wrap xl:justify-evenly xl:px-0'>
        {BRANDS.map(({ name, image }) => (
          <Image
            key={name}
            title={name}
            alt={name}
            src={image}
            className='w-full lg:w-[240px]'
            sizes='(min-width: 1024px) 240px, 50vw'
          />
        ))}
      </div>
    </section>
  )
}
