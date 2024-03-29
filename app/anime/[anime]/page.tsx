import { getInfo } from "@/utils/get-anime"
import Details from "./_components/Details"
import { AnilistInfoInterface } from "@/types"
import AnimePlayer from "./_components/AnimePlayer"
import { config } from "@/config"
import SetWatchedHistory from "./_components/SetWatchedHistory"
import { notFound } from "next/navigation"

type Props = {
    params: {
        anime: string
    }

    searchParams: {
        watch: string
    }
}

const { disqus_shortname } = config

export default async function AnimeInfoPage({ params: { anime: id }, searchParams: { watch } }: Props) {
    const response = await getInfo(id)

    if (!response || response.error) return notFound()

    return (
        <main>
            <AnimePlayer data={response} watchParams={watch} />
            <Details data={response} watchParams={watch} disqus_shortname={disqus_shortname as string}/>
            <SetWatchedHistory info={response} watchParams={watch} />
        </main>
    )
}