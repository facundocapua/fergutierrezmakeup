import Link from 'next/link'
import { LogoImage } from './logo-image'

export function Logo() {
  return (
    <Link
      href='/'
      className='rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
    >
      <span className='sr-only'>Fernanda Gutierrez</span>
      <LogoImage className='w-[250px]' />
    </Link>
  )
}
