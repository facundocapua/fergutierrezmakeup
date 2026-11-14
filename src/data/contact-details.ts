export type ContactDetails = {
  email: string
  /** Phone as displayed. */
  phone: string
  /** Phone in E.164 format, for tel: links. */
  phoneE164: string
  address: string
  city: string
  state: string
  postalCode: string
  /** ISO 3166-1 alpha-2. */
  country: string
  openingHours: { days: string[]; opens: string; closes: string }
  coordinates: { latitude: number; longitude: number }
  mapLink: string
  socialNetworks: {
    facebook: string
    instagram: string
    tiktok: string
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
  postalCode: '29630',
  country: 'ES',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '20:00'
  },
  coordinates: { latitude: 36.5933486, longitude: -4.5407802 },
  mapLink: 'https://maps.app.goo.gl/AeNcSQShVrHbPA4y5',
  socialNetworks: {
    facebook: 'https://www.facebook.com/fernanda.gutierrez.makeup',
    instagram: 'https://www.instagram.com/fer.gutierrez.makeup/',
    tiktok: 'https://www.tiktok.com/@fer.gutierrez.makeup'
  }
}
