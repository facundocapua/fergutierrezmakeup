import { toJsonLd } from '@/lib/structured-data'

/** Renders schema.org data as an inline JSON-LD script. */
export function JsonLd({ data }: { data: object }) {
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: toJsonLd(data) }} />
}
