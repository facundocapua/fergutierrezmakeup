import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const ROUTES: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/servicios', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/servicios/social', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/servicios/novias', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/servicios/cejas', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/clases', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' }
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    changeFrequency,
    priority
  }))
}
