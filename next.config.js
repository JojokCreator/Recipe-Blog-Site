// /** @type {import('next').NextConfig} */
// module.exports = {
//   images: {
//     domains: ["media.graphassets.com"],
//   },
//   reactStrictMode: true,
// }

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: ["media.graphassets.com"],
    },
    reactStrictMode: true,
  }
  return nextConfig
}