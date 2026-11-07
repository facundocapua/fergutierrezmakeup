import browPhoto from '@public/services/3.jpg'
import socialPhoto from '@public/services/social/4.webp'
import Image from 'next/image'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { BROW_DESIGN_WHATSAPP_MESSAGE, EVENT_MAKEUP_OPTION } from '@/data/services'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { ActionLink } from '@/components/action-link'

const { whatsapp } = CONTACT_DETAILS.socialNetworks

export function OccasionsSection() {
  return (
    <section className='bg-paper px-4 py-14 text-ink sm:px-8 lg:px-16 lg:py-24'>
      <div className='mx-auto max-w-[1548px]'>
        <h2 className='max-w-4xl text-5xl leading-none font-bold tracking-tight text-balance [font-stretch:80%] sm:text-7xl'>
          Para un evento, o para tus cejas.
        </h2>

        <div className='mt-12 grid gap-y-12 md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-x-8 md:gap-y-0'>
          <article className='md:col-span-7 md:row-span-2 md:grid md:grid-rows-subgrid'>
            <div className='relative aspect-[5/4] self-end overflow-hidden'>
              <Image
                src={socialPhoto}
                alt='Maquillaje de evento con delineado, piel luminosa y labios rojos'
                fill
                sizes='(min-width: 768px) 58vw, 100vw'
                className='object-cover object-[50%_24%]'
              />
            </div>
            <div className='mt-5 flex flex-wrap items-start justify-between gap-4'>
              <div>
                <h3 className='text-3xl font-semibold tracking-tight'>Maquillaje social</h3>
                <p className='mt-1 max-w-md'>
                  Invitadas, bautizos, cumpleaños y fiestas. Larga duración, en {EVENT_MAKEUP_OPTION.durationMinutes}{' '}
                  minutos.
                </p>
              </div>
              <ActionLink href={buildWhatsAppLink(whatsapp, EVENT_MAKEUP_OPTION.whatsAppMessage)} external>
                Reservar
              </ActionLink>
            </div>
          </article>

          <article className='md:col-span-5 md:row-span-2 md:grid md:grid-rows-subgrid'>
            <div className='relative aspect-square self-end overflow-hidden'>
              <Image
                src={browPhoto}
                alt='Ojo con ceja perfilada y delineado, en blanco y negro'
                fill
                sizes='(min-width: 768px) 42vw, 100vw'
                className='object-cover'
              />
            </div>
            <div className='mt-5 flex flex-wrap items-start justify-between gap-4'>
              <div>
                <h3 className='text-3xl font-semibold tracking-tight'>Diseño de cejas</h3>
                <p className='mt-1 max-w-sm'>Diseño y perfilado para realzar tu belleza natural.</p>
              </div>
              <ActionLink href={buildWhatsAppLink(whatsapp, BROW_DESIGN_WHATSAPP_MESSAGE)} external>
                Reservar
              </ActionLink>
            </div>
          </article>
        </div>

        <p className='mt-12 max-w-2xl border-t border-ink/30 pt-5 text-graphite'>
          Los servicios pueden ser en el estudio o a domicilio, con distintos honorarios. Para reservar se pide una seña
          del 50%, y así queda tu lugar reservado.
        </p>
      </div>
    </section>
  )
}
