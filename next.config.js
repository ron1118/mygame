const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.gamemonetize.com',
      },
      {
        protocol: 'https',
        hostname: 'gamemonetize.com',
      },
      {
        protocol: 'https',
        hostname: 'uncached.gamemonetize.co',
      },
      {
        protocol: 'https',
        hostname: 'html5.gamemonetize.co',
      },
    ],
  },
};

module.exports = nextConfig; 