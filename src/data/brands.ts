import type { StaticImageData } from 'next/image'
import chanel from '@public/brands/chanel.svg'
import charlotteTilbury from '@public/brands/charlotte-tilbury.svg'
import clinique from '@public/brands/clinique.svg'
import dior from '@public/brands/dior.svg'
import lancome from '@public/brands/lancome.svg'
import loreal from '@public/brands/loreal.svg'
import mac from '@public/brands/mac.png'
import maybelline from '@public/brands/maybelline.svg'
import natashaDenona from '@public/brands/natasha-denona.png'
import patMcGrathLabs from '@public/brands/pat-mcgrath-labs.svg'

export type Brand = {
  name: string
  image: StaticImageData
}

/** Brands the Artist works with. */
export const BRANDS: Brand[] = [
  { name: 'Clinique', image: clinique },
  { name: 'Dior', image: dior },
  { name: 'Lancome', image: lancome },
  { name: 'Chanel', image: chanel },
  { name: 'Charlotte Tilbury', image: charlotteTilbury },
  { name: 'Natasha Denona', image: natashaDenona },
  { name: 'Pat McGrath Labs', image: patMcGrathLabs },
  { name: 'Loreal', image: loreal },
  { name: 'MAC', image: mac },
  { name: 'Maybelline', image: maybelline }
]
