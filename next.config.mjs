/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "i.ibb.co",
    },
    {
      protocol: "https",
      hostname: "i.postimg.cc",
    },
  ],
},
};

export default nextConfig;
