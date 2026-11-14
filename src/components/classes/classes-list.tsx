import { CLASSES } from '@/data/classes'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { ClassCard } from './class-card'

export function ClassesList() {
  return (
    <section className='mb-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2'>
          {CLASSES.map(({ whatsAppMessage, ...makeupClass }, index) => (
            <ClassCard
              key={makeupClass.name}
              {...makeupClass}
              isLcp={index === 0}
              enquiryHref={buildWhatsAppLink(whatsAppMessage)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
