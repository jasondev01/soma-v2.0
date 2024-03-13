'use client'

import Artplayer from "artplayer"
import { useEffect } from "react"
import Hls from "hls.js"
import { InfoInterface, SourceInterface, SourcesInterface } from "@/types"

type Props = {
    info: InfoInterface
    source: SourceInterface
}

export default function Player({ info, source }: Props) {

    useEffect(() => {
        const art = new Artplayer({
            container: '.artplayer-app',
            url: source?.sources?.find(source => source?.quality === '720p')?.url || '',
            customType: {
                m3u8: function (video: any, url: string, art: any) {
                    if (Hls.isSupported()) {
                        if (art.hls) art.hls.destroy()
                        const hls = new Hls()
                        hls.loadSource(url)
                        hls.attachMedia(video)
                        art.hls = hls
                        art.on("destroy", () => hls.destroy())
                    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                        video.src = url
                    } else {
                        art.notice.show = "Unsupported playback format"
                    }
                },
            },
            poster: info?.image as string,
            volume: 1,
            isLive: false,
            muted: false,
            autoplay: false,
            autoOrientation: true,
            pip: true,
            autoSize: false,
            autoMini: false,
            screenshot: true,
            setting: true,
            loop: false,
            flip: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            fullscreenWeb: true,
            subtitleOffset: false,
            miniProgressBar: true,
            mutex: true,
            backdrop: true,
            playsInline: true,
            autoPlayback: true,
            airplay: true,
            theme: "#67e8f9",
            moreVideoAttr: {
                crossOrigin: "anonymous",
            },
            quality:
                source && source.sources
                    ? source.sources.map((source: SourcesInterface) => ({
                        default: source.quality === "720p",
                        html: source.quality,
                        url: source.url,
                    }))
                    : [],
            thumbnails: {
                url: info?.image as string,
                number: 60,
                column: 10,
            },
            icons: {},
        })

        return () => {
            art.destroy()
        }
    }, [info, source])

    return (
        <div className="artplayer-app h-[300px] md:h-[450px] xl:h-[650px]" />
    )
}
