import { ClockIcon } from "@/icons"
import { AnilistInfoInterface } from "@/types"
import { useEffect, useState } from "react"

type Props = {
    airingDate: string
    currentAnime: AnilistInfoInterface
    nextAiringEpisode: {
        airingTime: number
        timeUntilAiring: number
        episode: number
    }
}

function formatTime(duration: number): string {
    const days = Math.floor(duration / (1000 * 60 * 60 * 24))
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))

    return `${days}d ${hours}h ${minutes}m`
}

export default function CountDown({ airingDate, currentAnime, nextAiringEpisode }: Props) {
    const [countdown, setCountdown] = useState<string>('')

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime()
            const target = nextAiringEpisode.airingTime * 1000
            const remainingTime = target - now

            setCountdown(formatTime(remainingTime))

            if (remainingTime <= 0) {
                clearInterval(intervalId)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [nextAiringEpisode])

    return countdown && (
        <div className="flex gap-x-2 items-center">
            <div className="text-[13px] flex justify-center text-white bg-cyan-500 rounded-sm px-2 py-1 font-semibold relative group cursor-default tracking-wider" 
                style={{
                    backgroundColor: currentAnime?.color || ''
                }}
            >
                <span>
                    EP {currentAnime?.nextAiringEpisode?.episode}: 
                </span> {" "}
                {countdown}
                <div className="absolute opacity-0 -mt-8 w-fit whitespace-nowrap bg-white text-black shadow-md h-fit z-10 px-3 py-1 group-hover:opacity-100 group-hover:-mt-10 transition-all duration-500 rounded-full font-medium">
                    {airingDate}
                </div>
            </div>
            <ClockIcon className="size-6 hidden md:block" />
        </div>
    )
}
