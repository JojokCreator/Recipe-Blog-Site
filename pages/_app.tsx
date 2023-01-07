import '../styles/globals.scss'
import { Layout } from '../components';
import { AppProps } from 'next/app';
import Script from 'next/script';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-Z3G6J61M70`}
      />

      <Script strategy="lazyOnload">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Z3G6J61M70', {
        page_path: window.location.pathname,
      });
  `}
      </Script>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
