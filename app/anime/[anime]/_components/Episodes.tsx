"use client"

import { AngleArrow, Folder, SortLine, SortTwoArrows } from "@/icons";
import { AnilistEpisodeInterface, AnilistInfoInterface, WatchedInterface } from "@/types";
import useLocalStorage from "@/utils/localStorage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

type Props = {
    watchParams: string
    data: AnilistEpisodeInterface[]
    anime: AnilistInfoInterface
}

export default function Episodes({ watchParams, data, anime: currentAnime }: Props) {
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState<AnilistEpisodeInterface[]>([])
    const [ currentEpisode, setCurrentEpisode ] = useState<AnilistEpisodeInterface>()
    const [ isRangeClicked, setIsRangeClicked ] = useState(false)
    const [ displayRange, setDisplayRange ] = useState('')
    const [ selectedDisplay, setSelectedDisplay ] = useState('folder')
    const [ activeRange, setActiveRange ] = useState<number>(0)
    const [ watched, setWatched ]  = useState<WatchedInterface>()
    const { getWatched } = useLocalStorage()

    useLayoutEffect(() => {
        const watchedAnime: WatchedInterface[] = getWatched()
        if (!watchedAnime || watchedAnime.length === 0) return
        const anime = watchedAnime.find(anime => anime?.id === currentAnime?.id)
        if(!anime) return
        setWatched(anime)
    }, [watchParams, currentEpisode])

    const pathname = usePathname()
    const animmeId = pathname?.split('/').at(-1)

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
        setDisplayRange(`${start+1}-${end + 1}`)
        setIsRangeClicked(false)
    }

    useLayoutEffect(() => {
        let current
        if (watchParams) {
            current = data?.find(ep => ep?.id === watchParams)
        } else {
            current = data?.find(ep => ep?.number === 1)
        }

        setCurrentEpisode(current)
    }, [totalEpisodes, watchParams])

    useLayoutEffect(() => {
        if(range?.length > 0) {
            setDisplayedEpisodes(data?.slice(0, 200))
        }
    }, [])

    const isEpisodeWatched = (episodeId: string) => {
        return watched && watched?.ep?.length !== 0 ? watched?.ep?.some((ep) => ep.id === episodeId) : false
    }

    const episodeMenus = [
        { menu: "folder", icon: <Folder className={`w-6 h-6 group-hover:stroke-red-500 transition-all ${selectedDisplay === 'folder' ? 'stroke-red-500' : ''}`}/> },
        { menu: "sortLine", icon: <SortLine className={`w-6 h-6 group-hover:stroke-red-500 transition-all ${selectedDisplay === 'sortLine' ? 'stroke-red-500' : ''}`} /> },
    ]

    const toggleSortOrder = () => {
        const sortedEpisodes = [...displayedEpisodes].reverse()
        data.reverse()
        setDisplayedEpisodes(sortedEpisodes)
    }

    return (
        <div className="container w-full h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-bold uppercase after block h-[25px] w-fit">
                    Episodes
                </h2>

                <div className="flex gap-x-4 items-center">
                    {totalEpisodes > 200 && (
                        <div className="rounded-md px-2 py-1.5 bg-slate-800/60 text-[10px] md:text-xs font-semibold relative !select-none ">
                            <div className="flex gap-x-2 justify-between items-center w-[100px] shadow-sm cursor-pointer"
                                onClick={() => setIsRangeClicked(prev => !prev)}
                            >
                                { !displayRange ? (
                                    <span>
                                        {range[0].start + 1 } - {range[0].end + 1}
                                    </span>
                                ): (
                                    <span>
                                        {displayRange}
                                    </span>
                                )}
                                <AngleArrow className={`h-5 w-5 transition-all duration-300 ease-in-out ${isRangeClicked ? '-rotate-180' : ''}`} />
                            </div>
                            <div className={`absolute z-[999] left-0 rounded-md origin-bottom mt-2.5 w-full min-h-10 bg-slate-900 p-1 flex-col gap-y-1 shadow-md ${range?.length > 10 ? 'overflow-y-auto h-96' : "h-fit"} ${isRangeClicked ? 'flex' : 'hidden'}`}>
                                {range?.map((r, idx) => (
                                    <button
                                        key={idx}
                                        className={`text-left px-2 py-2 hover:bg-cyan-800 rounded-md ${activeRange === idx ? 'bg-cyan-400/30' : ''}`}
                                        onClick={() => handleRangeClick(r, idx)}
                                    >
                                        {`${r.start + 1} - ${r.end + 1}`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {episodeMenus.map(({menu, icon}) => (
                        <button key={menu}
                            className="cursor-pointer group"
                            onClick={() => setSelectedDisplay(menu)}
                        >
                            {icon}
                        </button>
                    ))}
                    <button onClick={() => toggleSortOrder()}>
                        <SortTwoArrows className={`w-[22px] h-[22px] group-hover:stroke-red-500 transition-all ${selectedDisplay === 'sortArrows' ? 'stroke-red-500' : ''}`} 
                            
                        />
                    </button>
                </div>
            </div>
            <div className={`my-4 pr-3 ep_section text-sm font-medium ${selectedDisplay === 'folder' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 !h-[500px] overflow-y-auto' : 'episodes text-center !h-fit'} ${totalEpisodes > 55 ? 'h-[500px]' : 'h-fit' }`}>
                {totalEpisodes > 200 ? (
                    displayedEpisodes?.map(ep => {
                        return selectedDisplay === 'folder' ? (
                            <Link key={ep?.number} href={`/anime/${animmeId}?watch=${ep?.id}`} className={`h-[130px] flex gap-x-3 p-3 rounded-md transtion-all hover:bg-cyan-400/30 duration-200 ease-in-out ${currentEpisode?.id === ep?.id ? 'bg-cyan-400/30' : 'bg-slate-800/60 '} ${isEpisodeWatched(ep?.id) ? '!bg-cyan-400/30' : ''}`}>
                                <div className="basis-1/4 shrink-0 overflow-hidden rounded-md relative">
                                    <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                                    <img 
                                        src={ep?.image} 
                                        alt={ep?.title}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-center">
                                    <h3>
                                        {ep?.number}. {ep?.title}
                                    </h3>
                                    <p className="text-sm">
                                        {ep?.description}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <Link key={ep?.number} href={`/anime/${animmeId}?watch=${ep?.id}`} className={`py-2 w-full rounded-md hover:bg-cyan-800 transition-all text-white/80 hover:text-white/100 ${currentEpisode?.id === ep?.id ? 'bg-cyan-400/30' : 'bg-slate-800/60 '}`}>
                                {ep?.number}
                            </Link>
                        )
                    })
                ): data?.length > 0 ? (
                    data?.map(ep => {
                        return selectedDisplay === 'folder' ? (
                            <Link key={ep?.number} href={`/anime/${animmeId}?watch=${ep?.id}`} className={`h-[130px] flex gap-x-3 p-3 rounded-md transtion-all hover:bg-cyan-400/30 duration-200 ease-in-out ${currentEpisode?.id === ep?.id ? 'bg-cyan-400/30' : 'bg-slate-800/60 '} ${isEpisodeWatched(ep?.id) ? '!bg-cyan-400/30' : ''}`}>
                                <div className="basis-1/4 shrink-0 overflow-hidden rounded-md relative">
                                    <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                                    <img 
                                        src={ep?.image} 
                                        alt={ep?.title}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-center">
                                    <h3>
                                        {ep?.number}. {ep?.title}
                                    </h3>
                                    <p className="text-sm">
                                        {ep?.description}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <Link key={ep?.number} href={`/anime/${animmeId}?watch=${ep?.id}`} className={`py-2 w-full  rounded-md hover:bg-cyan-400/30 transition-all text-white/80 hover:text-white/100 ${currentEpisode?.id === ep?.id ? 'bg-cyan-400/30' : 'bg-slate-800/60 '} ${isEpisodeWatched(ep?.id) ? '!bg-cyan-400/30' : ''}`}>
                                {ep?.number}    
                            </Link>
                        ) 
                    })
                ) : (
                    <p>NO EPISODE</p>
                )}
            </div>
        </div>
    )
}
