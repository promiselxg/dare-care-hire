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
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "autostar.pro-theme.info",
      },
      //   {
      //     protocol: "https",
      //     hostname: "res.cloudinary.com",
      //   },
    ],
  },
};

export default nextConfig;
