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
      <head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/assets/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/assets/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/assets/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
        <Script
          data-goatcounter="https://barefoot.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></Script>
      </head>
      <body>
        <Header categories={categories} />
        {children}
        <AnalyticsWrapper />
        <Footer />
      </body>
    </html>
  )
}
