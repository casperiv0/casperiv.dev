import { withContentlayer } from "next-contentlayer";
import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["media.ronin.co", "avatars.githubusercontent.com"],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    appDir: true,
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/twitter",
        destination: "https://twitter.com/casper124578",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/dev-caspertheghost",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/casper-iversen",
        permanent: true,
      },
      {
        source: "/uses",
        destination: "/blog/my-uses",
        permanent: true,
      },
      {
        source: "/gallery/imagery",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

// https://github.com/leerob/leerob.io/blob/1356f8aa1adb083d5b192c6f53fa04946afefc00/next.config.js#LL48-L85
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

export default withContentlayer(nextConfig);
