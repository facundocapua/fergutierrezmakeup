import artistPortrait from '@public/about-me/main-new.jpg'
import Image from 'next/image'
import { BRANDS } from '@/data/brands'

/** Gives every logo the same visual area, whatever its proportions, in px². */
const BRAND_LOGO_AREA = 2600

function brandLogoSize({ width, height }: { width: number; height: number }) {
  const aspectRatio = width / height
  const logoHeight = Math.sqrt(BRAND_LOGO_AREA / aspectRatio)
  return { width: logoHeight * aspectRatio, height: logoHeight }
}

export function AboutArtist() {
  return (
    <section className='border-b-2 border-dorado bg-ink text-paper'>
      <div className='mx-auto grid max-w-[1680px] lg:grid-cols-12'>
        <div className='relative aspect-[4/5] sm:aspect-square lg:col-span-5 lg:aspect-auto'>
          <Image
            src={artistPortrait}
            alt='Fernanda Gutiérrez con sus pinceles, en blanco y negro'
            fill
            sizes='(min-width: 1680px) 700px, (min-width: 1024px) 42vw, 100vw'
            className='object-cover object-[50%_40%]'
          />
        </div>
        <div className='px-4 py-14 sm:px-8 lg:col-span-7 lg:px-16 lg:py-24'>
          <h2 className='text-5xl leading-none font-bold tracking-tight text-balance text-dorado [font-stretch:80%] sm:text-7xl'>
            Soy Fernanda Gutiérrez.
          </h2>
          <div className='mt-8 max-w-xl space-y-4 text-xl'>
            <p>
              Soy maquilladora profesional, con más de 22 años de experiencia. Maquillo para todo tipo de eventos y doy
              clases de automaquillaje y perfeccionamiento.
            </p>
            <p>
              Mi estilo es natural. Me apasionan las tendencias y las adapto para resaltar lo mejor de cada clienta, a
              la que acompaño de principio a fin.
            </p>
            <p>Me sigo formando en distintas técnicas. Hoy vivo en Málaga, donde tengo mi estudio.</p>
          </div>

          <h3 className='mt-14 text-xl font-semibold text-dorado'>Marcas que utilizo</h3>
          <ul className='mt-6 flex flex-wrap items-center gap-x-8 gap-y-6'>
            {BRANDS.map(({ name, image }) => (
              <li key={name}>
                <Image
                  src={image}
                  alt={name}
                  sizes='220px'
                  style={brandLogoSize(image)}
                  className='brightness-0 invert'
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
