import React from 'react'
import Player from './Player'
import { AnilistEpisodeInterface, AnilistInfoInterface } from '@/types'
import { getSkipTimes, getSources } from '@/utils/get-anime'

type Props = {
    data: AnilistInfoInterface
    id: string
    episode: string
    currentEpisode?: AnilistEpisodeInterface
}

export default async function AnimePlayer({ data, id, episode, currentEpisode }: Props) {
    // const [ response, skip ]  = await Promise.all([
    //     getSources(episode),
    //     getSkipTimes(id)
    // ])

    const response = await getSources(episode)

    return !response.error && (
        <section className="h-fit w-full">
            <Player 
                info={data} 
                source={response} 
                currentEpisode={currentEpisode} 
                // skip={skip?.episodes} 
            />
        </section>

    )
}