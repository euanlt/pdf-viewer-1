import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/pdf-viewer-1' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pdf-viewer-1/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
