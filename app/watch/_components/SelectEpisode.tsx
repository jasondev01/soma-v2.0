"use client"

import { EpisodeInterface, InfoInterface } from "@/types"
import Link from "next/link"
import { useState } from "react"

type Props = {
    info: InfoInterface
    episodes: EpisodeInterface[]
    currentEpisode: number
}

export default function SelectEpisode({ info, episodes, currentEpisode }: Props) {
    const [clicked, setClicked] = useState(false)

    const current = episodes[currentEpisode]

    return (
        <div className="flex gap-2">
            <div className="w-fit h-full text-xs tracking-wide font-semibold !select-none relative">
                <div
                    className="px-5 h-full uppercase flex items-center gap-x-1 bg-black/50 cursor-pointer"
                    onClick={() => setClicked((prev) => !prev)}
                >
                    <span>Episode {current?.number}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-all duration-300 ${
                            clicked ? "-rotate-180" : ""
                        }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {clicked && (
                    <div className={`uppercase gap-x-1 bg-black/80 mt-[2px] origin-bottom relative !z-[999] flex flex-col  ${
                            episodes.length > 12
                                ? "overflow-y-auto h-96 select_scroll"
                                : "h-fit"
                        }`}
                    >
                        {episodes
                            .slice()
                            .reverse()
                            .map((episode) => (
                                <Link
                                    href={`/watch/${episode?.id}`}
                                    className={`hover:bg-black transition-all py-2.5 px-5 ${
                                        episode?.number === current?.number
                                            ? "bg-black text-cyan-300"
                                            : ""
                                    }`}
                                >
                                    Episode {episode.number}
                                </Link>
                            ))}
                    </div>
                )}
            </div>
            <Link 
                href={`/info/${info?.id}`} 
                className="w-fit grid place-items-center rounded-sm bg-black/50 shadow-none hover:shadow-[0_0_10px_-4px] border border-transparent hover:border-cyan-300/70 hover:shadow-cyan-300 hover:bg-black hover:scale-[97%] transition-all group/right px-3"
                title='Info'
            >
                <span className="sr-only">Info</span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 48 48"
                    className="h-4 md:h-5 w-4 md:w-5 fill-white/50 group-hover/right:fill-white transition-all"
                    stroke="#fff"
                    fill="none"
                >
                    <path 
                        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" 
                    />
                    <path 
                        className="fill-black/50 stroke-black/50 group-hover/right:fill-black group-hover/right:stroke-black"
                        d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z" 
                    />
                </svg>
            </Link>
        </div>
    )
}
