'use client'

import { AnilistEpisodeInterface, AnilistInfoInterface } from '@/types'
import useLocalStorage from '@/utils/localStorage'
import { useLayoutEffect } from 'react'

type Props = {
    info: AnilistInfoInterface
    currentEpisode?: AnilistEpisodeInterface
    duration: number
    currentTime: number
}

export default function SetWatchedHistory({ info, currentEpisode, duration, currentTime }: Props) {
    const { setWatched } = useLocalStorage()
    
    useLayoutEffect(() => {
        if (currentEpisode && currentTime !== 0) {
            const currentIndex = info?.episodes?.findIndex(episode => episode?.id === currentEpisode?.id)
            const nextEpisode = info?.episodes[currentIndex + 1]

            setWatched({
                id: info.id || '',
                title: info.title?.english || '',
                image: info.image || '',
                ep: {
                    id: currentEpisode.id || '',
                    number: currentEpisode.number || 0,
                    duration: duration || 0,
                    timeWatched: currentTime || 0
                },
                nextEp: {
                    id: nextEpisode?.id || '',
                    number: nextEpisode?.number || 0,
                },
                color: info?.color || "#67e8f9"
            })
        }
    }, [currentTime])

    return null
}
