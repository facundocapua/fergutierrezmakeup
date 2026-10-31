import type { NextConfig } from 'next'

// Former e-commerce and orphaned routes. They are permanently redirected to the
// home page so old links and indexed URLs don't end in a 404.
// See docs/migration.md for the full list.
const REDIRECTED_TO_HOME = [
  '/sobre-mi',
  '/terminos-y-condiciones',
  '/arrepentimiento/:path*',
  '/tienda/:path*',
  '/product/:path*',
  '/brand/:path*',
  '/search/:path*',
  '/checkout/:path*',
  '/mercadopago/:path*',
  '/order/:path*',
  '/account/:path*',
  '/studio'
]

// URLs that were advertised (sitemap, canonical, breadcrumb) but never existed,
// redirected to the page they meant.
const REDIRECTED_ELSEWHERE = [
  { source: '/automaquillaje', destination: '/clases' },
  { source: '/servicios/automaquillaje', destination: '/clases' },
  { source: '/porfolio', destination: '/portfolio' }
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Reviewer profile photos returned by the Google Places API.
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' }
    ]
  },
  async redirects() {
    return [
      ...REDIRECTED_TO_HOME.map((source) => ({ source, destination: '/', statusCode: 301 as const })),
      ...REDIRECTED_ELSEWHERE.map((redirect) => ({ ...redirect, statusCode: 301 as const }))
    ]
  }
}

export default nextConfig
