import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Fixes the WebSocket / HMR error
  allowedDevOrigins: ['192.168.0.140'], 
  
  // 2. Fixes the "Invalid origin" error during Login (Server Actions)
  serverActions: {
    allowedOrigins: ['http://192.168.0.140:3000'],
  },

  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;