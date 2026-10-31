import clsx from 'clsx'
import type { PortfolioImage } from './portfolio-gallery'

export function PortfolioGallerySkeleton({ images }: { images: PortfolioImage[] }) {
  return (
    <div className='grid gap-4 md:grid-cols-3 md:grid-rows-[350px_350px_350px]'>
      {images.map((image) => (
        <div key={image.src} className={clsx(image.className, 'animate-pulse bg-neutral-800')}></div>
      ))}
    </div>
  )
}
