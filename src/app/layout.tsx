import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'
import './globals.css'

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik'
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_TITLE} | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_TITLE} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: SITE_LOCALE,
    siteName: SITE_NAME
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='es' className={rubik.variable}>
      <body className='font-custom antialiased'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
