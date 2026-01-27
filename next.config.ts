import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Production config for static hosting (Hostinger) */
  output: 'export',

  /* Disable image optimization for static export */
  images: {
    unoptimized: true,
  },

  /* Add trailing slash for better static hosting compatibility */
  trailingSlash: true,

  /* React Compiler for optimization */
  reactCompiler: true,
};

export default nextConfig;
