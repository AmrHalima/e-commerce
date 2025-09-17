import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typedRoutes: true,
    images: {
        qualities: [30, 75, 100],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ecommerce.routemisr.com",
                pathname: "/Route-Academy-*/**",
            },
        ],
    },
};

export default nextConfig;
