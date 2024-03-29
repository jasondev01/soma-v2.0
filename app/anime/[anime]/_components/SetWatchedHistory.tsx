'use client'

import { AnilistEpisodeInterface, AnilistInfoInterface } from '@/types'
import useLocalStorage from '@/utils/localStorage'
import { useLayoutEffect } from 'react'

type Props = {
    info: AnilistInfoInterface
    watchParams: string
}

export default function SetWatchedHistory({ info, watchParams }: Props) {
    const { setWatched } = useLocalStorage()

    useLayoutEffect(() => {
        let currentEp: AnilistEpisodeInterface | undefined
        const episodes = info?.episodes

        if (watchParams) {
            currentEp = episodes?.find(ep => ep?.id === watchParams) as AnilistEpisodeInterface
        } else {
            currentEp = episodes?.find(ep => ep?.number === 1) as AnilistEpisodeInterface
        }

        if(currentEp) {
             setWatched({
                id: info?.id || '',
                title: info?.title?.english || info?.title?.romaji || '',
                image: info?.image || '',
                ep: {
                    id: currentEp?.id || '',
                    number: currentEp?.number || 0,
                },
            });
        }
    }, [info, watchParams])

    return null
}
