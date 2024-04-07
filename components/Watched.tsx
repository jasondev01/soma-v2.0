'use client'

import { CloseIcon, SimplePlayButton } from "@/icons"
import { WatchedInterface } from "@/types"
import useLocalStorage from "@/utils/localStorage"
import Link from "next/link"
import { useLayoutEffect, useState } from "react"
import Slider from "./Slider"
import { SwiperSlide } from "swiper/react"
import { breakpoint2 } from "@/utils/breakpoints"

export default function Watched() {
    const [ watched, setWatched ]  = useState<WatchedInterface[] | null>([])
    const { getWatched, removeWatched } = useLocalStorage()

    useLayoutEffect(() => {
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
                                    className="h-[165px] lg:h-[250px] block relative group overflow-hidden border border-transparent hover:border-cyan-300 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300 transition-all duration-300"
                                    title={anime?.title}    
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
                                        href={`/anime/${anime?.id}?watch=${anime?.ep?.at(-1)?.id}`}
                                        className="w-full h-full absolute left-0 top-0 z-[5]"
                                        title={anime?.title} 
                                    >
                                        <span className="sr-only">
                                            {anime?.title}
                                        </span>
                                    </Link>
                                    <button 
                                        className="absolute z-10 top-1 right-1 p-1 rounded-full bg-gray-600 text-[11px]/4 font-semibold uppercase shadow-md hover:bg-red-500 transition-all hover:rotate-180"
                                        title={`Remove ${anime?.title} from watched list`}
                                        onClick={() => handleDeletedWatchedItem(anime?.id)}
                                    >
                                        <CloseIcon className="fill-white/80  transtion-all" />
                                    </button>
                                    <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-transparent to-black flex flex-col gap-1 justify-center flex-wrap">
                                        <h3 className="group-hover:text-cyan-300 transition-all text-sm line-clamp-2 ">
                                            {anime?.title}
                                        </h3>
                                        <span className="text-[11px] tracking-wide flex gap-1 items-center uppercase font-semibold group-hover:text-cyan-300 transition-all">
                                            Episode {anime?.ep?.at(-1)?.number}
                                            <SimplePlayButton className="group-hover:fill-cyan-300 transition-all" />
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Slider>
                </div>
            )}
        </section>
    )
}
