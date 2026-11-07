import type { Metadata } from 'next'
import { SITE_LOCALE, SITE_NAME } from './site'

/** The route of `src/app/opengraph-image.jpg`, which a page's own `openGraph` doesn't inherit. */
const OPEN_GRAPH_IMAGE = {
  url: '/opengraph-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Fer Gutierrez MakeUp, maquilladora profesional en Benalmádena'
}

type PageMetadata = {
  /** Page title. Rendered with the site name, as "title | site name". */
  title: string
  description: string
  path: string
}

/** Metadata of a page. A page's `openGraph` replaces the root layout's, so it is always built whole. */
export function buildPageMetadata({ title, description, path }: PageMetadata): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: 'website',
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      images: [OPEN_GRAPH_IMAGE]
    }
  }
}
