"use client"

import { AngleArrow, SortTwoArrows } from "@/icons"
import { AnilistEpisodeInterface, AnilistInfoInterface, WatchedInterface } from "@/types"
import { isEpisodeWatched } from "@/utils/helper"
import useLocalStorage from "@/utils/localStorage"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

type Props = {
    data: AnilistInfoInterface
    currentEpisode?: AnilistEpisodeInterface
}

export default function WatchEpisodes({ data, currentEpisode }: Props) {
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState<AnilistEpisodeInterface[]>([])
    const [ displayedLessEpisodes, setDisplayedLessEpisodes ] = useState<AnilistEpisodeInterface[]>(data?.episodes)
    const [ isRangeClicked, setIsRangeClicked ] = useState(false)
    const [ displayRange, setDisplayRange ] = useState("")
    const [ activeRange, setActiveRange ] = useState<number>(0)
    const [ watched, setWatched ] = useState<WatchedInterface>()
    const { getWatched } = useLocalStorage()
    const [ itemHovered, setItemHovered ] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const watchedAnime: WatchedInterface[] = getWatched()
        if (!watchedAnime || watchedAnime.length === 0) return
        const anime = watchedAnime.find(
            (anime) => anime?.id === data?.id
        )
        if (!anime) return
        setWatched(anime)
    }, [data])

    const rangeSize = 35
    const totalEpisodes = data?.episodes?.length
    const numRanges = Math.ceil(totalEpisodes / rangeSize)

    const range: { start: number, end: number }[] = []
    for (let i = 0; i < numRanges; i++) {
        const start = i * rangeSize
        const end = Math.min(start + rangeSize - 1, totalEpisodes - 1)
        range.push({ start, end })
    }

    const handleRangeClick = (r: { start: number, end: number }, i: number) => {
        const start = r.start
        const end = r.end
        const episodesToShow = data?.episodes?.slice(start, end + 1)
        setDisplayedEpisodes(episodesToShow)
        setActiveRange(i)
        setDisplayRange(`${start + 1}-${end + 1}`)
        setIsRangeClicked(false)
    }

    useEffect(() => {
        if (!currentEpisode) return

        if (range?.length > 0) {
            setDisplayedEpisodes(data?.episodes?.slice(0, 35))
        }
    
        const rangeIndex = range.findIndex(({ start, end }) => {
            return currentEpisode.number >= start + 1 && currentEpisode.number <= end + 1
        })
    
        if (rangeIndex !== -1) {
            const activeRange = range[rangeIndex]
            setActiveRange(rangeIndex);
            const episodesToShow = data?.episodes?.slice(activeRange.start, activeRange.end + 1)
            setDisplayedEpisodes(episodesToShow)
            setDisplayRange(`${activeRange.start + 1}-${activeRange.end + 1}`)
        }
    }, [currentEpisode])


    const toggleSortOrder = () => {
        if (totalEpisodes > 35) {
            const sortedEpisodes = [...displayedEpisodes].reverse()
            setDisplayedEpisodes(sortedEpisodes)
        } else {
            let sortedEpisodes = [...displayedLessEpisodes].reverse()
            setDisplayedLessEpisodes(sortedEpisodes)
        }
    }

    useEffect(() => {
        const handleBodyClick = (event: MouseEvent) => {
            if (!dropdownRef.current?.contains(event.target as Node)) {
                setIsRangeClicked(false)
            }
        }
        document.addEventListener('click', handleBodyClick)
        return () => {
            document.removeEventListener('click', handleBodyClick)
        }
    }, [])

    const onMouseEnter = (id: string) => {
        setItemHovered(id)
    }

    const onMouseLeave = () => {
        setItemHovered('')
    }

    return (
        <div className="w-full h-fit mt-5 block xl:hidden">
            <div className="flex justify-between items-start md:items-center flex-row">
                <div className="flex items-center justify-between w-full md:w-fit">
                    <h2 className="text-lg md:text-xl font-bold uppercase after block h-[25px] w-fit">
                        Episodes
                    </h2>
                </div>

                <div className="flex gap-x-4 items-center h-full w-fit">
                    {totalEpisodes > 35 && (
                        <div className="rounded-md px-2 py-1.5 bg-slate-800/60 text-xs font-semibold relative !select-none ">
                            <div
                                ref={dropdownRef}
                                className="flex gap-x-2 justify-between items-center w-[100px] shadow-sm cursor-pointer"
                                onClick={() => setIsRangeClicked((prev) => !prev)}
                            >
                                {!displayRange ? (
                                    <span>
                                        {range[0].start + 1} -{" "}
                                        {range[0].end + 1}
                                    </span>
                                ) : (
                                    <span>{displayRange}</span>
                                )}
                                <AngleArrow className={`size-5 transition-all duration-300 ease-in-out ${ isRangeClicked ? "-rotate-180" : "" }`} />
                            </div>
                            <div
                                className={`absolute z-[999] left-0 rounded-md origin-bottom mt-2.5 w-full min-h-10 bg-slate-900 p-1 flex-col gap-y-1 shadow-[0_0_10px_-4px] shadow-black ${
                                    range?.length > 10 ? "overflow-y-auto h-48" : "h-fit"
                                } ${isRangeClicked ? "flex" : "hidden"}`}
                            >
                                {range?.map((r, idx) => (
                                    <button
                                        key={idx}
                                        className={`text-left px-2 py-1 hover:bg-cyan-800 rounded-sm ${
                                            activeRange === idx ? "bg-cyan-400/30" : ""
                                        }`}
                                        onClick={() => handleRangeClick(r, idx)}
                                    >
                                        {`${r.start + 1} - ${r.end + 1}`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex items-center justify-end">
                        <button onClick={() => toggleSortOrder()}>
                            <SortTwoArrows className="size-[22px] group-hover:stroke-red-500 transition-all"/>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`my-4 ep_section text-xs lg:text-sm font-medium episodes text-center !h-fit
                } ${totalEpisodes > 55 ? "!h-[500px]" : "h-fit"}`}
            >
                {totalEpisodes > 200 ? (
                    displayedEpisodes?.map((ep) => (
                        <Link
                            key={ep?.number}
                            href={`/anime/watch/${data?.id}?episode=${ep?.id}`}
                            className={`py-2 w-full rounded-md bg-gray-900/90 transition-all text-white/80 hover:text-white/100 border border-transparent`}
                            style={{
                                border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id || currentEpisode?.id === ep?.id ? `1px solid ${data?.color || "sky"}` : '',
                                opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1',
                                boxShadow: itemHovered === ep?.id ? `0 0 10px -2px ${data?.color || "sky"}` : ''
                            }}
                            onMouseEnter={() => onMouseEnter(ep?.id)}
                            onMouseLeave={() => onMouseLeave()}
                        >
                            {ep?.number}
                        </Link>
                    ))
                ) : displayedLessEpisodes?.length > 0 ? (
                    displayedLessEpisodes?.map((ep) => (
                        <Link
                            key={ep?.number}
                            href={`/anime/watch/${data?.id}?episode=${ep?.id}`}
                            className={`py-2 w-full rounded-md bg-gray-900/90 transition-all text-white/80 hover:text-white/100 border border-transparent`}
                            style={{
                                border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id || currentEpisode?.id === ep?.id ? `1px solid ${data?.color || "sky"}` : '',
                                opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1',
                                boxShadow: itemHovered === ep?.id ? `0 0 10px -2px ${data?.color || "sky"}` : ''
                            }}
                            onMouseEnter={() => onMouseEnter(ep?.id)}
                            onMouseLeave={() => onMouseLeave()}
                        >
                            {ep?.number}
                        </Link>
                        )
                    )
                ) : (
                    <p>NO EPISODE</p>
                )}
            </div>
        </div>
    )
}
