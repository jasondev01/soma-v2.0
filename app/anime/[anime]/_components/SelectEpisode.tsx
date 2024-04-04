"use client"

import { AngleArrow } from "@/icons"
import { AnilistInfoInterface, AnilistEpisodeInterface } from "@/types"
import Link from "next/link"
import { useState } from "react"

type Props = {
    info: AnilistInfoInterface
    episodes: AnilistEpisodeInterface[]
    currentEpisode: number
}

export default function SelectEpisode({ info, episodes, currentEpisode }: Props) {
    const [clicked, setClicked] = useState(false)
    const current = episodes[currentEpisode]

    return (
        <div className="flex gap-2">
            <div className="w-fit h-full text-[10px] md:text-xs tracking-wide font-medium md:font-semibold !select-none relative">
                <div className="px-4 h-full uppercase flex items-center gap-x-1 bg-slate-800 cursor-pointer rounded-md"
                    onClick={() => setClicked((prev) => !prev)}
                >
                    <span>Episode {current?.number}</span>
                    <span className={`transition-all duration-300 ${ clicked ? "-rotate-180" : "" }`}>
                        <AngleArrow className="h-5 w-5" />
                    </span>
                </div>
                {clicked && (
                    <div className={`uppercase gap-x-1 bg-slate-800 mt-1 md:mt-2 origin-bottom relative rounded-md !z-[999] flex flex-col  ${ episodes.length > 12 ? "overflow-y-auto h-96" : "h-fit" }`}
                    >
                        {episodes
                            .slice()
                            .reverse()
                            .map((episode) => (
                                <Link
                                    key={episode?.id}
                                    href={`/anime/${info?.id}?watch=${episode?.id}`}
                                    className={`hover:bg-black transition-all py-1.5 md:py-2.5 px-4 ${
                                        episode?.number === current?.number
                                            ? "bg-cyan-300 text-white"
                                            : ""
                                    }`}
                                >
                                    Episode {episode.number}
                                </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
