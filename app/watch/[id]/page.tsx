import {
    getBanner,
    getInfo,
    getSources,
    getTMDBResource,
    searchAnime,
} from "@/utils/get-anime"
import Player from "../_components/Player"
import { EpisodeInterface, TopInterface } from "@/types"
import Image from "next/image"
import { bannerBasePath, logoBasePath } from "@/utils/constants"
import PrevNext from "../_components/PrevNext"
import SelectEpisode from "../_components/SelectEpisode"
import { Metadata } from "next"
import { config } from "@/config"
import Disqus from "../_components/Disqus"

type Props = {
    params: {
        id: string
    }
}

const { baseUrl } = config

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    
    let info = await getInfo(id.replace(/-episode-\d+(-\d+)?$/, ""))

    if (info.error) {
        console.log(info.error)
        const searchForAnime = await searchAnime(id.replace(/-episode-\d+(-\d+)?$/, ""))
        info = await getInfo(searchForAnime[0]?.id)
    }

    const tmdbInfo: TopInterface = await getTMDBResource(info?.title?.replace('(Dub)', ''))
    const banner = await getBanner(String(tmdbInfo?.id))

    if (!info) return {
        title: 'Not Found',
        description: "The page is not found"
    }

    const { image } = info

    const title = `Watch ${id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}`

    return {
        metadataBase: new URL(baseUrl as string),
        title: title,
        description: title,
        alternates: {
            canonical: `/watch/${id}`
        },
        openGraph: {
            images: [
                {
                    url: banner?.backdrops?.length > 0 ? `${bannerBasePath}/${banner?.backdrops[0]?.file_path}` : image,
                    width: 800,
                    height: 600,
                    alt: title,
                },
                {
                    url: banner?.backdrops?.length > 0 ? `${bannerBasePath}/${banner?.backdrops[0]?.file_path}` : image,
                    width: 1800,
                    height: 1600,
                    alt: title,
                }
            ],
            url: `/watch/${id}`,
            type: 'website',
        },
    }
}

export default async function WatchPage({ params }: Props) {
    const { id } = params

    let info = await getInfo(id.replace(/-episode-\d+(-\d+)?$/, ""))
    const source = await getSources(id)

    if (info.error) {
        const searchForAnime = await searchAnime(id.replace(/-episode-\d+(-\d+)?$/, ""))
        info = await getInfo(searchForAnime[0]?.id)
    }

    const tmdbInfo: TopInterface = await getTMDBResource((info?.title?.replace('(Dub)', '')))
    const banner = await getBanner(String(tmdbInfo?.id))

    const episodes: EpisodeInterface[] = info?.episodes
    const currentEpisode = episodes?.findIndex(episode => episode?.id === id)

    return (
        <main>
            <section className="relative -mt-20 h-[600px] md:h-[750px] xl:min-h-screen overflow-hidden w-full grid place-items-center">
                <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                {banner?.backdrops?.length > 0 && (
                    <Image
                        priority
                        src={`${bannerBasePath}/${banner?.backdrops[0]?.file_path}`}
                        alt={info?.title}
                        title={info?.title}
                        width={1200}
                        height={1200}
                        className="object-cover h-full w-full opacity-40 absolute top-0 left-0"
                    />
                )}
                {banner?.logos?.length > 0 && (
                    <Image
                        src={`${logoBasePath}/${banner?.logos[0]?.file_path}`}
                        alt={`${info?.title} Logo`}
                        width={250}
                        height={250}
                        className="object-contain object-center drop-shadow-md mb-5 absolute left-16 z-[1]"
                        style={{
                            filter: "drop-shadow(0px 4px 4px rgba(103, 232, 249, 1)",
                        }}
                    />
                )}
                <div className="container !px-2 sm:!px-5 mt-20 relative z-[2]">
                    <SelectEpisode
                        episodes={episodes}
                        currentEpisode={currentEpisode} 
                    />
                    <Player 
                        info={info} 
                        source={source} 
                    />
                    {source && (
                        <PrevNext 
                            info={info}
                            episodes={episodes}
                            currentEpisode={currentEpisode} 
                        />
                    )}
                </div>

            </section>

            {/* remove this section and delete disqus component if you dont have disqus shortname */}
            <section>
                <div className="container mt-10">
                    <Disqus 
                        episodeId={id}
                        episodes={episodes}
                        currentEpisode={currentEpisode} 
                    />
                </div>  
            </section>
        </main>
    )
}