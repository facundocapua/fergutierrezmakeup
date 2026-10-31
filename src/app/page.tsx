import type { Metadata } from 'next'
import { BrandsShowcase } from '@/components/home/brands-showcase'
import { FeaturedClasses } from '@/components/home/featured-classes'
import { FeaturedServices } from '@/components/home/featured-services'
import { HeroBio } from '@/components/home/hero-bio'
import { Reviews } from '@/components/home/reviews'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

export default function HomePage() {
  return (
    <main className='w-full [&>*:nth-child(odd)]:bg-gray-100'>
      <HeroBio />
      <BrandsShowcase />
      <Reviews />
      <FeaturedServices />
      <FeaturedClasses />
    </main>
  )
}
