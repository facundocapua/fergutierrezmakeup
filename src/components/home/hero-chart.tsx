import browSwatch from '@public/home/swatches/cejas.webp'
import labiosSwatch from '@public/home/swatches/labios.webp'
import lidSwatch from '@public/home/swatches/ojos.webp'
import skinSwatch from '@public/home/swatches/piel.webp'
import heroPortrait from '@public/services/1.jpg'
import clsx from 'clsx'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import type { CSSProperties } from 'react'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { MAKEUP_BOOKING_WHATSAPP_MESSAGE } from '@/data/services'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { ActionLink } from '@/components/action-link'

/** The notes are drafts based on what the photo shows, pending the Artist's review. */
/** Left edge of the photo in the 1440-wide stage the leader coordinates are drawn on. */
const PHOTO_STAGE_LEFT = 463

const NOTES = [
  {
    id: 'ojos',
    text: 'Párpado luminoso y pestañas bien definidas.',
    swatch: lidSwatch,
    smear: 'M2 18 C 2 8, 15 3, 28 4 C 40 5, 54 6, 54 15 C 54 25, 42 28, 30 29 C 17 30, 2 28, 2 18 Z',
    position: 'lg:left-[3.3%] lg:top-[53%]',
    zone: { cx: 224, cy: 222, rx: 72, ry: 36 },
    leader: 'M436 482 C 520 450, 620 330, 672 213',
    dot: { x: 672, y: 213 }
  },
  {
    id: 'labios',
    text: 'Perfilados, con brillo y en tono rosado.',
    swatch: labiosSwatch,
    smear: 'M1 15 C 1 7, 14 6, 27 5 C 40 4, 55 6, 54 16 C 53 26, 38 28, 26 29 C 13 30, 1 24, 1 15 Z',
    position: 'lg:left-[3.3%] lg:top-[75%]',
    zone: { cx: 296, cy: 400, rx: 86, ry: 44 },
    leader: 'M436 656 C 530 650, 660 560, 734 404',
    dot: { x: 734, y: 404 }
  },
  {
    id: 'cejas',
    text: 'Peinadas, respetando su forma natural.',
    swatch: browSwatch,
    smear: 'M3 14 C 4 6, 20 5, 33 3 C 45 1, 55 9, 54 18 C 53 27, 34 26, 22 29 C 11 31, 2 23, 3 14 Z',
    position: 'lg:left-[70.5%] lg:top-[53%]',
    zone: { cx: 380, cy: 178, rx: 78, ry: 28 },
    leader: 'M1006 482 C 985 400, 950 280, 888 188',
    dot: { x: 888, y: 188 }
  },
  {
    id: 'piel',
    text: 'Piel ligera: se siguen viendo las pecas.',
    swatch: skinSwatch,
    smear: 'M2 16 C 2 6, 16 2, 29 3 C 41 4, 55 5, 55 16 C 55 27, 40 29, 28 30 C 15 31, 2 27, 2 16 Z',
    position: 'lg:left-[70.5%] lg:top-[75%]',
    zone: { cx: 416, cy: 312, rx: 54, ry: 58 },
    leader: 'M1006 656 C 985 570, 945 450, 886 322',
    dot: { x: 886, y: 322 }
  }
]

