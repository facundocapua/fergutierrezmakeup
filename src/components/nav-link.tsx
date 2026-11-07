import clsx from 'clsx'
import Link from 'next/link'

type Props = {
  href: string
  name: string
  active?: boolean
}

export function NavLink({ href, name, active = false }: Props) {
  return (
    <Link
      href={href}
      className='group flex flex-col items-center uppercase transition-all duration-150 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink'
    >
      <span
        className={clsx('text-base font-medium tracking-wide select-none', {
          'text-ink transition-all duration-200': !active,
          'text-ink': active
        })}
      >
        {name}
      </span>
      <div
        className={clsx({
          'h-0.5 w-0 bg-labial transition-all duration-200 group-hover:w-full': !active,
          'h-0.5 w-full bg-labial': active
        })}
      ></div>
    </Link>
  )
}
