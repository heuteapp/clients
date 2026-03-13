// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.heuteapp.net/:path*',
      },
    ];
  },
};