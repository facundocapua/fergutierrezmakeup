import { SERVICES } from '@/data/services'
import { ServiceCard } from './service-card'

export function ServicesGrid() {
  return (
    <section className='mx-auto my-12 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3'>
      {SERVICES.map((service, index) => (
        <ServiceCard key={service.href} {...service} isLcp={index === 0} />
      ))}
    </section>
  )
}
