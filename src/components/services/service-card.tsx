import Image from 'next/image'
import Link from 'next/link'
import type { ServiceSummary } from '@/data/services'

type Props = ServiceSummary & {
  /** Whether this card holds the page's largest above-the-fold image. */
  isLcp?: boolean
}

export function ServiceCard({ image, title, href, isLcp = false }: Props) {
  const [firstWord, ...rest] = title.split(' ')
  return (
    <Link href={href} className='cursor-pointer bg-neutral-700'>
      <div className='relative aspect-5/6 w-full overflow-hidden before:absolute before:right-4 before:bottom-4 before:h-0 before:w-0 before:border-r before:border-b before:transition-all before:duration-500 before:ease-in-out after:absolute after:top-4 after:left-4 after:h-0 after:w-0 after:border-t after:border-l after:transition-all after:duration-500 after:ease-in-out hover:before:h-[calc(100%-32px)] hover:before:w-[calc(100%-32px)] hover:after:h-[calc(100%-32px)] hover:after:w-[calc(100%-32px)]'>
        <Image
          alt={title}
          className='object-cover transition-all duration-500 ease-in-out'
          src={image}
          sizes='(min-width: 1280px) 405px, (min-width: 768px) 33vw, 100vw'
          loading={isLcp ? 'eager' : undefined}
          fetchPriority={isLcp ? 'high' : undefined}
        />
      </div>
      <h2 className='py-4 text-center text-xl font-extralight tracking-wide text-white'>
        <span>{`${firstWord} `}</span>
        <span className='font-semibold text-white'>{rest.join(' ')}</span>
      </h2>
    </Link>
  )
}
