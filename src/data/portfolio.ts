import type { PortfolioImage } from '@/components/portfolio/portfolio-gallery'

const CELL = 'relative block h-[350px] w-full rounded-xl md:h-full'

/** The Artist's Portfolio, in display order. */
export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  { src: '/portfolio/1.jpg', className: `${CELL} md:row-span-2 *:object-[50%_40%]` },
  { src: '/portfolio/12.webp', className: `${CELL} md:row-span-3 *:object-[60%_45%]` },
  { src: '/portfolio/13.webp', className: `${CELL} *:object-[50%_20%]` },
  { src: '/portfolio/11.webp', className: `${CELL} md:row-span-2 *:object-[50%_10%]` },
  { src: '/portfolio/10.webp', className: `${CELL} *:object-[50%_15%]` }
]
