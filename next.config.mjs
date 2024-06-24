/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/admin/setting",
        destination: "/admin/setting/type",
        permanent: true,
      },
      {
        source: "/admin/cars/edit",
        destination: "/admin/cars",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/admin/users",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
        ],
      },
      {
        source: "/admin/transactions",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
        ],
      },
      {
        source: "/admin/transactions/analytics",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "rofad91globalservicesltd.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
