import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { CONTACT_DETAILS } from '@/data/contact-details'
import { ANALYTICS_RETENTION_MONTHS, LEGAL_OWNER } from '@/data/legal'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de privacidad',
  description:
    'Qué datos personales trata Fer Gutierrez MakeUp, para qué, durante cuánto tiempo y cómo ejercer tus derechos.',
  path: '/privacidad'
})

const { email, address, postalCode, city, state } = CONTACT_DETAILS

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title='Política de privacidad' path='/privacidad'>
      <h2>Responsable del tratamiento</h2>
      <ul>
        <li>
          {LEGAL_OWNER.name} (Fer Gutierrez MakeUp), NIF {LEGAL_OWNER.taxId}.
        </li>
        <li>
          {address}, {postalCode} {city} ({state}), España.
        </li>
        <li>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </li>
      </ul>

      <h2>Medición de audiencia</h2>
      <p>
        Para saber cuántas personas visitan el sitio, qué páginas ven, desde dónde llegan y cuántas pulsan los botones
        de WhatsApp, se usa Pirsch (pirsch.io), una herramienta de estadísticas con servidores en Alemania que actúa
        como encargada del tratamiento.
      </p>
      <ul>
        <li>
          Datos: la página visitada, la página de procedencia, el tipo de dispositivo y navegador, el tamaño de
          pantalla, el país y, en los botones de WhatsApp, qué servicio o clase has elegido. Nunca se envía el texto del
          mensaje.
        </li>
        <li>
          No usa cookies ni guarda nada en tu dispositivo. Tu dirección IP no se almacena: Pirsch la combina con otros
          datos técnicos en un identificador cifrado que cambia cada día, de modo que no se te puede reconocer de un día
          para otro.
        </li>
        <li>
          Solo se obtienen estadísticas agregadas, para uso exclusivo de este sitio. Pirsch no usa estos datos para
          fines propios ni los cruza con otros sitios.
        </li>
        <li>Finalidad y base legal: conocer el uso del sitio para mejorarlo, por interés legítimo de la titular.</li>
        <li>Conservación: {ANALYTICS_RETENTION_MONTHS} meses como máximo.</li>
      </ul>
      <p>
        Puedes oponerte a esta medición escribiendo a <a href={`mailto:${email}`}>{email}</a>, o usando un bloqueador de
        rastreo en tu navegador.
      </p>

      <h2>Alojamiento del sitio</h2>
      <p>
        El sitio está alojado en Vercel Inc., con sede en Estados Unidos, que actúa como encargada del tratamiento. Al
        visitarlo, sus servidores registran datos técnicos de cada petición (como la dirección IP, el navegador y la
        página solicitada) para servir el sitio y protegerlo frente a abusos, y los conservan durante un tiempo
        limitado. Las transferencias internacionales se realizan con las garantías previstas en el Reglamento General de
        Protección de Datos (RGPD).
      </p>

      <h2>Reservas y consultas</h2>
      <p>
        Cuando escribes por WhatsApp, llamas o envías un email, se tratan los datos que facilitas (como tu nombre, tu
        teléfono y lo que cuentas en el mensaje) para responderte, gestionar tu reserva o preparar un presupuesto.
      </p>
      <ul>
        <li>Base legal: la aplicación de medidas precontractuales o la ejecución del servicio que solicitas.</li>
        <li>
          Conservación: mientras dure la relación y, después, el tiempo necesario para cumplir obligaciones legales,
          como las fiscales.
        </li>
        <li>
          WhatsApp es un servicio de WhatsApp Ireland Limited (Meta), que trata tus datos según su propia política de
          privacidad.
        </li>
      </ul>

      <h2>Contenido de terceros</h2>
      <p>
        Las reseñas de la página de inicio se obtienen de Google y las imágenes se sirven desde este mismo sitio, así
        que al verlas tu navegador no se conecta con Google. Los enlaces a redes sociales, Google Maps y WhatsApp te
        llevan a sitios de terceros con sus propias políticas.
      </p>

      <h2>Cookies</h2>
      <p>
        Este sitio no usa cookies ni almacena información en tu dispositivo. El script de medición solo comprueba si has
        desactivado Pirsch en tu navegador.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento, limitarlo y pedir su
        portabilidad escribiendo a <a href={`mailto:${email}`}>{email}</a>. Si crees que no se han atendido
        correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (
        <a href='https://www.aepd.es' target='_blank' rel='noopener noreferrer'>
          aepd.es
        </a>
        ).
      </p>
      <p>No se toman decisiones automatizadas ni se elaboran perfiles con tus datos.</p>
    </LegalPage>
  )
}
