import Link from 'next/link'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const VARIANTS = {
  primary: 'bg-black text-xl',
  secondary: 'bg-neutral-700 font-extralight'
}

type Props = ComponentProps<typeof Link> & {
  variant?: keyof typeof VARIANTS
}

export function ButtonLink({ variant = 'primary', className, ...props }: Props) {
  return (
    <Link
      className={twMerge(
        'mt-6 inline-block rounded-md px-8 py-2 text-white uppercase transition-all duration-300 hover:scale-110',
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  )
}
