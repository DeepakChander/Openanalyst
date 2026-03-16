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

  /* SEO & Security headers */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
