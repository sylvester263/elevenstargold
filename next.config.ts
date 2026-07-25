import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The bottom-left route indicator is Next's own dev-only overlay (already
  // stripped from production builds automatically) — disabled here too
  // since the audit found it visually overlapping real content in dev/demo
  // sessions (09-launch-fixes.md P0-5).
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pjfrbjnxfhejoofbmude.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
