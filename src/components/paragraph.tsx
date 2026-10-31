import type { ReactNode } from 'react'

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className='mb-4 text-lg font-extralight break-words text-gray-600'>{children}</p>
}
