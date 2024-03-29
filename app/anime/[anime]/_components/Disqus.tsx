"use client"

import { AnilistEpisodeInterface } from "@/types"
import { DiscussionEmbed } from "disqus-react"
import { useEffect, useState } from "react"


type Props = {
    watchParams: string
    episodes: AnilistEpisodeInterface[],
    disqus_shortname?: string
}

export default function Disqus({ watchParams, episodes, disqus_shortname }: Props) {
    if (!disqus_shortname || disqus_shortname === "undefined" || disqus_shortname === null) return null

    const [ current, setCurrent ] = useState<AnilistEpisodeInterface>()

    useEffect(() => {
        const firstEpisode = episodes?.find(ep => ep?.number === 1) 

        const identifier = watchParams ? watchParams : firstEpisode?.id
    
        const currentEpisode = episodes?.findIndex(episode => episode?.id === identifier)
        
        const current = episodes[currentEpisode]

        setCurrent(current)
    }, [watchParams])

    const disqusConfig = {
        url: `https://www.soma-tv.me/watch/${current?.id}`,
        identifier: current?.id,
        title: `${current?.id?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}`
    }

    return (
        <div className="container p-5">
            <DiscussionEmbed 
                shortname={disqus_shortname as string}
                config={disqusConfig}
            />
        </div>
    )
}
