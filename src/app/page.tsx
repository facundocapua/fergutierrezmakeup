import type { Metadata } from 'next'
import { AboutArtist } from '@/components/home/about-artist'
import { BridalSection } from '@/components/home/bridal-section'
import { ClassesSection } from '@/components/home/classes-section'
import { HeroChart } from '@/components/home/hero-chart'
import { OccasionsSection } from '@/components/home/occasions-section'
import { PortfolioSelection } from '@/components/home/portfolio-selection'
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
      <main className='w-full font-chart'>
        <HeroChart />
        <ClassesSection />
        <BridalSection />
        <OccasionsSection />
        <PortfolioSelection />
        <Reviews />
        <AboutArtist />
      </main>
    </>
  )
}
