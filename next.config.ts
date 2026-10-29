import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/pricing", destination: "/contact", permanent: false }];
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }] },
  experimental: {
    // Turbopack evaluates Tailwind/PostCSS in a pool of child processes by default. On a machine that is short of
    // memory the OS kills them and dev shows "Jest worker encountered 2 child process exceptions" (write EPIPE).
    // Worker threads run inside the Next process: less memory, nothing for the OS to kill separately.
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
};

export default config;
