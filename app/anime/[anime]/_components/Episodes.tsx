"use client"

import CountDown from "@/components/CountDown"
import { AngleArrow, Folder, SortBox, SortLine, SortTwoArrows } from "@/icons"
import { AnilistEpisodeInterface, AnilistInfoInterface, WatchedInterface } from "@/types"
import { isEpisodeWatched } from "@/utils/helper"
import useLocalStorage from "@/utils/localStorage"
import moment from "moment"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { BsThreeDots } from "react-icons/bs"

type Props = {
    watchParams?: string
    data: AnilistEpisodeInterface[]
    anime: AnilistInfoInterface
}

export default function Episodes({ data, anime: currentAnime }: Props) {
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState<AnilistEpisodeInterface[]>([])
    const [ displayedLessEpisodes, setDisplayedLessEpisodes ] = useState<AnilistEpisodeInterface[]>(data)
    const [ isRangeClicked, setIsRangeClicked ] = useState(false)
    const [ displayRange, setDisplayRange ] = useState("")
    const [ selectedDisplay, setSelectedDisplay ] = useState("box")
    const [ activeRange, setActiveRange ] = useState<number>(0)
    const [ watched, setWatched ] = useState<WatchedInterface>()
    const { getWatched } = useLocalStorage()
    const [ itemHovered, setItemHovered ] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const watchedAnime: WatchedInterface[] = getWatched()
        if (!watchedAnime || watchedAnime?.length === 0) return
        const anime = watchedAnime.find(
            (anime) => anime?.id === currentAnime?.id
        )
        if (!anime) return
        setWatched(anime)
    }, [data])

    const rangeSize = 200
    const totalEpisodes = data?.length
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
        const episodesToShow = data?.slice(start, end + 1)
        setDisplayedEpisodes(episodesToShow)
        setActiveRange(i)
        setDisplayRange(`${start + 1}-${end + 1}`)
        setIsRangeClicked(false)
    }

    useEffect(() => {
        if (range?.length > 0) {
            setDisplayedEpisodes(data?.slice(0, 200))
        }
    }, [])

    const episodeMenus = [
        {
            menu: "box",
            icon: <SortBox className={`size-6 group-hover:stroke-red-500 transition-all ${ selectedDisplay === "box" ? "stroke-red-500" : "" }`} />
        },
        {
            menu: "folder",
            icon: <Folder className={`size-6 group-hover:stroke-red-500 transition-all ${ selectedDisplay === "folder" ? "stroke-red-500" : "" }`} />
        },
        {
            menu: "sortLine",
            icon: <SortLine className={`size-6 group-hover:stroke-red-500 transition-all ${ selectedDisplay === "sortLine" ? "stroke-red-500" : "" }`} />
            
        },
    ]

    const toggleSortOrder = () => {
        if (totalEpisodes > 200) {
            const sortedEpisodes = [...displayedEpisodes].reverse()
            setDisplayedEpisodes(sortedEpisodes)
        } else {
            let sortedEpisodes = [...displayedLessEpisodes].reverse()
            setDisplayedLessEpisodes(sortedEpisodes)
        }
    }

    const onMouseEnter = (id: string) => {
        setItemHovered(id)
    }

    const onMouseLeave = () => {
        setItemHovered('')
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

    const airingDate = moment(currentAnime?.nextAiringEpisode?.airingTime * 1000).format("ddd MMM DD, YYYY, h:mm A [GMT]ZZ")

    return (
        <section className="mt-5">
            <div className="container w-full h-full">
                <div className="flex justify-between items-start md:items-center flex-col gap-y-2.5 md:flex-row">
                    <div className="flex items-center justify-between w-full md:w-fit">
                        <div className="flex items-center gap-x-4">
                            <h2 className="text-lg md:text-xl font-bold uppercase after block h-[25px] w-fit">
                                Episodes
                            </h2>
                            {currentAnime?.status === "Ongoing" &&
                                currentAnime?.type === "TV" && (
                                    <CountDown
                                        airingDate={airingDate}
                                        currentAnime={currentAnime}
                                        nextAiringEpisode={
                                            currentAnime?.nextAiringEpisode
                                        }
                                    />
                                )}
                        </div>
                        <button className="p-1 rounded-md block lg:hidden bg-slate-800/60">
                            <BsThreeDots className="size-6" />
                        </button>
                    </div>

                    <div className="flex gap-x-4 items-center w-full h-full justify-between md:w-fit">
                        {totalEpisodes > 200 && (
                            <div className="rounded-md px-2 py-1.5 bg-slate-800/60 text-xs font-semibold relative !select-none ">
                                <div
                                    ref={dropdownRef}
                                    className="flex gap-x-2 justify-between items-center w-[100px] shadow-sm cursor-pointer"
                                    onClick={() =>
                                        setIsRangeClicked((prev) => !prev)
                                    }
                                >
                                    {!displayRange ? (
                                        <span>
                                            {range[0].start + 1} -{" "}
                                            {range[0].end + 1}
                                        </span>
                                    ) : (
                                        <span>{displayRange}</span>
                                    )}
                                    <AngleArrow  className={`h-5 w-5 transition-all duration-300 ease-in-out ${isRangeClicked ? "-rotate-180" : "" }`} />
                                </div>
                                <div className={`absolute z-[999] left-0 rounded-md origin-bottom mt-2.5 w-full min-h-10 bg-slate-900 p-1 flex-col gap-y-1 shadow-[0_0_10px_-2px] shadow-black ${
                                        range?.length > 10
                                            ? "overflow-y-auto h-96"
                                            : "h-fit"
                                    } ${isRangeClicked ? "flex" : "hidden"}`}
                                >
                                    {range?.map((r, idx) => (
                                        <button
                                            key={idx}
                                            className={`text-left px-2 py-2 hover:bg-cyan-800 rounded-md ${activeRange === idx ? "bg-cyan-400/30" : "" }`}
                                            onClick={() => handleRangeClick(r, idx) }
                                        >
                                            {`${r.start + 1} - ${r.end + 1}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex gap-x-4 items-center justify-end flex-1">
                            {episodeMenus.map(({ menu, icon }) => (
                                <button
                                    key={menu}
                                    className="cursor-pointer group"
                                    onClick={() => setSelectedDisplay(menu)}
                                >
                                    {icon}
                                </button>
                            ))}
                            <button onClick={() => toggleSortOrder()}>
                                <SortTwoArrows
                                    className={`size-[22px] group-hover:stroke-red-500 transition-all ${selectedDisplay === "sortArrows" ? "stroke-red-500" : "" }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`my-4 pr-3 ep_section text-xs lg:text-sm font-medium ${
                        selectedDisplay === "folder"
                            ? "grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 h-[500px] overflow-y-auto"
                            : selectedDisplay === "box"
                                ? "h-[500px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto"
                                : "episodes text-center !h-fit"
                    } ${totalEpisodes > 55 ? "!h-[500px]" : "h-fit"}`}
                >
                    {totalEpisodes > 200 ? (
                        displayedEpisodes?.map((ep) => {
                            return selectedDisplay === "folder" ? (
                                <Link
                                    key={ep?.number}
                                    href={`/anime/watch/${currentAnime?.id}?episode=${ep?.id}`}
                                    className={`h-[130px] flex gap-x-3 p-3 rounded-md transtion-all border border-transparent bg-gray-900/90 duration-200 ease-in-out`}
                                    style={{
                                        border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id ? `1px solid ${currentAnime?.color || "sky"}` : '',
                                        opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1'
                                    }}
                                    onMouseEnter={() => onMouseEnter(ep?.id)}
                                    onMouseLeave={() => onMouseLeave()}
                                >
                                    <div className="basis-1/4 shrink-0 overflow-hidden rounded-md relative">
                                        <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                                        <img
                                            src={ep?.image === currentAnime?.image ? currentAnime?.cover : ep?.image || currentAnime?.cover }
                                            alt={ep?.title}
                                            width={200}
                                            height={200}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col items-start justify-center">
                                        <h3>
                                            {ep?.number}.{" "}
                                            {ep?.title ??
                                                `Episode ${ep?.number}`}
                                        </h3>
                                        <p className="text-sm">
                                            {ep?.description}
                                        </p>
                                    </div>
                                </Link>
                            ) : selectedDisplay === "box" ? (
                                <Link
                                    key={ep?.number}
                                    href={`/anime/watch/${currentAnime?.id}?episode=${ep?.id}`}
                                    className={`w-full h-[130px] rounded-md border border-transparent transition-all text-white/80 hover:text-white/100 relative overflow-hidden `}
                                    style={{
                                        border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id ? `1px solid ${currentAnime?.color || "sky"}` : '',
                                        opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1',
                                        boxShadow: itemHovered === ep?.id ? `0 0 10px -2px ${currentAnime?.color || "sky"}` : ''
                                    }}
                                    onMouseEnter={() => onMouseEnter(ep?.id)}
                                    onMouseLeave={() => onMouseLeave()}
                                >
                                    <div className="absolute left-0 top-0 w-full h-full" />
                                    <img
                                        src={ep?.image === currentAnime?.image ? currentAnime?.cover : ep?.image || currentAnime?.cover }
                                        alt={ep?.title || "none"}
                                        width={120}
                                        height={120}
                                        className="object-cover w-full h-full"
                                    />
                                    <span className="absolute text-xs left-0 bottom-0 w-full h-fit p-2 bg-gray-900">
                                        Episode {ep?.number}
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    key={ep?.number}
                                    href={`/anime/watch/${currentAnime?.id}?episode=${ep?.id}`}
                                    className={`py-2 w-full rounded-md bg-gray-900/90 transition-all text-white/80 hover:text-white/100 border border-transparent`}
                                    style={{
                                        border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id ? `1px solid ${currentAnime?.color || "sky"}` : '',
                                        opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1',
                                        boxShadow: itemHovered === ep?.id ? `0 0 10px -2px ${currentAnime?.color || "sky"}` : ''
                                    }}
                                    onMouseEnter={() => onMouseEnter(ep?.id)}
                                    onMouseLeave={() => onMouseLeave()}
                                >
                                    {ep?.number}
                                </Link>
                            )
                        })
                    ) : displayedLessEpisodes?.length > 0 ? (
                        displayedLessEpisodes?.map((ep) => {
                            return selectedDisplay === "folder" ? (
                                <Link
                                    key={ep?.number}
                                    href={`/anime/watch/${currentAnime?.id}?episode=${ep?.id}`}
                                    className={`h-[130px] flex gap-x-3 p-3 rounded-md transtion-all border border-transparent bg-gray-900/90 duration-200 ease-in-out`}
                                    style={{
                                        border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id ? `1px solid ${currentAnime?.color || "sky"}` : '',
                                        opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1'
                                    }}
                                    onMouseEnter={() => onMouseEnter(ep?.id)}
                                    onMouseLeave={() => onMouseLeave()}
                                >
                                    <div className="basis-1/4 shrink-0 overflow-hidden rounded-md relative">
                                        <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                                        <img
                                            src={ep?.image === currentAnime?.image ? currentAnime?.cover : ep?.image || currentAnime?.cover }
                                            alt={ep?.title}
                                            width={200}
                                            height={200}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col items-start justify-center">
                                        <h3>
                                            {ep?.number}.{" "}
                                            {ep?.title ??
                                                `Episode ${ep?.number}`}
                                        </h3>
                                        <p className="text-sm">
                                            {ep?.description}
                                        </p>
                                    </div>
                                </Link>
                            ) : selectedDisplay === "box" ? (
                                <Link
                                    key={ep?.number}
                                    href={`/anime/watch/${currentAnime?.id}?episode=${ep?.id}`}
                                    className={`w-full h-[130px] rounded-md border border-transparent transition-all text-white/80 hover:text-white/100 relative overflow-hidden `}
                                    style={{
                                        border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id ? `1px solid ${currentAnime?.color || "sky"}` : '',
                                        opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1',
                                        boxShadow: itemHovered === ep?.id ? `0 0 10px -2px ${currentAnime?.color || "sky"}` : ''
                                    }}
                                    onMouseEnter={() => onMouseEnter(ep?.id)}
                                    onMouseLeave={() => onMouseLeave()}
                                >
                                    <div className="absolute left-0 top-0 w-full h-full" />
                                    <img
                                        src={ep?.image === currentAnime?.image ? currentAnime?.cover : ep?.image || currentAnime?.cover }
                                        alt={ep?.title || "none"}
                                        width={120}
                                        height={120}
                                        className="object-cover w-full h-full"
                                    />
                                    <span className="absolute text-xs left-0 bottom-0 w-full h-fit p-2 bg-gray-900">
                                        Episode {ep?.number}
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    key={ep?.number}
                                    href={`/anime/watch/${currentAnime?.id}?episode=${ep?.id}`}
                                    className={`py-2 w-full rounded-md bg-gray-900/90 transition-all text-white/80 hover:text-white/100 border border-transparent`}
                                    style={{
                                        border: isEpisodeWatched(ep?.id, watched) || itemHovered === ep?.id ? `1px solid ${currentAnime?.color || "sky"}` : '',
                                        opacity: isEpisodeWatched(ep?.id, watched) ? `0.40` : '1',
                                        boxShadow: itemHovered === ep?.id ? `0 0 10px -2px ${currentAnime?.color || "sky"}` : ''
                                    }}
                                    onMouseEnter={() => onMouseEnter(ep?.id)}
                                    onMouseLeave={() => onMouseLeave()}
                                >
                                    {ep?.number}
                                </Link>
                            )
                        })
                    ) : (
                        <p>NO EPISODE</p>
                    )}
                </div>
            </div>
        </section>
    )
}
