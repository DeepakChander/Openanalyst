import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep images unoptimized for simpler deployment */
  images: {
    unoptimized: true,
  },

  /* Add trailing slash for better compatibility */
  trailingSlash: true,

  /* React Compiler for optimization */
  reactCompiler: true,
};

export default nextConfig;
