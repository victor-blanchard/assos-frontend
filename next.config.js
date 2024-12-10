/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["secure.meetupstatic.com"],
  },
  transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker'],
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
