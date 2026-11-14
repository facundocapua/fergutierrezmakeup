import Link from 'next/link'
import { CONTACT_DETAILS } from '@/data/contact-details'

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAY_NAMES = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

/** "lunes a sábado" for a run of consecutive days, otherwise "lunes, miércoles y viernes". */
const formatDays = (days: string[]): string => {
  const indexes = days.map((day) => WEEK.indexOf(day)).sort((a, b) => a - b)
  const names = indexes.map((index) => DAY_NAMES[index])
  const isRun = indexes.every((index, i) => i === 0 || index === indexes[i - 1]! + 1)
  if (isRun && names.length > 2) return `${names[0]} a ${names.at(-1)}`
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} y ${names.at(-1)}` : (names[0] ?? '')
}

const { phone, address, city, state, openingHours } = CONTACT_DETAILS
const days = formatDays(openingHours.days)
const schedule = `De ${days} de ${openingHours.opens} a ${openingHours.closes} h`

type Props = {
  /** Where the Service or Class happens, e.g. "En el estudio o a domicilio". */
  where: string
  /** WhatsApp link for this Service or Class. */
  bookingHref: string
  /** Accessible name of the phone link, naming what it books. */
  bookingLabel: string
}

/**
 * The practical facts of a Service or Class as plain text: where, when and how to book.
 * People skim it, and AI assistants and agents read it without running JavaScript
 * (docs/research/llm-agents.md, O4).
 */
export function BookingDetails({ where, bookingHref, bookingLabel }: Props) {
  return (
    <dl className='mt-10 grid grid-cols-1 gap-x-6 gap-y-1 border-t border-gray-300 pt-6 text-gray-700 sm:grid-cols-[auto_1fr] sm:gap-y-3'>
      <dt className='font-semibold text-gray-900'>Dónde</dt>
      <dd className='mb-3 sm:mb-0'>
        {where}. Estudio en {address}, {city} ({state}).
      </dd>
      <dt className='font-semibold text-gray-900'>Horario</dt>
      <dd className='mb-3 sm:mb-0'>{schedule}.</dd>
      <dt className='font-semibold text-gray-900'>Reservas</dt>
      <dd>
        Por WhatsApp al{' '}
        <Link
          href={bookingHref}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${bookingLabel} por WhatsApp al ${phone}`}
          className='rounded-sm font-semibold whitespace-nowrap text-gray-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black'
        >
          {phone}
        </Link>
        .
      </dd>
    </dl>
  )
}
