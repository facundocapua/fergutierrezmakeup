import bridalPhoto from '@public/services/5.webp'
import Image from 'next/image'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { BRIDAL_MAKEUP_WHATSAPP_MESSAGE } from '@/data/services'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { ActionLink } from '@/components/action-link'

const STEPS = [
  { title: 'La entrevista', text: 'Nos conocemos en persona y vemos qué estilo de maquillaje te gusta.' },
  {
    title: 'La prueba',
    text: 'Hacemos una prueba de maquillaje con tus ideas, mis consejos y lo que hablamos en la cita.'
  },
  {
    title: 'El día de la boda',
    text: 'Te maquillo en mi estudio o en el lugar que elijas. A domicilio tiene un coste adicional.'
  }
]

export function BridalSection() {
  return (
    <section className='bg-beige text-ink'>
      <div className='mx-auto grid max-w-[1680px] lg:grid-cols-12'>
        <div className='order-2 px-4 py-14 sm:px-8 lg:order-1 lg:col-span-7 lg:px-16 lg:py-24'>
          <h2 className='text-5xl leading-none font-bold tracking-tight text-balance [font-stretch:80%] sm:text-7xl'>
            Tu boda, paso a paso.
          </h2>
          <p className='mt-6 max-w-xl text-xl'>
            Me gustaría ser parte de tu día especial y que juntas creemos tu maquillaje.
          </p>

          <ol className='mt-12 border-t border-ink/30'>
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className='grid grid-cols-[3rem_1fr] border-b border-ink/30 py-6 md:grid-cols-[4rem_16rem_1fr]'
              >
                <span className='font-hand text-4xl leading-none text-dorado-hondo'>{index + 1}</span>
                <h3 className='text-2xl font-semibold tracking-tight'>{step.title}</h3>
                <p className='col-start-2 mt-2 max-w-md md:col-start-3 md:mt-0'>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className='mt-8 flex flex-wrap items-center gap-x-8 gap-y-4'>
            <ActionLink
              href={buildWhatsAppLink(CONTACT_DETAILS.socialNetworks.whatsapp, BRIDAL_MAKEUP_WHATSAPP_MESSAGE)}
              external
            >
              Pedir presupuesto
            </ActionLink>
            <ActionLink href='/servicios/novias' variant='line'>
              Ver más sobre novias
            </ActionLink>
          </div>
        </div>

        <div className='relative order-1 aspect-[4/5] sm:aspect-square lg:order-2 lg:col-span-5 lg:aspect-auto'>
          <Image
            src={bridalPhoto}
            alt='Fernanda perfila los labios de una novia con vestido blanco bordado'
            fill
            sizes='(min-width: 1680px) 700px, (min-width: 1024px) 42vw, 100vw'
            className='object-cover object-[50%_25%]'
          />
        </div>
      </div>
    </section>
  )
}
