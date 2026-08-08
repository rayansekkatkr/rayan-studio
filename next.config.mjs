/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/a-propos-methodologie-preuves",
        destination: "/fr/a-propos-methodologie-preuves",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
