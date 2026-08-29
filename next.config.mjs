/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.tandemhopper.de'
          }
        ],
        destination: 'https://tandemhopper.de/:path*',
        permanent: true
      }
    ];
  }
};
export default nextConfig;
