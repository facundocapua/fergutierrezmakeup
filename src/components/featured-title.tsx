import type { ReactNode } from 'react'

export function FeaturedTitle({ children }: { children: ReactNode }) {
  return <h2 className='pb-8 text-center text-3xl font-light text-gray-700 uppercase'>{children}</h2>
}
