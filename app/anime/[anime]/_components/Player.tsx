'use client'

import Artplayer from "artplayer"
import { useLayoutEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { AnilistEpisodeInterface, AnilistInfoInterface, SkipTimeInterface, SourceAnilistInterface, SourcesInterface } from "@/types"
import { setTimeout } from "timers"

type Props = {
    info: AnilistInfoInterface
    source: SourceAnilistInterface
    currentEpisode?: AnilistEpisodeInterface
    skip: SkipTimeInterface[]
}

export default function Player({ info, source, currentEpisode, skip }: Props) {
    const artRef = useRef<Artplayer | null>(null)
    
    const [ isSkipTime, setIsSkipTime ] = useState(false)
    const [ intro, setIntro ] = useState({
        end: 0,
        start: 0
    })
    
    useLayoutEffect(() => {
        const skipTime = skip?.find(s => s?.number === currentEpisode?.number)

        setIntro({
            end: skipTime?.intro?.end || 0,
            start: skipTime && skipTime.intro.start < 10 ? 10 : skipTime?.intro?.start || 0
        })

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
            poster: currentEpisode?.image || info?.cover as string || info.image as string,
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
            highlight: [
                {
                    time: skipTime?.intro?.start || 0,
                    text: 'Opening Start',
                },
                {
                    time: skipTime?.intro?.end || 0,
                    text: 'Opening End',
                },
            ],
            icons: {},
        })
    
        artRef.current = art

        return () => {
            art.destroy()
        }
    }, [info, source])

    useLayoutEffect(() => {
        if (artRef?.current) {
            const videoElement = artRef?.current.video
            
            if (videoElement) {
                videoElement.addEventListener('timeupdate', handleTimeUpdate)
            }
        }
    
        return () => {
            if (artRef?.current) {
                const videoElement = artRef?.current.video
                
                if (videoElement) {
                    videoElement.removeEventListener('timeupdate', handleTimeUpdate)
                }
            }
        }
        
    }, [artRef.current, currentEpisode])

    useLayoutEffect(() => {
        const playerContainer = document.querySelector('.artplayer-app .art-video-player');
        playerContainer?.classList.add('relative');

        const buttonElement = document.createElement('button');
        buttonElement.className = `skip-intro-button w-fit absolute top-[15%] px-2 md:px-5 py-2 capitalize font-medium tracking-wide text-sm md:text-base bg-cyan-300 text-white shadow-sm transition-all duration-1000 z-[9999] ${isSkipTime ? 'right-2 lg:right-10 ' : '-right-[100%]'}`;
        buttonElement.textContent = 'Skip Intro';
        buttonElement.addEventListener('click', handleSkipIntro);

        playerContainer && playerContainer.appendChild(buttonElement);

        return () => {
            const existingButton = playerContainer?.querySelector('.skip-intro-button');
            existingButton && playerContainer?.removeChild(existingButton);
        }
    }, [isSkipTime])
    
    
    const handleTimeUpdate = () => {
        if (artRef?.current) {
            if(intro?.start === Math.ceil(artRef?.current?.currentTime)) {
                setIsSkipTime(true)
                setTimeout(() => {
                    setIsSkipTime(false)
                }, 7000)
            }
        }
    }

    const handleSkipIntro = () => {
        if (artRef?.current && artRef?.current?.currentTime) {
            artRef.current.currentTime = intro.end 
            setIsSkipTime(false)
        } 
    }

    return <div className="artplayer-app h-full " />
}
