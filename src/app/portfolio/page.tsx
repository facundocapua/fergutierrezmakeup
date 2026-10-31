import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import { PortfolioLightbox } from '@/components/portfolio/portfolio-lightbox'
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
        <PortfolioGrid images={PORTFOLIO_IMAGES} />
        {/* The lightbox reads the URL, which is only known in the browser on a static page. */}
        <Suspense fallback={null}>
          <PortfolioLightbox images={PORTFOLIO_IMAGES} />
        </Suspense>
      </section>
    </main>
  )
}
