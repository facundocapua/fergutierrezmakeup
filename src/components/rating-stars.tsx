import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarFilledIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

type Props = {
  rating: number
  className?: string
}

export function RatingStars({ rating, className }: Props) {
  return (
    <div className={twMerge('flex gap-x-1 text-primary-600', className)}>
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? (
          <StarFilledIcon key={i} aria-hidden='true' className='h-5 w-5 flex-none' />
        ) : (
          <StarIcon key={i} aria-hidden='true' className='h-5 w-5 flex-none' />
        )
      )}
    </div>
  )
}
