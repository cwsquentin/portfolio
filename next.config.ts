import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import Icons from 'unplugin-icons/webpack';

const withNextIntl = createNextIntlPlugin({});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react', 
      })
    );
    return config;
  },
};

export default withNextIntl(nextConfig);