/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Configure webpack to handle CSV files
  webpack(config) {
    config.module.rules.push({
      test: /\.(csv)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/csv/[name][ext]'
      }
    });

    return config;
  },
};

module.exports = nextConfig;