/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["bkxptjmdffrrbvolrdii.supabase.co"], // Add your Supabase domain here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bkxptjmdffrrbvolrdii.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
  },
  // output: "export",
};

//module.exports = nextConfig;
//https://bkxptjmdffrrbvolrdii.supabase.co/storage/v1/object/public/cabin-images//0.31016551744101784-img-2.jpg

export default nextConfig;
