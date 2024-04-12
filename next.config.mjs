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
            {
                protocol: 'https',
                hostname: 'artworks.thetvdb.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.myanimelist.net',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig
