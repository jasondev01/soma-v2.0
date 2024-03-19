'use client'

import { WatchedInterface } from "@/types"
import useLocalStorage from "@/utils/localStorage"
import Image from "next/image"
import Link from "next/link"
import { useLayoutEffect, useState } from "react"

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
                    <h2 className="text-xl font-bold uppercase">
                        Continue Watching
                    </h2>
                    <div className="mt-5 min-h-[250px] grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-7">
                        {watched?.slice()?.reverse()?.map(anime => (
                            <div 
                                key={anime?.ep?.at(-1)?.id}
                                className="h-[250px] block relative group overflow-hidden border border-transparent hover:border-cyan-300 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300 transition-all duration-300"
                                title={anime?.title}    
                            >
                                <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                                <Image 
                                    src={anime?.image}
                                    alt={anime?.title}
                                    width={250}
                                    height={250}
                                    className="h-full w-full object-cover group-hover:scale-[102%] transition-all duration-300"
                                />
                                <Link 
                                    href={`/watch/${anime?.ep?.at(-1)?.id}`}
                                    className="w-full h-full absolute left-0 top-0 z-[5]"
                                />
                                <button 
                                    className="absolute z-10 top-1 right-1 p-1 rounded-full bg-gray-600 text-[11px]/4 font-semibold uppercase shadow-md hover:bg-red-500 transition-all hover:rotate-180"
                                    title={`Remove ${anime?.title} from watched list`}
                                    onClick={() => handleDeletedWatchedItem(anime?.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30" stroke="none" className="fill-white/80  transtion-all">
                                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z">
                                    </path>
                                    </svg>
                                </button>
                                <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-black/20 to-black fle flex-col gap-1 items-center flex-wrap">
                                    <h3 className="group-hover:text-cyan-300 transition-all text-sm line-clamp-2 ">
                                        {anime?.title}
                                    </h3>
                                    <span className="text-[11px] tracking-wide flex gap-1 items-center uppercase font-semibold group-hover:text-cyan-300 transition-all">
                                        Episode {anime?.ep?.at(-1)?.number}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" >
                                            <path fill="currentColor" d="M3 22v-20l18 10-18 10z" className="group-hover:fill-cyan-300 transition-all"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
