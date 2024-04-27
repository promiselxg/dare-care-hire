/** @type {import('next').NextConfig} */
const nextConfig = {
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
