import type { Metadata } from 'next'
import { BrandsShowcase } from '@/components/home/brands-showcase'
import { FeaturedClasses } from '@/components/home/featured-classes'
import { FeaturedServices } from '@/components/home/featured-services'
import { HeroBio } from '@/components/home/hero-bio'
import { Reviews } from '@/components/home/reviews'
import { buildPageMetadata } from '@/lib/metadata'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site'
import { buildStudioStructuredData, toJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = buildPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/'
})

export default function HomePage() {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: toJsonLd(buildStudioStructuredData()) }} />
      <main className='w-full [&>*:nth-child(odd)]:bg-gray-100'>
        <HeroBio />
        <BrandsShowcase />
        <Reviews />
        <FeaturedServices />
        <FeaturedClasses />
      </main>
    </>
  )
}
