import { Footer, Header } from '../components'
import '../styles/globals.scss'
import { getCategories } from '../services'
import Image from 'next/image'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html>
      <body>
        <Header categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
