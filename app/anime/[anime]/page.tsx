import InfoBanner from "./_components/InfoBanner"
import Overview from "./_components/Overview"
import Relations from "./_components/Relations"
import Episodes from "./_components/Episodes"
import Characters from "./_components/Characters"
import { getInfo } from "@/utils/get-anime"
import { config } from "@/config"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Recommendations from "@/components/Recommendations"

type Props = {
    params: {
        anime: string
    }
}

const { baseUrl } = config

export async function generateMetadata({ params: { anime: id } }: Props): Promise<Metadata> {
    const response  = await getInfo(id)

    if (!response || response?.error ) {
        return {
            title: 'Page Not Found',
            description: `The anime with the id ${id} was not found. Please try again later.`,
        }
    }

    return {
        metadataBase: new URL(baseUrl as string),
        // title: !watch ? response?.title?.english || response?.title?.romaji : `Watch ${watch?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
        title:  response?.title?.english || response?.title?.romaji,
        description: response?.description?.slice(0, 170),
        alternates: {
            canonical: `/anime/${id}`
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
                    url: response?.cover || response?.image,
                    width: 800,
                    height: 600,
                    alt: response?.title?.english || response?.title?.romaji,
                },
                {
                    url: response?.cover || response?.image,
                    width: 1800,
                    height: 1600,
                    alt: response?.title?.english || response?.title?.romaji,
                }
            ],
            url: `/anime/${id}`,
            locale: 'en_US',
            type: 'website',
        },
    }
}

export default async function AnimeInfoPage({ params: { anime: id }}: Props) {
    const response = await getInfo(id)

    if (!response || response?.error) return notFound()

    return (
        <main className="relative">
            <InfoBanner data={response} />
            <Overview data={response} />
            <Characters data={response?.characters} />
            <Episodes data={response?.episodes} anime={response} />
            <Relations data={response?.relations} />
            <Recommendations data={response?.recommendations} />
        </main>
    )
}