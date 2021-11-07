/** @type {import('next').NextConfig} */
module.exports = {
  cleanDistDir: true,
  reactStrictMode: true,
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
        source: "/markdown",
        destination: "/utils/md-html",
        permanent: true,
      },
      {
        source: "/per",
        destination: "/utils/percentage-calculator",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    }

    return config;
  },
};
