import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Set this to the maximum file size you expect
    },
  },
};

export default nextConfig;
