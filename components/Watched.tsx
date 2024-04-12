'use client'

import { CloseIcon, SimplePlayButton } from "@/icons"
import { WatchedInterface } from "@/types"
import useLocalStorage from "@/utils/localStorage"
import Link from "next/link"
import { useEffect, useState } from "react"
import Slider from "./Slider"
import { SwiperSlide } from "swiper/react"
import { breakpoint2 } from "@/utils/breakpoints"
import { IoChevronForward } from "react-icons/io5";

export default function Watched() {
    const [ watched, setWatched ]  = useState<WatchedInterface[] | null>([])
    const [ itemHovered, setItemHovered ] = useState('')
    const { getWatched, removeWatched } = useLocalStorage()

    useEffect(() => {
        const watchedAnime = getWatched()
        setWatched(watchedAnime)
    }, [])

    const handleDeletedWatchedItem = (id: string) => {
        removeWatched(id)
        setWatched((prevWatched: WatchedInterface[] | null) => {
            return prevWatched && prevWatched.length > 0
                ? prevWatched.filter((item: WatchedInterface) => item.id !== id)
                : null
        })
    }

    const formatTime = (timeWatched: number, duration: number): string => {
        const format = (time: number): string => {
            const minutes = Math.floor((time % 3600) / 60)
            const seconds = Math.floor(time % 60)
    
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        };
    
        const formattedTimeWatched = format(timeWatched)
        const formattedDuration = format(duration)
    
        return `${formattedTimeWatched} / ${formattedDuration}`
    }

    const onMouseEnter = (id: string) => {
        setItemHovered(id)
    }

    const onMouseLeave = () => {
        setItemHovered('')
    }

    return (
        <section>
            {watched && watched.length > 0 && (
                <div className="container mt-10">
                    <h2 className="text-lg md:text-xl font-bold uppercase after">
                        Continue Watching
                    </h2>
                    <Slider breakpoint={breakpoint2} className="watched" >
                        {watched?.slice()?.reverse()?.map(anime => (
                            <SwiperSlide key={anime?.id}>
                                <div 
                                    key={anime?.ep?.at(-1)?.id}
                                    className="h-[165px] lg:h-[210px] block relative group overflow-hidden border border-transparent transition-all duration-300"
                                    style={{
                                        borderColor: itemHovered === anime?.id ? anime?.color : '',                                        boxShadow: itemHovered === anime?.id ? `0 0 5px 1px ${anime?.color}` : '',
                                    }}
                                    onMouseEnter={() => onMouseEnter(anime?.id)}
                                    onMouseLeave={() => onMouseLeave()}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                                    <img 
                                        src={anime?.image}
                                        alt={anime?.title}
                                        width={250}
                                        height={250}
                                        className="h-full w-full object-cover group-hover:scale-[102%] transition-all duration-300"
                                    />
                                    <Link 
                                        href={`/anime/watch/${anime?.id}?episode=${anime?.ep?.at(-1)?.id}`}
                                        className="w-full h-full absolute left-0 top-0 z-[5]"
                                        title={anime?.title} 
                                    >
                                        <span className="sr-only">
                                            {anime?.title}
                                        </span>
                                    </Link>
                                    <div className="absolute z-10 top-2 right-1 flex flex-col gap-2.5">
                                        <button 
                                            className="p-1 block rounded-full bg-gray-800 text-[11px]/4 font-semibold uppercase transition-all hover:bg-red-500 relative group/remove shadow-[0_0_10px_-4px] shadow-black"
                                            onClick={() => handleDeletedWatchedItem(anime?.id)}
                                        >   
                                            <span className="block w-fit transition-all group-hover/remove:!rotate-180">
                                                <CloseIcon className="fill-white/80 " />
                                            </span>
                                            <span className="block absolute right-[100%] group-hover/remove:right-[130%] normal-case bottom-0 w-fit whitespace-nowrap text-[10px] py-[3px] px-3.5 opacity-0 group-hover/remove:opacity-100 transtion-all duration-500 font-medium bg-gray-900/90 rounded-md tracking-wide shadow-[0_0_10px_-2px] shadow-black pointer-events-none">
                                                Remove from History
                                            </span>
                                        </button>

                                        {anime?.nextEp?.id && (
                                            <Link 
                                                href={`/anime/watch/${anime?.id}?episode=${anime?.nextEp?.id}`}
                                                className="p-1 block rounded-full bg-gray-800 text-[11px]/4 font-semibold uppercase transition-all hover:bg-cyan-500 relative group/next shadow-[0_0_10px_-4px] shadow-black"
                                            >
                                                <IoChevronForward className="size-3.5" />
                                                <span className="block absolute right-[100%] group-hover/next:right-[130%] normal-case bottom-0 w-fit whitespace-nowrap text-[10px] py-[3px] px-3.5 opacity-0 group-hover/next:opacity-100 transtion-all duration-500 font-medium bg-gray-900/90 rounded-md tracking-wide shadow-[0_0_10px_-2px] shadow-black pointer-events-none">
                                                    Play Next Episode
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="absolute z-[2] bottom-0 left-0 w-full p-2 pt-5 bg-gradient-to-b from-transparent to-black flex flex-col justify-center flex-wrap">
                                        <h3 className="text-sm line-clamp-2 font-semibold"
                                            style={{
                                                textShadow: itemHovered === anime?.id ? `0 2px 2px ${anime?.color}` : ''
                                            }}
                                        >
                                            {anime?.title}
                                        </h3>
                                        <span className="text-[11px] tracking-wide flex gap-1 items-center capitalize font-medium"
                                            style={{
                                                textShadow: itemHovered === anime?.id ? `0 4px 4px ${anime?.color}` : ''
                                            }}
                                        >
                                           {formatTime(anime?.ep?.at(-1)?.timeWatched as number, anime?.ep?.at(-1)?.duration as number )} - Episode {anime?.ep?.at(-1)?.number}
                                        </span>
                                    </div>
                                    <div className="h-[1px] bg-cyan-300 absolute left-0 bottom-0 z-[2]"
                                        style={{ 
                                            width: `${((anime?.ep && anime?.ep?.at(-1)?.timeWatched as number) / (anime?.ep && anime?.ep?.at(-1)?.duration as number)) * 100}%`,
                                            backgroundColor: anime?.color
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Slider>
                </div>
            )}
        </section>
    )
}
