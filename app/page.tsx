import Banner from "@/components/Banner"
import TopAiring from "@/components/TopAiring"
import Recent from "@/components/Recent"
import Popular from "@/components/Popular"
import { getPopular, getRecent, getTopAiring } from "@/utils/get-anime"
import { Metadata } from "next"
import { config } from "@/config"

const { baseUrl } = config

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl as string),
    title: 'Soma | Watch and Stream Anime Ad Free',
    description: "Watch and stream popular, top airing and recent animes ad free here in soma.",
    keywords: 'add free anime, watch and stream, watch for free, free anime, consumet, anime project',
    alternates: {
        canonical: '/'
    },
    openGraph: {
        title: 'Watch and Stream Anime Ad Free',
        description: 'Watch and stream anime ad free.',
        url: '/',
        siteName: 'Soma',
        images: [
            {
                url: '/soma-og.webp',
                width: 800,
                height: 600,
                alt: 'Soma TV',
            },
            {
                url: '/soma-og.webp',
                width: 1800,
                height: 1600,
                alt: 'Soma TV',
            },
        ],
        type: 'website'
    },
}

export default async function Home() {
    const [ topAiring, recent, popular ] = await Promise.all([
        getTopAiring(),
        getRecent(),
        getPopular()
    ])

    return (
        <main>
            <Banner data={topAiring}/>
            <Recent data={recent}/>
            <TopAiring data={topAiring}/>
            <Popular data={popular}/>
        </main>
    )
}
