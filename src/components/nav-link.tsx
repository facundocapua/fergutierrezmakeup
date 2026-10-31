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
      className='group flex flex-col items-center uppercase transition-all duration-150 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
    >
      <span
        className={clsx('text-lg font-medium select-none', {
          'text-gray-100 transition-all duration-200 group-hover:text-black': !active,
          'text-black': active
        })}
      >
        {name}
      </span>
      <div
        className={clsx({
          'h-0.5 w-0 bg-black transition-all duration-200 group-hover:w-full': !active,
          'h-0.5 w-full bg-black': active
        })}
      ></div>
    </Link>
  )
}
