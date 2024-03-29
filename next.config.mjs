/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's4.anilist.co',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'media.kitsu.io',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig
