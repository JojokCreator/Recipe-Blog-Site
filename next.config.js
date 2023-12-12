const withPWA = require('next-pwa')

module.exports = withPWA({
  dest: 'public',
  // other next-pwa configurations go here
})({
  /**
   * @type {import('next').NextConfig}
   */
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['media.graphassets.com'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
})
