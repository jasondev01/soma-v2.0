"use client"

import { AnilistEpisodeInterface, AnilistInfoInterface } from "@/types"
import { DiscussionEmbed } from "disqus-react"


type Props = {
    currentEpisode?: AnilistEpisodeInterface,
    data: AnilistInfoInterface
    disqus_shortname?: string
}

export default function Disqus({ currentEpisode, data, disqus_shortname }: Props) {
    if (!disqus_shortname || disqus_shortname === "undefined" || disqus_shortname === null) return null

    const disqusConfig = {
        url: `https://www.soma-tv.me/anime/watch/${data?.id}?episode=${currentEpisode?.id}`,
        identifier: currentEpisode?.id,
        title: `${currentEpisode?.id?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}`
    }

    return (
        <div className="container !px-0 py-7">
            <DiscussionEmbed 
                shortname={disqus_shortname as string}
                config={disqusConfig}
            />
        </div>
    )
}
