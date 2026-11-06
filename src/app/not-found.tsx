import type { Metadata } from 'next'
import Link from 'next/link'
import { ButtonLink } from '@/components/button-link'
import { NAVIGATION } from '@/lib/navigation'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false }
}

export default function NotFound() {
  return (
    <main className='mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center'>
      <p className='text-lg font-semibold text-neutral-600'>404</p>
      <h1 className='mt-2 text-4xl font-bold tracking-tight text-black'>Página no encontrada</h1>
      <p className='mt-6 text-lg font-extralight text-gray-600'>
        La página que buscás no existe o cambió de dirección. Podés seguir por acá:
      </p>
      <ul className='mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2'>
        {NAVIGATION.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className='text-lg text-gray-700 underline underline-offset-4 hover:text-black'>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonLink variant='secondary' href='/'>
        Volver al inicio
      </ButtonLink>
    </main>
  )
}
