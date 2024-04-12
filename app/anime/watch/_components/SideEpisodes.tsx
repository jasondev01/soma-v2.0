'use client'

import { AngleArrow, SortTwoArrows } from '@/icons'
import { AnilistEpisodeInterface, AnilistInfoInterface, WatchedInterface } from '@/types'
import { isEpisodeWatched } from '@/utils/helper'
import useLocalStorage from '@/utils/localStorage'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

type Props = {
    data: AnilistInfoInterface
    currentEpisode?: AnilistEpisodeInterface
}

export default function SideEpisodes({ data, currentEpisode }: Props) {
    const [ watched, setWatched ] = useState<WatchedInterface>()
    const [ nextEpisode, setNextEpisode ] = useState<AnilistEpisodeInterface>()
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState<AnilistEpisodeInterface[]>([])
    const [ displayedLessEpisodes, setDisplayedLessEpisodes ] = useState<AnilistEpisodeInterface[]>(data?.episodes)
    const [ itemHovered, setItemHovered ] = useState('')
    const [ isRangeClicked, setIsRangeClicked ] = useState(false)
    const [ displayRange, setDisplayRange ] = useState("")
    const [ activeRange, setActiveRange ] = useState<number>(0)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { getWatched } = useLocalStorage()
    const pathname = usePathname()

    useEffect(() => {
        const watchedAnime: WatchedInterface[] = getWatched()
        if (!watchedAnime || watchedAnime?.length === 0) return
        const anime = watchedAnime.find(anime => anime?.id === data?.id)
        const currentIndex = data?.episodes?.findIndex(episode => episode?.id === currentEpisode?.id)
        const nextEpisode = data?.episodes[currentIndex + 1]
        if (nextEpisode) {
            setNextEpisode(nextEpisode)
        }
        if (!anime) return
        setWatched(anime)
    }, [data, currentEpisode, pathname])

    const rangeSize = 35
    const totalEpisodes = data?.episodes?.length
    const numRanges = Math.ceil(totalEpisodes / rangeSize)

    const range: { start: number, end: number }[] = []
    for (let i = 0; i < numRanges; i++) {
        const start = i * rangeSize
        const end = Math.min(start + rangeSize - 1, totalEpisodes - 1)
        range.push({ start, end })
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

    const onMouseEnter = (id: string) => {
        setItemHovered(id)
    }

    const onMouseLeave = () => {
        setItemHovered('')
    }

    const handleRangeClick = (r: { start: number, end: number }, i: number) => {
        const start = r.start
        const end = r.end
        const episodesToShow = data?.episodes.slice(start, end + 1)
        setDisplayedEpisodes(episodesToShow)
        setActiveRange(i)
        setDisplayRange(`${start + 1}-${end + 1}`)
        setIsRangeClicked(false)
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

    return (
        <>
            <div className={`${nextEpisode ? "pb-3" : "" } border-b border-white/20  ${totalEpisodes >= 12 ? "pr-[18px]" : "pr-2.5" }`}>
                <span className='block text-1xl font-semibold tracking-wide mb-2'>
                    {nextEpisode ? "Next Episode" : "Episodes"}
                </span>
                {nextEpisode && (
                    <Link 
                        href={`/anime/watch/${data?.id}?episode=${nextEpisode?.id}`} 
                        className='h-[100px] first:mt-0 mt-2.5 w-full rounded-lg bg-gray-900/80 flex items-center'
                    >
                        <div className='w-[44%] shrink-0 h-full relative'>
                            <img
                                src={nextEpisode?.image === data?.image ? data?.cover : data?.image || data?.cover}
                                alt={nextEpisode?.title || 'none'}
                                width={120}
                                height={120}
                                className="object-cover w-full h-full rounded-lg"
                            />
                            <span className='text-xs font-medium p-1.5 bg-black/70 absolute bottom-1.5 left-1.5 rounded-sm'>
                                Ep {nextEpisode?.number}
                            </span>
                        </div>
                        <div className='p-3'>
                            <span className='text-xs font-medium italic line-clamp-1'>
                                {nextEpisode?.title}
                            </span>
                            <p className="text-[11px] font-normal italic line-clamp-2 text-white/50">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, fugit!
                                {nextEpisode?.description}
                            </p>
                        </div>
                    </Link>
                )}
            </div>
            <div className='pt-3 '>
                <div className='mb-3 flex gap-x-2 items-center w-full justify-end'>
                    <div className="flex gap-x-4 items-center w-full h-full justify-between md:w-fit" >
                        {totalEpisodes > 35 && (
                            <div className="rounded-md px-2 py-1.5 bg-gray-900/90 text-xs font-semibold relative !select-none ">
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
                                    <AngleArrow
                                        className={`h-5 w-5 transition-all duration-300 ease-in-out ${
                                            isRangeClicked ? "-rotate-180" : ""
                                        }`}
                                    />
                                </div>
                                <div className={`absolute z-[999] left-0 rounded-md origin-bottom mt-2.5 w-full min-h-10 bg-gray-900 p-1 flex-col gap-y-1 shadow-[0_0_10px_-4px] shadow-black ${range?.length > 10 ? "overflow-y-auto h-96" : "h-fit" } ${isRangeClicked ? "flex" : "hidden"}`}>
                                    {range?.map((r, idx) => (
                                        <button
                                            key={idx}
                                            className={`text-left px-2 py-1.5 hover:bg-cyan-800 rounded-md ${activeRange === idx ? "bg-cyan-400/30" : "" }`}
                                            onClick={() => handleRangeClick(r, idx) }
                                        >
                                            {`${r.start + 1} - ${r.end + 1}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={() => toggleSortOrder()} className='block w-fit' title="Sort ASC/DESC">
                        <SortTwoArrows
                            className="size-5 group-hover:stroke-red-500 transition-all"
                        />
                    </button>
                </div>
                <div className={'h-[1200px] overflow-y-auto side_episodes pr-2.5 group'}>
                    {totalEpisodes > 35 ?
                     displayedEpisodes?.map(ep => (
                        <Link 
                            key={ep?.id} 
                            href={`/anime/watch/${data?.id}?episode=${ep?.id}`} 
                            className={`h-[100px] first:mt-0 mt-2.5 w-full hover:!opacity-100 group-hover:opacity-50 rounded-lg bg-gray-900/80 flex items-center border border-transparent transition-all hover:shadow-[0_0_10_-2px] hover:shadow-cyan-300  `}
                            style={{
                                border: isEpisodeWatched(ep?.id, watched) || currentEpisode?.id === ep?.id || itemHovered === ep?.id ? `1px solid ${data?.color || "sky"}` : '',
                                opacity: isEpisodeWatched(ep?.id, watched) && currentEpisode?.id !== ep?.id ? `0.40` : ''
                            }}
                            onMouseEnter={() => onMouseEnter(ep?.id)}
                            onMouseLeave={() => onMouseLeave()}
                        >
                            <div className='w-[44%] shrink-0 h-full relative'>
                                <img
                                    src={ep?.image === data?.image ? data?.cover : ep?.image || data?.cover}
                                    alt={ep?.title || 'none'}
                                    width={120}
                                    height={120}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                                <span className='text-xs font-medium p-1.5 bg-black/70 absolute bottom-1.5 left-1.5 rounded-sm'>
                                    Ep {ep?.number}
                                </span>
                            </div>
                            <div className='p-3'>
                                <span className='text-xs font-medium italic line-clamp-1'>
                                    {ep?.title || `Episode ${ep?.number}`}
                                </span>
                                <p className="text-[11px] font-normal italic line-clamp-2 text-white/50">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, fugit!
                                    {ep?.description}
                                </p>
                            </div>
                        </Link>
                    ))
                    : displayedLessEpisodes?.map(ep => (
                        <Link 
                            key={ep?.id} 
                            href={`/anime/watch/${data?.id}?episode=${ep?.id}`} 
                            className={`h-[100px] first:mt-0 mt-2.5 w-full hover:!opacity-100 group-hover:opacity-50 rounded-lg bg-gray-900/80 flex items-center border border-transparent transition-all hover:shadow-[0_0_10_-2px] hover:shadow-cyan-300  `}
                            style={{
                                border: isEpisodeWatched(ep?.id, watched) || currentEpisode?.id === ep?.id || itemHovered === ep?.id ? `1px solid ${data?.color || "sky"}` : '',
                                opacity: isEpisodeWatched(ep?.id, watched) && currentEpisode?.id !== ep?.id ? `0.40` : '1'
                            }}
                            onMouseEnter={() => onMouseEnter(ep?.id)}
                            onMouseLeave={() => onMouseLeave()}
                        >
                            <div className='w-[44%] shrink-0 h-full relative'>
                                <img
                                    src={ep?.image === data?.image ? data?.cover : ep?.image || data?.cover}
                                    alt={ep?.title || 'none'}
                                    width={120}
                                    height={120}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                                <span className='text-xs font-medium p-1.5 bg-black/70 absolute bottom-1.5 left-1.5 rounded-sm'>
                                    Ep {ep?.number}
                                </span>
                            </div>
                            <div className='p-3'>
                                <span className='text-xs font-medium italic line-clamp-1'>
                                    {ep?.title || `Episode ${ep?.number}`}
                                </span>
                                <p className="text-[11px] font-normal italic line-clamp-2 text-white/50">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, fugit!
                                    {ep?.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
