/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'gogocdn.net',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.noitatnemucod.net',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'www.animenewsnetwork.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig
