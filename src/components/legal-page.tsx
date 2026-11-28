import type { ReactNode } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionTitle } from '@/components/section-title'
import { LEGAL_LAST_UPDATED, LEGAL_OWNER } from '@/data/legal'

type Props = {
  title: string
  path: string
  children: ReactNode
}

/** Shared layout of the legal notice and the privacy policy: long-form text set for reading. */
export function LegalPage({ title, path, children }: Props) {
  if (!LEGAL_OWNER.name || !LEGAL_OWNER.taxId) {
    throw new Error('LEGAL_OWNER in src/data/legal.ts needs the name and NIF/NIE before the legal pages can ship')
  }
  return (
    <main className='mt-4 mb-16 w-full px-4'>
      <div className='mx-auto mb-4 max-w-7xl'>
        <Breadcrumb pages={[{ name: title, href: path, current: true }]} />
      </div>
      <SectionTitle>{title}</SectionTitle>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-[68ch] text-base leading-relaxed text-gray-700 [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_li]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6'>
          {children}
          <p className='mt-10 text-sm text-gray-500'>Última actualización: {LEGAL_LAST_UPDATED}.</p>
        </div>
      </div>
    </main>
  )
}
