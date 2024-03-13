'use client'

import { config } from "@/config"
import { EpisodeInterface } from "@/types"
import { DiscussionEmbed } from "disqus-react"

const { disqus_shortname, baseUrl } = config

type Props = {
    episodeId: string
    episodes: EpisodeInterface[],
    currentEpisode: number
}

export default function Disqus({ episodeId, episodes, currentEpisode }: Props) {
    if (!disqus_shortname || disqus_shortname === "undefined" || disqus_shortname === null) return null
    
    const current = episodes[currentEpisode]

    const disqusConfig = {
        url: `${baseUrl}/watch/${current?.id}`,
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
