import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'assets')],
    prependData: `@use "variables" as *;`,
  },
  images: {
    domains: ['www.themealdb.com'],
  },
};

export default nextConfig;
