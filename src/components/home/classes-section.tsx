import classPortrait from '@public/courses/1.jpg'
import Image from 'next/image'
import { CLASSES } from '@/data/classes'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { ActionLink } from '@/components/action-link'

const SUMMARIES = [
  'Todos los pasos para lograr un maquillaje según tu estilo y la forma de tu rostro.',
  'Eliges el tema que quieres profundizar y afianzamos tus técnicas para que ganes confianza.'
]

export function ClassesSection() {
  return (
    <section id='clases' className='scroll-mt-4 bg-labial text-paper'>
      <div className='mx-auto grid max-w-[1680px] lg:grid-cols-12'>
        <div className='@container relative lg:col-span-5'>
          <Image
            src={classPortrait}
            alt='Alumna aplicándose labial rojo con un espejo de mano durante una clase de automaquillaje'
            sizes='(min-width: 1680px) 700px, (min-width: 1024px) 42vw, 100vw'
            className='h-full w-full object-cover'
          />
          <p className='absolute top-[83%] left-[7%] w-[46%] font-hand text-[7.4cqw] leading-none text-ink'>
            Te ayudo a armar tu kit.
          </p>
          <svg aria-hidden='true' viewBox='0 0 300 400' className='absolute inset-0 h-full w-full text-labial'>
            <path
              d='M112 330 C 130 290, 152 255, 186 222'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.75'
              vectorEffect='non-scaling-stroke'
              strokeLinecap='round'
            />
            <circle cx='186' cy='222' r='2.6' fill='currentColor' />
          </svg>
        </div>

        <div className='px-4 py-14 sm:px-8 lg:col-span-7 lg:px-16 lg:py-24'>
          <h2 className='text-5xl leading-none font-bold tracking-tight text-balance [font-stretch:80%] sm:text-7xl'>
            Aprende a hacerlo tú.
          </h2>
          <p className='mt-6 max-w-xl text-xl'>
            Clases personalizadas, presenciales en mi estudio o online. Tomas las que quieras y vemos los temas que
            necesites.
          </p>

          <ul className='mt-12 border-t border-paper/40'>
            {CLASSES.map((makeupClass, index) => (
              <li
                key={makeupClass.name}
                className='grid gap-x-10 gap-y-4 border-b border-paper/40 py-8 md:grid-cols-[minmax(0,1fr)_auto]'
              >
                <div>
                  <h3 className='text-3xl font-semibold tracking-tight'>{makeupClass.name}</h3>
                  <p className='mt-1 font-medium'>
                    {makeupClass.sessions} {makeupClass.sessions === 1 ? 'clase' : 'clases'} de{' '}
                    {makeupClass.durationMinutes} minutos
                  </p>
                  <p className='mt-4 max-w-lg'>{SUMMARIES[index]}</p>
                  {makeupClass.topics ? (
                    <ol className='mt-4 grid max-w-lg gap-x-6 gap-y-1 sm:grid-cols-2'>
                      {makeupClass.topics.map((topic) => (
                        <li key={topic} className='font-medium'>
                          {topic}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
                <ActionLink
                  href={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, makeupClass.whatsAppMessage)}
                  external
                  variant='paper'
                  className='self-start'
                >
                  Consultar
                </ActionLink>
              </li>
            ))}
          </ul>

          <ActionLink href='/clases' variant='line' className='mt-8'>
            Ver las clases en detalle
          </ActionLink>
        </div>
      </div>
    </section>
  )
}
