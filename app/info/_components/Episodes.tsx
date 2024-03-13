'use client'

import { EpisodeInterface, InfoInterface } from "@/types"
import Link from "next/link";
import { useState } from "react";

type Props = {
    data: InfoInterface
}

export default function Episodes({ data }: Props) { 
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState<EpisodeInterface[]>([])
    const [ activeRange, setActiveRange ] = useState<number>()

    const rangeSize = 200
    const totalEpisodes = data?.episodes?.length
    const numRanges = Math.ceil(totalEpisodes / rangeSize);

    const range = []
    for (let i = 0; i < numRanges; i++) {
        const start = i * rangeSize;
        const end = Math.min(start + rangeSize - 1, totalEpisodes - 1)
        range.push({ start, end })
    }

    const handleRangeClick = (r: { start: number, end: number }, i: number) => {
        const start = r.start
        const end = r.end
        const episodesToShow = data.episodes.slice(start, end + 1)
        setDisplayedEpisodes(episodesToShow)
        setActiveRange(i)
    }

    return (
        <section>
            <div className="container mt-10">
                <h3>
                    Episodes
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-9 mt-5 gap-x-2 md:gap-x-5 gap-y-2 text-sm uppercase text-center">
                    {totalEpisodes > 200 && (
                        range.reverse().map((r, i) => (
                            <button 
                                key={i} 
                                className={`btn btn-primary !px-2 !w-full font-semibold ${activeRange === i ? '!bg-cyan-800 !border-cyan-800 shadow-[0px_0px_5px_1px] shadow-cyan-300' : ''}`}
                                onClick={() => handleRangeClick(r, i)}
                            >
                                {`${r.start + 1}-${r.end + 1}`}
                            </button>
                    )))}
                </div>
                <div className="mt-4 grid grid-cols-3 md:grid-cols-6 xl:grid-cols-9 gap-x-2 md:gap-x-5 gap-y-3 text-sm uppercase text-center">
                    {totalEpisodes > 200 ? (
                        displayedEpisodes?.slice()?.reverse().map(ep => (
                            <Link key={ep.number} href={`/watch/${ep?.id}`} className="btn btn-primary !px-2 !w-full">
                                Ep {ep?.number}
                            </Link>
                        ))
                    ): data?.episodes?.length > 0 ? (
                        data?.episodes?.slice()?.reverse()?.map(ep => (
                            <Link key={ep.number} href={`/watch/${ep?.id}`} className="btn btn-primary !px-2 !w-full">
                                Ep {ep?.number}
                            </Link>
                        ))
                    ) : (
                        <p>NO EPISODE</p>
                    )}
                </div>
            </div>
        </section>
    )
}
