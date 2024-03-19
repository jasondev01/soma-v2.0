'use client'

import { EpisodeInterface, InfoInterface } from '@/types'
import useLocalStorage from '@/utils/localStorage'
import { useLayoutEffect } from 'react'

type Props = {
    info: InfoInterface
    currentEpisode: number
    episodes: EpisodeInterface[]
}

export default function SetWatchedHistory({ info, currentEpisode, episodes }: Props) {
    const { setWatched } = useLocalStorage()

    useLayoutEffect(() => {
        setWatched({
            id: info?.id,
            title: info?.title,
            image: info?.image,
            ep: {
                id: episodes[currentEpisode]?.id,
                number: episodes[currentEpisode]?.number,
            },
        })
    }, [])

    return null
}
