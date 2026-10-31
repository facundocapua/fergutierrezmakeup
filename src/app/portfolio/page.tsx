import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery'
import { PortfolioGallerySkeleton } from '@/components/portfolio/portfolio-gallery-skeleton'
import { SectionTitle } from '@/components/section-title'
import { PORTFOLIO_IMAGES } from '@/data/portfolio'

export const metadata: Metadata = {
  alternates: { canonical: '/portfolio' }
}

export default function PortfolioPage() {
  return (
    <main className='mt-4 mb-4 w-full px-4'>
      <div className='mx-auto mb-4 max-w-7xl'>
        <Breadcrumb pages={[{ name: 'Portfolio', href: '/portfolio', current: true }]} />
      </div>

      <SectionTitle>Portfolio</SectionTitle>

      <section className='mx-auto max-w-7xl'>
        <Suspense fallback={<PortfolioGallerySkeleton images={PORTFOLIO_IMAGES} />}>
          <PortfolioGallery images={PORTFOLIO_IMAGES} />
        </Suspense>
      </section>
    </main>
  )
}
