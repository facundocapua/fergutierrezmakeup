import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioImage } from '@/data/portfolio'
import { PORTFOLIO_IMAGE_PARAM } from './portfolio-image-param'

export function PortfolioGrid({ images }: { images: PortfolioImage[] }) {
  return (
    <div className='grid gap-4 md:grid-cols-3 md:grid-rows-[350px_350px_350px]'>
      {images.map((image, index) => (
        <Link
          key={image.src}
          href={{ query: { [PORTFOLIO_IMAGE_PARAM]: index } }}
          replace
          scroll={false}
          className={`${image.className} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black`}
          aria-label={`Ampliar: ${image.alt}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            className='cursor-pointer rounded-lg object-cover'
            fill
            sizes='(min-width: 1280px) 405px, (min-width: 768px) 33vw, 100vw'
            loading={index === 0 ? 'eager' : undefined}
            fetchPriority={index === 0 ? 'high' : undefined}
          />
        </Link>
      ))}
    </div>
  )
}
