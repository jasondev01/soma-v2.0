import { getInfo, getSkipTimes } from "@/utils/get-anime"
import Details from "./_components/Details"
import AnimePlayer from "./_components/AnimePlayer"
import { config } from "@/config"
import SetWatchedHistory from "./_components/SetWatchedHistory"

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
    const [ response, skip ] = await Promise.all([
        getInfo(id),
        getSkipTimes(id)
    ])

    return (
        <main>
            <AnimePlayer data={response} watchParams={watch} skip={skip?.episodes} />
            <Details data={response} watchParams={watch} disqus_shortname={disqus_shortname as string}/>
            <SetWatchedHistory info={response} watchParams={watch} />
        </main>
    )
}