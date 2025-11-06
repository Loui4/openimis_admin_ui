import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/admin-portal',
  assetPrefix: '/admin-portal/',
  images: {
    unoptimized: true, // optional, only if image optimization causes trouble
  },
};

export default nextConfig;
