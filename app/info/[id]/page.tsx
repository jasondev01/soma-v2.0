import { getBanner, getInfo, getTMDBResource } from "@/utils/get-anime"
import InfoBanner from "../_components/InfoBanner"
import Episodes from "../_components/Episodes"
import { Metadata } from "next"
import { config } from "@/config"
import { TopInterface } from "@/types"
import { bannerBasePath } from "@/utils/constants"

type Props = {
    params: {
        id: string
    }
}

const { baseUrl } = config

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    const info = await getInfo(id)

    const tmdbInfo: TopInterface = await getTMDBResource(info?.title?.replace('(Dub)', ''))
    const banner = await getBanner(String(tmdbInfo?.id))
    const name = `${tmdbInfo?.original_name} / ${tmdbInfo?.name} / ${info?.title}`
    const title = name.includes('undefined') ? info?.title : name 

    if (!info) return {
        title: 'Not Found',
        description: "The page is not found"
    }

    const { description, id: animeId, image } = info

    return {
        metadataBase: new URL(baseUrl as string),
        title: title,
        description: description,
        alternates: {
            canonical: `/info/${animeId}`
        },
        openGraph: {
            images: [
                {
                    url: banner?.backdrops[0] ? `${bannerBasePath}/${banner?.backdrops[0]?.file_path}` : image,
                    width: 800,
                    height: 600,
                    alt: title,
                },
                {
                    url: banner?.backdrops[0] ? `${bannerBasePath}/${banner?.backdrops[0]?.file_path}` : image,
                    width: 1800,
                    height: 1600,
                    alt: title,
                }
            ],
            url: `/info/${animeId}`,
        },
    }
}

export default async function InfoPage({ params }: Props) {
    const { id } = params
    const info = await getInfo(id)

    return (
        <main>
            <InfoBanner data={info} />
            <Episodes data={info}/>
        </main>
    )
}