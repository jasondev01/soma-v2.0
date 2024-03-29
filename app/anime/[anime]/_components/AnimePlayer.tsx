import React from 'react'
import Player from './Player'
import { AnilistInfoInterface } from '@/types'
import { getSources } from '@/utils/get-anime'
import PrevNext from './PrevNext'

type Props = {
    data: AnilistInfoInterface
    watchParams: string
}

export default async function AnimePlayer({ data, watchParams }: Props) {
    const firstEpisode = data?.episodes?.find(ep => ep?.number === 1) 
    let source, currentEpisode

    if (watchParams) {
        source = await getSources(watchParams)
        currentEpisode = data?.episodes?.find(ep => ep?.id === watchParams)
    } else {
        source = await getSources(firstEpisode?.id as string)
        currentEpisode = data?.episodes?.find(ep => ep?.number === 1) 
    }

    return (
        <>
            <section className="relative h-[350px] sm:h-[500px] xl:h-[75vh] overflow-hidden w-full">
                <div className="container h-full">
                    <Player info={data} source={source} currentEpisode={currentEpisode} />
                </div>
            </section>
            <div className='container mt-4 w-full'>
                <PrevNext data={data} episodes={data?.episodes} watchParams={watchParams || firstEpisode?.id} />
            </div>
        </>
    )
}
