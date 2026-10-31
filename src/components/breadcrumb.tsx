import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export type BreadcrumbPage = {
  name: string
  href: string
  current?: boolean
}

export function Breadcrumb({ pages }: { pages: BreadcrumbPage[] }) {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol role='list' className='flex items-center space-x-4' vocab='https://schema.org/' typeof='BreadcrumbList'>
        <li>
          <div>
            <Link href='/' className='text-gray-400 hover:text-gray-500'>
              <HomeIcon className='h-5 w-5 shrink-0' aria-hidden='true' />
              <span className='sr-only'>Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page, index) => (
          <li key={page.name} property='itemListElement' typeof='ListItem'>
            <meta property='position' content={String(index + 1)}></meta>
            <div className='flex items-center'>
              <ChevronRightIcon className='h-5 w-5 shrink-0 text-gray-400' aria-hidden='true' />
              {page.current ? (
                <span className='ml-4 text-sm font-medium text-gray-500' property='name' aria-current='page'>
                  {page.name}
                </span>
              ) : (
                <Link
                  href={page.href}
                  className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'
                  property='item'
                  typeof='WebPage'
                >
                  <span property='name'>{page.name}</span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
