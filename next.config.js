const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = async () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['media.graphassets.com'],
      formats: ['image/avif', 'image/webp'],
    },
    reactStrictMode: true,
  }
  const configWithPWA = withPWA({
    dest: 'public',
  })(nextConfig)

  return configWithPWA
}
