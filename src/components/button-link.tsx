import clsx from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href: string
  className?: string
}

export function ButtonLink({ children, href, className }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        'mt-6 inline-block rounded-md bg-neutral-700 px-8 py-2 font-extralight text-white uppercase transition-all duration-300 hover:scale-110',
        className
      )}
    >
      {children}
    </Link>
  )
}
