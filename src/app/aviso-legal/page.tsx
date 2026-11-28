import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { LEGAL_OWNER } from '@/data/legal'
import { buildPageMetadata } from '@/lib/metadata'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: 'Aviso legal',
  description: 'Titular, condiciones de uso y propiedad intelectual del sitio web de Fer Gutierrez MakeUp.',
  path: '/aviso-legal'
})

const { email, phone, address, postalCode, city, state } = CONTACT_DETAILS
const siteHost = new URL(SITE_URL).host

export default function LegalNoticePage() {
  return (
    <LegalPage title='Aviso legal' path='/aviso-legal'>
      <h2>Titular del sitio web</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio
        Electrónico (LSSI-CE), se informa de que el sitio web {siteHost} es titularidad de:
      </p>
      <ul>
        <li>Titular: {LEGAL_OWNER.name}, profesional autónoma, con el nombre comercial Fer Gutierrez MakeUp.</li>
        <li>NIF: {LEGAL_OWNER.taxId}</li>
        <li>
          Domicilio: {address}, {postalCode} {city} ({state}), España.
        </li>
        <li>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>Teléfono: {phone}</li>
        <li>Actividad: servicios de maquillaje profesional y diseño de cejas, y clases de maquillaje.</li>
      </ul>

      <h2>Objeto y condiciones de uso</h2>
      <p>
        Este sitio web presenta los servicios y las clases de Fer Gutierrez MakeUp. En él no se vende ni se cobra nada:
        las reservas y consultas se hacen por WhatsApp, teléfono o email, y las condiciones de cada servicio se acuerdan
        directamente con la titular.
      </p>
      <p>
        Al navegar por el sitio aceptas usarlo de forma lícita y no realizar acciones que puedan dañarlo, impedir su
        funcionamiento o perjudicar a terceros.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, fotografías, logotipos y el diseño de este sitio son propiedad de la titular o se usan con permiso
        de sus autores. No está permitido reproducirlos, distribuirlos ni transformarlos sin autorización previa por
        escrito. Las marcas de cosmética que aparecen pertenecen a sus respectivos titulares.
      </p>

      <h2>Enlaces a otros sitios</h2>
      <p>
        El sitio enlaza a servicios de terceros, como WhatsApp, Instagram, Facebook, TikTok y Google Maps. La titular no
        controla esos sitios ni responde de sus contenidos o de cómo tratan tus datos; cada uno tiene sus propias
        condiciones y política de privacidad.
      </p>
      <p>Las reseñas que se muestran proceden de Google y se publican tal como las escribieron sus autores.</p>

      <h2>Responsabilidad</h2>
      <p>
        La titular procura que la información del sitio sea correcta y esté actualizada, pero puede contener errores u
        omisiones. Los horarios, la disponibilidad y las condiciones de cada servicio se confirman siempre al reservar.
      </p>

      <h2>Protección de datos</h2>
      <p>
        Cómo se tratan tus datos personales se explica en la <Link href='/privacidad'>política de privacidad</Link>.
      </p>

      <h2>Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los
        juzgados y tribunales que correspondan conforme a la ley; si actúas como consumidor, los de tu domicilio.
      </p>
    </LegalPage>
  )
}
