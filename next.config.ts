import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
