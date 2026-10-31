import type { ReactNode } from 'react'

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <main className='mt-4 mb-4 w-full px-4'>{children}</main>
}
