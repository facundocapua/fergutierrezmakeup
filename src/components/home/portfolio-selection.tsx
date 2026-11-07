import Image from 'next/image'
import Link from 'next/link'
import { PORTFOLIO_IMAGES } from '@/data/portfolio'
import { ActionLink } from '@/components/action-link'

const SELECTION = PORTFOLIO_IMAGES.slice(0, 5)

export function PortfolioSelection() {
  return (
    <section className='bg-ink py-14 text-paper lg:py-24'>
      <div className='mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-6 px-4 sm:px-8 lg:px-16'>
        <h2 className='text-5xl leading-none font-bold tracking-tight text-balance [font-stretch:80%] sm:text-7xl'>
          Mi trabajo.
        </h2>
        <ActionLink href='/portfolio' variant='line'>
          Ver todo el portfolio
        </ActionLink>
      </div>

      <ul className='mx-auto mt-10 flex max-w-[1680px] snap-x gap-3 overflow-x-auto px-4 sm:px-8 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-16'>
        {SELECTION.map((image, index) => (
          <li key={image.src} className='w-[70vw] shrink-0 snap-center sm:w-[42vw] lg:w-auto'>
            <Link
              href={`/portfolio?image=${index}`}
              className='relative block aspect-[3/4] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper'
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes='(min-width: 1024px) 20vw, (min-width: 640px) 42vw, 70vw'
                className='object-cover transition-transform duration-500 ease-out hover:scale-105'
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
