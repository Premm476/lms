/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Image optimization
  images: {
    domains: [], // Add your image domains here
    minimumCacheTTL: 60, // 60 seconds cache
    formats: ['image/webp'], // Auto-convert to webp
  },

  // Experimental features (only stable ones)
  experimental: {
    forceSwcTransforms: true,
    swcTraceProfiling: true,
    // Removed nextScriptWorkers as it requires Partytown
    scrollRestoration: true,
  },

  // Custom webpack configuration
  /**
   * @param {import('webpack').Configuration} config
   * @param {Object} options
   * @param {boolean} options.dev - Whether in development mode
   * @param {boolean} options.isServer - Whether building for server
   */
  webpack: (config, { dev, isServer }) => { // eslint-disable-line no-unused-vars
    // Improved file watching in development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    // SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

// Security headers configuration
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

export default nextConfig;
