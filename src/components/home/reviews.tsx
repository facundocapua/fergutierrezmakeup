import clsx from 'clsx'
import Image from 'next/image'
import { getGoogleReviews, type Review } from '@/lib/google-reviews'
import { RatingStars } from '../rating-stars'

const ratingFormatter = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

/** Text attribution required by Google Maps Platform when showing Places content without a map. */
function GoogleMapsAttribution() {
  return (
    <span translate='no' className="font-['Roboto',sans-serif] text-sm font-normal whitespace-nowrap text-[#5E5E5E]">
      Google Maps
    </span>
  )
}

function ReviewAuthor({ review }: { review: Review }) {
  const avatar = review.authorPhotoUrl ? (
    <Image alt='' src={review.authorPhotoUrl} className='h-10 w-10 rounded-full bg-gray-50' width={40} height={40} />
  ) : null

  return (
    <div className='flex items-center gap-x-4'>
      {review.authorUrl ? (
        <a href={review.authorUrl} target='_blank' rel='noreferrer nofollow' className='flex items-center gap-x-4'>
          {avatar}
          <span className='font-semibold'>{review.authorName}</span>
        </a>
      ) : (
        <>
          {avatar}
          <span className='font-semibold'>{review.authorName}</span>
        </>
      )}
    </div>
  )
}

function ReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  return (
    <figure
      className={clsx(
        'flex flex-col rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5',
        featured && 'sm:col-span-2 sm:p-10'
      )}
    >
      <div className='flex items-center justify-between gap-4'>
        <RatingStars rating={review.rating} />
        {review.publishedAgo ? <span className='text-sm text-gray-500'>{review.publishedAgo}</span> : null}
      </div>
      <blockquote
        className={clsx(
          'mt-4 text-gray-900',
          featured
            ? 'line-clamp-6 text-lg leading-7 font-semibold tracking-tight sm:text-xl sm:leading-8'
            : 'line-clamp-8 text-sm leading-6'
        )}
      >
        <p>{`“${review.text}”`}</p>
      </blockquote>
      <a
        href={review.googleMapsUrl}
        target='_blank'
        rel='noreferrer nofollow'
        className='mt-3 mb-6 text-sm font-medium text-gray-600 underline underline-offset-2 hover:text-black'
      >
        Leer en Google Maps
      </a>
      <figcaption className='mt-auto border-t border-gray-900/10 pt-6 text-sm'>
        <ReviewAuthor review={review} />
      </figcaption>
    </figure>
  )
}

export async function Reviews() {
  const googleReviews = await getGoogleReviews()
  if (!googleReviews || googleReviews.reviews.length === 0) return null

  const { rating, reviewCount, googleMapsUrl, reviews } = googleReviews

  return (
    <section className='relative isolate py-12'>
      <div className='mx-auto max-w-7xl px-4 lg:px-8'>
        <div className='mx-auto max-w-xl text-center'>
          <h2 className='text-lg leading-8 font-semibold tracking-tight text-neutral-600'>Reseñas</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Lo que opinan mis clientas</p>
        </div>

        <div className='mt-12 flex flex-col gap-4 border-b border-gray-900/10 pb-4 sm:flex-row sm:items-center sm:justify-between'>
          <a
            href={googleMapsUrl}
            target='_blank'
            rel='noreferrer nofollow'
            className='flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-900 hover:underline'
          >
            <span className='text-2xl font-bold'>{ratingFormatter.format(rating)}</span>
            <RatingStars rating={Math.round(rating)} />
            <span className='text-sm text-gray-600'>{reviewCount} reseñas</span>
          </a>
          <p className='text-sm text-gray-600'>
            Las reseñas más relevantes según <GoogleMapsAttribution />
          </p>
        </div>

        <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {reviews.map((review, index) => (
            <ReviewCard key={review.googleMapsUrl} review={review} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
