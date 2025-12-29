import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  ...(process.env.NODE_ENV === "development" ? {
    async rewrites() {
      return [
        {
          source: '/static/:v/gw-2hill6.lib.js',
          destination: 'https://gateway-2hill6.spikerko.org/js/pa-x-AX1bzaYQPLVDDaOrf32.js',
        },
      ];
    }
  } : {})
};

export default nextConfig;
