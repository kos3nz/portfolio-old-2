/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // trailingSlash: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    // if (!dev && !isServer) {
    //   Object.assign(
    //     config.resolve.alias,
    //     {
    //       'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
    //       react: 'preact/compat',
    //       'react-dom/test-utils': 'preact/test-utils',
    //       'react-dom': 'preact/compat',
    //     },
    //   );
    // }

    // @でcomponents directoryを参照
    // config.resolve.alias['@'] = path.resolve(__dirname, 'src/components');

    return config;
  },
};

module.exports = nextConfig;
