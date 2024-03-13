"use client"

import { EpisodeInterface } from "@/types"
import Link from "next/link"
import { useState } from "react"

type Props = {
    episodes: EpisodeInterface[]
    currentEpisode: number
}

export default function SelectEpisode({ episodes, currentEpisode }: Props) {
    const [clicked, setClicked] = useState(false)

    const current = episodes[currentEpisode]

    return (
        <div className="mb-2 h-10 w-full">
            <div className="w-fit h-full text-xs tracking-wide font-semibold relative !select-none">
                <div
                    className="px-3 h-full uppercase flex items-center gap-x-1 bg-black/50 cursor-pointer"
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
                    <div
                        className={`py-1 uppercase gap-x-1 bg-black/70 mt-[2px] origin-bottom relative z-[99] flex flex-col  ${
                            episodes.length > 12
                                ? "overflow-y-auto h-96"
                                : "h-fit"
                        }`}
                    >
                        {episodes
                            .slice()
                            .reverse()
                            .map((episode) => (
                                <Link
                                    href={`/watch/${episode?.id}`}
                                    className={`hover:bg-black transition-all py-2 px-3 ${
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
        </div>
    )
}
