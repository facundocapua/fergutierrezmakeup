export type PortfolioImage = {
  src: string
  alt: string
  /** Classes of the grid cell holding the image (span and focal point). */
  className: string
}

const CELL = 'relative block h-[350px] w-full rounded-xl md:h-full'

/** The Artist's Portfolio, in display order. */
export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  {
    src: '/portfolio/1.jpg',
    alt: 'Maquillaje con delineado azul gráfico y labios nude rosados',
    className: `${CELL} md:row-span-2 *:object-[50%_40%]`
  },
  {
    src: '/portfolio/12.webp',
    alt: 'Maquillaje con delineado verde, rubor rosado intenso y labios brillantes',
    className: `${CELL} md:row-span-3 *:object-[60%_45%]`
  },
  {
    src: '/portfolio/13.webp',
    alt: 'Maquillaje rosado con sombras lavanda y perlas junto al ojo',
    className: `${CELL} *:object-[50%_20%]`
  },
  {
    src: '/portfolio/11.webp',
    alt: 'Maquillaje con delineado azul eléctrico y piel iluminada',
    className: `${CELL} md:row-span-2 *:object-[50%_10%]`
  },
  {
    src: '/portfolio/10.webp',
    alt: 'Maquillaje con sombras celestes y aplicaciones de perlas',
    className: `${CELL} *:object-[50%_15%]`
  }
]
