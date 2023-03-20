/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  eslint: {
    dirs: ['pages', 'components', 'lib', 'src', 'models', 'redux'],
  },
};

module.exports = nextConfig;
