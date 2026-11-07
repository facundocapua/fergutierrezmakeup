import Link from 'next/link'
import { LogoImage } from './logo-image'

export function Logo({ className }: { className?: string }) {
  return (
    <Link href='/' className='focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current'>
      <span className='sr-only'>Fernanda Gutierrez</span>
      <LogoImage className={className ?? 'w-[190px]'} />
    </Link>
  )
}
