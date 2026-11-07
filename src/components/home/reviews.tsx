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
    <Image alt='' src={review.authorPhotoUrl} className='h-9 w-9 rounded-full bg-rubor' width={40} height={40} />
  ) : null

  return (
    <div className='flex items-center gap-x-3'>
      {review.authorUrl ? (
        <a
          href={review.authorUrl}
          target='_blank'
          rel='noreferrer nofollow'
          className='flex items-center gap-x-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
        >
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

const FEATURED_REVIEW_MAX_LENGTH = 520
const REVIEW_MAX_LENGTH = 340

/** Shortens a long review at the end of a sentence, or of a word if none fits; the full text stays on Google Maps. */
function excerptReview(text: string, maxLength: number) {
  const unquoted = text.replace(/^["“”«»\s]+|["“”«»\s]+$/g, '')
  if (unquoted.length <= maxLength) return unquoted

  let excerpt = ''
  for (const sentence of unquoted.match(/[^.!?…]+[.!?…]+\s*/g) ?? []) {
    if (excerpt.length + sentence.length > maxLength) break
    excerpt += sentence
  }
  return excerpt.trim() || `${unquoted.slice(0, maxLength).replace(/\s+\S*$/, '')}…`
}

function ReviewEntry({ review, featured = false }: { review: Review; featured?: boolean }) {
  return (
    <figure
      className={clsx(
        'flex flex-col',
        featured
          ? 'lg:sticky lg:top-8 lg:col-span-5 lg:row-span-4 lg:self-start'
          : 'border-t border-ink/30 pt-6 lg:col-span-7'
      )}
    >
      <div className='flex items-center justify-between gap-4'>
        <RatingStars rating={review.rating} className='text-labial' />
        {review.publishedAgo ? <span className='text-sm text-graphite'>{review.publishedAgo}</span> : null}
      </div>
      <blockquote
        className={clsx(
          'mt-4',
          featured ? 'text-2xl leading-snug font-medium tracking-tight sm:text-3xl sm:leading-snug' : 'leading-relaxed'
        )}
      >
        <p>{`“${excerptReview(review.text, featured ? FEATURED_REVIEW_MAX_LENGTH : REVIEW_MAX_LENGTH)}”`}</p>
      </blockquote>
      <div className='mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm'>
        <ReviewAuthor review={review} />
        <a
          href={review.googleMapsUrl}
          target='_blank'
          rel='noreferrer nofollow'
          className='font-medium text-graphite underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
        >
          Leer en Google Maps
        </a>
      </div>
    </figure>
  )
}

export async function Reviews() {
  const googleReviews = await getGoogleReviews()
  if (!googleReviews || googleReviews.reviews.length === 0) return null

  const { rating, reviewCount, googleMapsUrl, reviews } = googleReviews

  return (
    <section className='bg-paper px-4 py-14 text-ink sm:px-8 lg:px-16 lg:py-24'>
      <div className='mx-auto max-w-[1548px]'>
        <h2 className='text-5xl leading-none font-bold tracking-tight text-balance [font-stretch:80%] sm:text-7xl'>
          Lo que opinan mis clientas.
        </h2>

        <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <a
            href={googleMapsUrl}
            target='_blank'
            rel='noreferrer nofollow'
            className='flex flex-wrap items-center gap-x-3 gap-y-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
          >
            <span className='text-2xl font-bold'>{ratingFormatter.format(rating)}</span>
            <RatingStars rating={Math.round(rating)} className='text-labial' />
            <span className='text-sm text-graphite'>{reviewCount} reseñas</span>
          </a>
          <p className='text-sm text-graphite'>
            Las reseñas más relevantes según <GoogleMapsAttribution />
          </p>
        </div>

        <div className='mt-12 grid gap-x-16 gap-y-8 lg:grid-cols-12'>
          {reviews.map((review, index) => (
            <ReviewEntry key={review.googleMapsUrl} review={review} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
