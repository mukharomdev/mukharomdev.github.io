// const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  output: 'export',

  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/mukharomdev.github.io/' : '',
  basePath: isProd ? '/mukharomdev.github.io' : '',
  
  };

export default nextConfig;

// webpack: (config) => {
//     config.resolve.alias['@'] = path.resolve(__dirname, 'src');
//     return config;
//   },