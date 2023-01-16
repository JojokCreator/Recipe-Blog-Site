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
      domains: ["media.graphassets.com"],
    },
    reactStrictMode: true,
  }
  return nextConfig
}