export type ContactDetails = {
  email: string
  /** Phone as displayed. */
  phone: string
  /** Phone in E.164 format, for tel: links. */
  phoneE164: string
  address: string
  city: string
  state: string
  mapLink: string
  socialNetworks: {
    facebook: string
    instagram: string
    tiktok: string
    whatsapp: string
  }
}

/** The Studio's public Contact Details. */
export const CONTACT_DETAILS: ContactDetails = {
  email: 'fernandagutierrez2008@gmail.com',
  phone: '+34 623 807 060',
  phoneE164: '+34623807060',
  address: 'Avenida Mar Báltico 39',
  city: 'Benalmádena',
  state: 'Málaga',
  mapLink: 'https://maps.app.goo.gl/AeNcSQShVrHbPA4y5',
  socialNetworks: {
    facebook: 'https://www.facebook.com/fernanda.gutierrez.makeup',
    instagram: 'https://www.instagram.com/fer.gutierrez.makeup/',
    tiktok: 'https://www.tiktok.com/@fer.gutierrez.makeup',
    whatsapp: 'https://wa.me/34623807060'
  }
}
