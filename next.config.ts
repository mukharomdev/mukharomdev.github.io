import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import consola from 'consola'
import type { NextConfig } from 'next'
import { isWorkerd } from 'std-env'

if (isWorkerd) {
  consola.withTag('nextConfig').log('Initializing OpenNext for Cloudflare Workers')
  initOpenNextCloudflareForDev()
}

const nextConfig: NextConfig = {
  output:"export,
  basePath: process.env.PAGES_BASE_PATH,
  assetPrefix: process.env.PAGES_BASE_PATH + "/",
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true /* disable eslint on build */,
  },
}

export default nextConfig
