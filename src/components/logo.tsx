import Link from 'next/link'
import { LogoImage } from './logo-image'

export function Logo() {
  return (
    <Link href='/' className='focus:outline-hidden'>
      <span className='sr-only'>Fernanda Gutierrez</span>
      <LogoImage className='w-[250px]' />
    </Link>
  )
}
