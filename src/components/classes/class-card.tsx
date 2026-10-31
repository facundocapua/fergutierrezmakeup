import { BookOpenIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import type { MakeupClass } from '@/data/classes'

type Props = Omit<MakeupClass, 'whatsAppMessage'> & {
  enquiryHref: string
}

export function ClassCard({ name, description, topics, sessions, durationMinutes, image, enquiryHref }: Props) {
  return (
    <a
      href={enquiryHref}
      target='_blank'
      rel='noopener noreferrer'
      className='flex cursor-pointer flex-col rounded-t-lg bg-gray-200 transition-all duration-500 hover:-translate-y-4'
    >
      <div className='relative h-[300px] w-full'>
        <Image
          alt={name}
          src={image}
          className='rounded-t-lg object-cover'
          fill
          sizes='(min-width: 1024px) 620px, 512px'
        />
      </div>
      <div className='flex grow flex-col justify-between gap-4 p-4'>
        <h3 className='text-center text-2xl font-light'>{name}</h3>

        <div className='grow border-b border-b-gray-400 py-4'>
          {description.map((line) => (
            <p className='text-md text-left' key={line}>
              {line}
            </p>
          ))}

          {topics ? (
            <ol>
              {topics.map((topic) => (
                <li className='text-md my-1 flex items-center gap-2' key={topic}>
                  <CheckIcon className='h-4 w-4 text-rose-700' />
                  {topic}
                </li>
              ))}
            </ol>
          ) : null}
        </div>

        <div className='flex justify-around border-b border-b-gray-400 py-3'>
          <div className='flex items-center justify-center gap-2'>
            <BookOpenIcon className='h-6 w-6' />
            <span className='text-lg font-light'>
              <span className='font-semibold'>{sessions}</span> <small>{sessions === 1 ? 'clase' : 'clases'}</small>
            </span>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <ClockIcon className='h-6 w-6' />
            <span className='text-lg font-light'>
              <span className='font-semibold'>{durationMinutes}</span> <small>min (por clase)</small>
            </span>
          </div>
        </div>

        <span className='mt-6 inline-block w-full rounded-md bg-black px-8 py-2 text-center text-xl text-white uppercase'>
          Consultar
        </span>
      </div>
    </a>
  )
}
