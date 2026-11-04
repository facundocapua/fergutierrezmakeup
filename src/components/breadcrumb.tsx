import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { buildBreadcrumbStructuredData, toJsonLd } from '@/lib/structured-data'

export type BreadcrumbPage = {
  name: string
  href: string
  current?: boolean
}

export function Breadcrumb({ pages }: { pages: BreadcrumbPage[] }) {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: toJsonLd(buildBreadcrumbStructuredData(pages)) }}
      />
      <ol role='list' className='flex items-center space-x-4'>
        <li>
          <div>
            <Link href='/' className='text-gray-400 hover:text-gray-500'>
              <HomeIcon className='h-5 w-5 shrink-0' aria-hidden='true' />
              <span className='sr-only'>Inicio</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className='flex items-center'>
              <ChevronRightIcon className='h-5 w-5 shrink-0 text-gray-400' aria-hidden='true' />
              {page.current ? (
                <span className='ml-4 text-sm font-medium text-gray-500' aria-current='page'>
                  {page.name}
                </span>
              ) : (
                <Link href={page.href} className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
                  {page.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
