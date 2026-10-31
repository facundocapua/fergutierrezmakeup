import clsx from 'clsx'
import Image from 'next/image'
import { getReviews, type Review } from '@/lib/google-reviews'
import { RatingStars } from '../rating-stars'

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className='mx-2 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 md:mx-0'>
      <blockquote className='text-gray-900'>
        <p>{`“${review.text}”`}</p>
      </blockquote>
      <figcaption className='mt-6 flex items-center gap-x-4'>
        {review.authorPhotoUrl ? (
          <Image
            alt=''
            src={review.authorPhotoUrl}
            className='h-10 w-10 rounded-full bg-gray-50'
            width={40}
            height={40}
          />
        ) : null}
        <div className='flex-auto'>
          <div className='font-semibold'>{review.authorName}</div>
        </div>
        <RatingStars rating={review.rating} className='flex md:hidden' />
      </figcaption>
    </figure>
  )
}

export async function Reviews() {
  const [featured, ...others] = await getReviews()
  if (!featured) return null

  // Two groups of two columns, one Review per column, laid out around the featured Review.
  const columnGroups = [
    [others.slice(0, 1), others.slice(1, 2)],
    [others.slice(2, 3), others.slice(3, 4)]
  ]

  return (
    <div className='relative isolate bg-white pt-12 pb-12'>
      <div className='mx-auto max-w-7xl lg:px-8'>
        <div className='mx-auto max-w-xl text-center'>
          <h2 className='text-lg leading-8 font-semibold tracking-tight text-neutral-600'>Reseñas</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Lo que opinan mis clientas</p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-12 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4'>
          <figure className='mx-2 rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 md:mx-0 xl:col-start-2 xl:row-end-1'>
            <blockquote className='p-6 text-lg leading-7 font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8'>
              <p>{`“${featured.text}”`}</p>
            </blockquote>
            <figcaption className='flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap'>
              {featured.authorPhotoUrl ? (
                <Image
                  alt=''
                  src={featured.authorPhotoUrl}
                  className='h-10 w-10 flex-none rounded-full bg-gray-50'
                  width={40}
                  height={40}
                />
              ) : null}
              <div className='flex-auto'>
                <div className='font-semibold'>{featured.authorName}</div>
              </div>
              <RatingStars rating={featured.rating} />
            </figcaption>
          </figure>
          {columnGroups.map((columnGroup, columnGroupIdx) => (
            <div key={columnGroupIdx} className='space-y-8 xl:contents xl:space-y-0'>
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={clsx(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === columnGroups.length - 1 && columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8'
                  )}
                >
                  {column.map((review) => (
                    <ReviewCard key={review.authorUrl} review={review} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
