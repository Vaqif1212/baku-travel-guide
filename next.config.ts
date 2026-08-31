import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's on-the-fly image optimization is metered/paid beyond a
    // small free quota; our images are already reasonably sized static
    // files, so skip that pipeline and serve them as-is.
    unoptimized: true,
  },
  async redirects() {
    return [
      // www is registered in Vercel as a second domain but must not serve
      // duplicate content — force it to the canonical apex domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.travelguidebaku.com" }],
        destination: "https://travelguidebaku.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
