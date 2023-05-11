import { Footer, Header } from '../components'
import '../styles/globals.scss'
import { getCategories } from '../services'
import Script from 'next/script'
import { AnalyticsWrapper } from '../components/analytics'

export const metadata = {
  description:
    'Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home',
  keywords: ['Asian Food', 'Cooking', 'Blog', 'Brewing'],
  // twitter meta tags
  twitter: {
    card: 'summary_large_image',
    images: {
      url: 'https://barefootrecipe.com/blog.jpg',
      alt: 'website image',
    },
  },
  //  open graph tags
  openGraph: {
    locale: 'en_US',
    url: 'https://barefootrecipe.com/',
    title: 'Barefoot Recipes Site',
    description:
      'Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home',
    images: [
      {
        url: 'https://barefootrecipe.com/blog.jpg',
        alt: 'website image',
      },
    ],
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="en-GB">
      <Script
        data-ad-client="ca-pub-6386510566931206"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></Script>
      <Script
        strategy={'afterInteractive'}
        src={`https://www.googletagmanager.com/gtag/js?id=G-Z3G6J61M70`}
      />
      <Script
        id={'google-analytics'}
        strategy={'afterInteractive'}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'G-Z3G6J61M70');
        `,
        }}
      />
      <body>
        <Header categories={categories} />
        {children}
        <AnalyticsWrapper />
        <Footer />
      </body>
    </html>
  )
}
