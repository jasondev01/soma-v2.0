import { getInfo } from "@/utils/get-anime"
import WatchContents from "../_components/WatchContents"
import Recommendations from "@/components/Recommendations"
import { config } from "@/config"
import { Metadata } from "next"
import { AnilistEpisodeInterface } from "@/types"

type Props ={
    params: {
        id: string
    }
    searchParams: {
        episode: string
    }
}

const { baseUrl } = config

export async function generateMetadata({ params: { id }, searchParams: { episode } }: Props): Promise<Metadata> {
    const response  = await getInfo(id)

    if (!response || response?.error ) {
        return {
            title: 'Page Not Found',
            description: `The anime with the id ${id} was not found. Please try again later.`,
        }
    }
    
    const currentEpisode = response?.episodes?.find((ep: AnilistEpisodeInterface) => ep?.id === episode)
    const title = episode?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return {
        metadataBase: new URL(baseUrl as string),
        title: `Watch ${title}`,
        description: currentEpisode && currentEpisode?.title ? `Watch ${title} here in Soma TV` : `${response?.description?.slice(0, 170)}`,
        alternates: { 
            canonical: `/anime/watch/${id}?episode=${episode}`
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        openGraph: {
            images: [
                {
                    url: currentEpisode?.image === response?.image ? response?.cover : response?.image,
                    width: 800,
                    height: 600,
                    alt: response?.title?.english || response?.title?.romaji,
                },
                {
                    url: currentEpisode?.image === response?.image ? response?.cover : response?.image,
                    width: 1800,
                    height: 1600,
                    alt: response?.title?.english || response?.title?.romaji,
                }
            ],
            url: `/anime/watch/${id}?episode=${episode}`,
            locale: 'en_US',
            type: 'website',
        },
    }
}

export default async function WatchPage({ params: { id }, searchParams: { episode } }: Props) {
    const response= await getInfo(id)

    return (
        <main>
            <WatchContents data={response} episode={episode} id={id} />
            <Recommendations data={response?.recommendations} />
        </main>
    )
}
