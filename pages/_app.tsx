import '../styles/globals.scss'
import React from 'react'
import App from 'next/app'
import { Layout } from '../components';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
