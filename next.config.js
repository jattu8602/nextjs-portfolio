/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: "./tsconfig.json",
  },
};

module.exports = nextConfig;

