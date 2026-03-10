
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  // Use standalone output for easier Docker/Container deployment
  output: 'standalone',
  // Disable strict mode for now to reduce console noise during dev
  reactStrictMode: false,
}

module.exports = nextConfig
