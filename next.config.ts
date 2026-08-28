import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's on-the-fly image optimization is metered/paid beyond a
    // small free quota; our images are already reasonably sized static
    // files, so skip that pipeline and serve them as-is.
    unoptimized: true,
  },
};

export default nextConfig;
