import { Footer, Header } from '../components'
import '../styles/globals.scss'
import { getCategories } from '../services'
import Script from 'next/script'

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
        <Footer />
      </body>
    </html>
  )
}
