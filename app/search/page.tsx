import { searchAnime } from "@/utils/get-anime"
import SearchCards from "./_components/SearchCards"
import { Metadata } from "next"
import { config } from "@/config"
import { redirect } from "next/navigation"

type Props = {
    searchParams: {
        q: string
    }
}

const { baseUrl } = config

export function generateMetadata({ searchParams }: Props): Metadata {
    const { q: query } = searchParams

    return {
        metadataBase: new URL(baseUrl as string),
        title: `Search Results for ${query}`,
        description: `Search Results for ${query}`,
        alternates: {
            canonical: `/search?q=${query}`
        },
        openGraph: {
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
            url: `/search?q=${query}`,
            type: 'website',
        },
    }
}

export default async function SearchQueryPage({ searchParams }: Props) {
    const { q: query } = searchParams

    if (!query) redirect("/search?q=anime") 

    const results = await searchAnime(query)

    return (
        <main>
            <div className="container grid place-items-center h-16 md:h-24">
                <h2 className="text-xl font-bold">
                    Search Reults for <span className="text-cyan-300">{query}</span>:
                </h2>
            </div>
            <SearchCards data={results}/>
        </main>
    )
}