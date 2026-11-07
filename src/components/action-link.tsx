import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const VARIANTS = {
  ink: 'bg-ink text-paper hover:bg-graphite focus-visible:outline-ink',
  labial: 'bg-labial text-paper hover:bg-ink focus-visible:outline-labial',
  paper: 'bg-paper text-ink hover:bg-rubor focus-visible:outline-paper',
  line: 'border-b-2 border-current px-0 py-1 focus-visible:outline-current'
}

type Props = {
  children: ReactNode
  href: string
  variant?: keyof typeof VARIANTS
  /** Opens in a new tab, for WhatsApp and other sites. */
  external?: boolean
  className?: string
}

/** Square-cornered call to action of the La Ficha world. */
export function ActionLink({ children, href, variant = 'ink', external = false, className }: Props) {
  const Icon = external ? ArrowUpRightIcon : ArrowRightIcon

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={twMerge(
        'group inline-flex items-center gap-3 px-5 py-3 font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2',
        VARIANTS[variant],
        className
      )}
    >
      {children}
      <Icon
        aria-hidden='true'
        className='h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1'
        strokeWidth={2}
      />
    </Link>
  )
}
