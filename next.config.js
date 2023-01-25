// /** @type {import('next').NextConfig} */
// module.exports = {
//   images: {
//     domains: ["media.graphassets.com"],
//   },
//   reactStrictMode: true,
// }

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
  return nextConfig
}
