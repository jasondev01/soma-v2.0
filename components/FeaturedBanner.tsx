'use client'

import { AnilistTrendingInterface, VideoTrailerInterface } from "@/types"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
    data: AnilistTrendingInterface
    video_api?: string
}

export default function FeaturedBanner({ data, video_api }: Props) {
    const [ video, setVideo ] = useState<VideoTrailerInterface>()

    const fetchData = async () => {
        try {
            const response = await fetch(`${video_api}/streams/${data?.trailer?.id}`)

            const result = await response.json()

            if (response.ok && result) {
                setTimeout(() => {
                    setVideo(result)
                }, 3000)
            }
        } catch (error) {
            console.log({error})
        }
    }

    useEffect(() => {
        if(video_api && data?.trailer?.id) {
            fetchData()
        }   
    }, [data, video_api])

    return !video ? (
        <img
            src={data?.cover}
            alt={data?.title?.english}
            width={1200}
            height={1200}
            className="object-cover h-full w-full opacity-40 absolute top-0 left-0"
        />
    ) : (
        <video
            src={video?.videoStreams[0]?.url}
            width={1200}
            height={1200}
            autoPlay
            muted={true}
            loop={true}
            className="object-cover h-full w-full opacity-40 absolute top-0 left-0"
        />
    )
}
