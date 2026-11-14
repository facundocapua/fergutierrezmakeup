import { BookingDetails } from '@/components/booking-details'
import { ButtonLink } from '@/components/button-link'
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import type { SocialMakeupOption as Option } from '@/data/services'

type Props = Omit<Option, 'whatsAppMessage'> & {
  bookingHref: string
  align?: 'left' | 'right'
  /** Whether this option holds the page's largest above-the-fold images. */
  isLcp?: boolean
}

export function SocialMakeupOption({
  name,
  subtitle,
  image,
  secondaryImage,
  durationMinutes,
  description,
  bookingHref,
  align = 'left',
  isLcp = false
}: Props) {
  return (
    <article className='relative'>
      <div
        className={clsx('relative h-[400px] overflow-hidden rounded-lg lg:absolute lg:h-full lg:w-[56%]', {
          'lg:right-0': align === 'right'
        })}
      >
        <div className='absolute inset-0 flex'>
          {[image, secondaryImage].map((src) => (
            <div key={src} className='relative h-full w-1/2'>
              <Image
                alt={name}
                src={src}
                className='h-full w-full object-cover object-[50%_20%]'
                fill
                sizes='(min-width: 1280px) 360px, (min-width: 1024px) 28vw, 50vw'
                loading={isLcp ? 'eager' : undefined}
                fetchPriority={isLcp ? 'high' : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:pt-32'>
        <div
          className={clsx('lg:col-span-5', {
            'lg:col-start-8': align === 'left',
            'lg:col-start-1': align === 'right'
          })}
        >
          <p className='font-medium text-gray-500'>{subtitle}</p>
          <h2 className='mt-4 text-4xl font-semibold tracking-tight text-gray-900'>{name}</h2>

          <div className='my-4 flex items-center gap-2'>
            <ClockIcon className='h-6 w-6' />
            <span className='text-lg font-light'>
              Duración: <span className='font-semibold'>{durationMinutes}</span> <small>minutos</small>
            </span>
          </div>

          {description.map((line) => (
            <div key={line} className='my-3 flex items-center gap-2'>
              <div className='w-6'>
                <CheckIcon className='h-6 w-6 text-black' />
              </div>
              <p className='text-md max-w-[calc(100%-24px)] text-left text-lg'>{line}</p>
            </div>
          ))}

          <div>
            <ButtonLink href={bookingHref} aria-label={`Reservar ${name} por WhatsApp`}>
              Reservar
            </ButtonLink>
          </div>
          <BookingDetails
            where='En el estudio o a domicilio, con distintos honorarios'
            bookingHref={bookingHref}
            bookingLabel={`Reservar ${name}`}
          />
        </div>
      </div>
    </article>
  )
}