/** An ellipse with the slightly overshot closing stroke of a hand-drawn circle. */
function sketchEllipse({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  const k = 0.56
  return [
    `M${cx - rx * 0.92} ${cy - ry * 0.3}`,
    `C${cx - rx * 0.7} ${cy - ry * 1.05}, ${cx + rx * k} ${cy - ry * 1.12}, ${cx + rx} ${cy - ry * 0.1}`,
    `C${cx + rx * 1.06} ${cy + ry * 0.75}, ${cx - rx * k} ${cy + ry * 1.12}, ${cx - rx * 1.02} ${cy + ry * 0.12}`,
    `C${cx - rx * 1.05} ${cy - ry * 0.45}, ${cx - rx * 0.4} ${cy - ry * 0.98}, ${cx + rx * 0.2} ${cy - ry * 1.04}`
  ].join(' ')
}

/** A smear of the real tone, sampled from the marked feature in the photo. */
function Swatch({ image, smear }: { image: StaticImageData; smear: string }) {
  return (
    <span aria-hidden='true' className='relative h-8 w-14 shrink-0' style={{ clipPath: `path('${smear}')` }}>
      <Image src={image} alt='' fill sizes='56px' className='object-cover' />
    </span>
  )
}

export function HeroChart() {
  return (
    <section className='face-chart bg-paper text-ink'>
      <div className='@container relative mx-auto max-w-[1680px] px-4 pt-8 sm:px-8 lg:aspect-[1440/820] lg:px-0 lg:pt-0'>
        <div className='grid sm:grid-cols-2 sm:gap-x-8 lg:contents'>
          <h1 className='contents text-[15.5vw] leading-[0.95] font-bold tracking-tight [font-stretch:75%] sm:text-[8.5vw] lg:text-[5.9cqw]'>
            <span className='block sm:col-start-1 sm:row-start-1 lg:absolute lg:top-[6%] lg:left-[3.3%]'>
              Te maquillo.
            </span>{' '}
            <span className='row-start-3 mt-8 block text-labial sm:col-start-2 sm:row-start-1 sm:mt-0 lg:absolute lg:top-[6%] lg:left-[70.5%]'>
              Te enseño.
            </span>
          </h1>

          <div className='row-start-2 mt-3 sm:col-start-1 lg:absolute lg:top-[20%] lg:left-[3.3%] lg:mt-0 lg:w-[26%]'>
            <p className='max-w-md sm:text-lg lg:text-[max(15px,1.25cqw)] lg:leading-snug'>
              Maquillaje social, de novias y diseño de cejas, en mi estudio de Benalmádena o a domicilio.
            </p>
            <ActionLink
              href={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, MAKEUP_BOOKING_WHATSAPP_MESSAGE)}
              external
              className='mt-3 lg:mt-4'
            >
              Reservar por WhatsApp
            </ActionLink>
          </div>

          <div className='row-start-4 mt-3 sm:col-start-2 sm:row-start-2 lg:absolute lg:top-[20%] lg:left-[70.5%] lg:mt-0 lg:w-[26%]'>
            <p className='max-w-md sm:text-lg lg:text-[max(15px,1.25cqw)] lg:leading-snug'>
              Clases de automaquillaje y perfeccionamiento, presenciales u online.
            </p>
            <ActionLink href='#clases' variant='labial' className='mt-3 lg:mt-4'>
              Quiero aprender
            </ActionLink>
          </div>
        </div>

        <div className='relative mt-6 aspect-[514/820] overflow-hidden lg:absolute lg:top-0 lg:left-[32.15%] lg:mt-0 lg:h-full lg:w-[35.7%]'>
          <Image
            src={heroPortrait}
            alt='Novia con maquillaje natural: piel luminosa, cejas peinadas y labios rosados con brillo'
            loading='eager'
            fetchPriority='high'
            sizes='(min-width: 1680px) 720px, (min-width: 1024px) 43vw, 120vw'
            className='absolute top-[-8.67%] left-[-12.8%] h-auto w-[119.7%] max-w-none'
          />
          <svg
            aria-hidden='true'
            viewBox='0 0 514 820'
            className='absolute inset-0 h-full w-full'
            preserveAspectRatio='xMidYMid meet'
          >
            {NOTES.map((note) => (
              <path
                key={note.id}
                d={sketchEllipse(note.zone)}
                pathLength={1}
                className={`pencil-zone mark-${note.id}`}
              />
            ))}
          </svg>
          <ol aria-hidden='true' className='lg:hidden'>
            {NOTES.map((note, index) => (
              <li
                key={note.id}
                className={`pencil-pin mark-${note.id} absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-labial text-xs font-semibold text-paper`}
                style={{
                  left: `${((note.dot.x - PHOTO_STAGE_LEFT) / 514) * 100}%`,
                  top: `${(note.dot.y / 820) * 100}%`
                }}
              >
                {index + 1}
              </li>
            ))}
          </ol>
        </div>

        <svg
          aria-hidden='true'
          viewBox='0 0 1440 820'
          className='pointer-events-none absolute inset-0 hidden h-full w-full lg:block'
        >
          {NOTES.map((note, index) => (
            <g key={note.id}>
              <path
                d={note.leader}
                pathLength={1}
                className={`pencil-line mark-${note.id}`}
                style={{ '--draw-delay': `${index * 180}ms` } as CSSProperties}
              />
              <circle cx={note.dot.x} cy={note.dot.y} r='4' className={`pencil-dot mark-${note.id}`} />
            </g>
          ))}
        </svg>

        <fieldset className='mt-6 pb-10 lg:contents'>
          <legend className='sr-only'>Marcar en la foto cada detalle del maquillaje</legend>
          <ol className='grid gap-1 sm:grid-cols-2 lg:contents'>
            {NOTES.map((note, index) => (
              <li key={note.id} className={clsx('lg:absolute lg:w-[26%]', note.position)}>
                <label
                  id={`nota-${note.id}`}
                  className='chart-note flex w-full cursor-pointer items-center gap-3 py-1 has-checked:text-labial has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-labial'
                >
                  <input type='checkbox' className='sr-only' />
                  <span
                    aria-hidden='true'
                    className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-labial text-xs font-semibold text-paper lg:hidden'
                  >
                    {index + 1}
                  </span>
                  <Swatch image={note.swatch} smear={note.smear} />
                  <span className='font-hand text-[2rem] leading-[0.95] lg:text-[max(26px,2.45cqw)]'>{note.text}</span>
                </label>
              </li>
            ))}
          </ol>
        </fieldset>
      </div>
    </section>
  )
}
