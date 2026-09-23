import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only Cloudinary is allowed to serve remote images - never widen this to arbitrary hosts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
