/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['images.clerk.dev',"www.gravatar.com"],
  },
}

module.exports = nextConfig
