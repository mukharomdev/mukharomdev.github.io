const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/mukharomdev.github.io/' : '',
  basePath: isProd ? '/mukharomdev.github.io' : '',
  output: 'export'
};

export default nextConfig;
