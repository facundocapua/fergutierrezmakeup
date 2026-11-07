export type MakeupClass = {
  name: string
  description: string[]
  topics?: string[]
  sessions: number
  durationMinutes: number
  image: string
  whatsAppMessage: string
}

export const CLASSES_ENQUIRY_WHATSAPP_MESSAGE = 'Hola, me gustaría saber más sobre tus clases de maquillaje.'

/** Classes the Artist teaches. */
export const CLASSES: MakeupClass[] = [
  {
    name: 'Automaquillaje individual',
    description: [
      'Vas a aprender todos los pasos para lograr un maquillaje según tu estilo y la morfología de tu rostro.'
    ],
    topics: [
      'Preparación de la piel',
      'Maquillaje básico de día',
      'Maquillaje básico de noche',
      'Asesoramiento para armar tu kit'
    ],
    sessions: 2,
    durationMinutes: 60,
    image: '/services/selfmakeup/1.jpg',
    whatsAppMessage: '¡Hola! ¿Cómo estás? Quisiera saber más sobre la clase de *Automaquillaje individual*.'
  },
  {
    name: 'Perfeccionamientos',
    description: [
      'Clases personalizadas, podes elegir el tema que quieras profundizar.',
      'Trabajaremos para que puedas afianzar tus técnicas y así lograr mayor confianza.'
    ],
    sessions: 1,
    durationMinutes: 90,
    image: '/services/selfmakeup/2.jpg',
    whatsAppMessage: '¡Hola! ¿Cómo estás? Quisiera saber más sobre la clase de *Perfeccionamiento*.'
  }
]
