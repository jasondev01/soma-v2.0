"use client"

import { EpisodeInterface } from "@/types"
import { DiscussionEmbed } from "disqus-react"


type Props = {
    episodeId: string
    episodes: EpisodeInterface[],
    currentEpisode: number
    disqus_shortname?: string
}

export default function Disqus({ episodeId, episodes, currentEpisode, disqus_shortname }: Props) {
    if (!disqus_shortname || disqus_shortname === "undefined" || disqus_shortname === null) return null
    const current = episodes[currentEpisode]

    const disqusConfig = {
        url: `https://www.soma-tv.me/watch/${current?.id}`,
        identifier: current?.id,
        title: `${episodeId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}`
    }

    return (
        <DiscussionEmbed 
            shortname={disqus_shortname as string}
            config={disqusConfig}
        />
    )
}
