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
