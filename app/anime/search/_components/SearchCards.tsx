import { AnilistSearchResultInterface } from "@/types"
import Link from "next/link"
import React from "react"

type Props = {
    data: AnilistSearchResultInterface[]
}

export default function SearchCards({ data }: Props) {

    return (
        <div className="container min-h-[calc(100vh-401px)]">
            {data?.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-5 gap-y-7">
                    {data?.map(anime => (
                        <div key={anime?.id}>
                            <Link 
                                href={`/anime/${anime?.id}`}
                                className="block relative h-[165px] lg:h-[250px] font-bold group overflow-hidden border border-transparent  hover:shadow-[0px_0px_5px_1px] transition-all duration-300 hover:border-cyan-300 hover:shadow-cyan-300 rounded-md"
                            >
                                <div className="absolute left-0 top-0 w-full h-full z-[1]" />
                                <img 
                                    loading="lazy"
                                    src={anime?.image}
                                    alt={anime?.title?.english || anime?.title?.romaji}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover object-center group-hover:scale-[102%] transition-all duration-300"
                                />
                                {anime?.type && (
                                    <span className='absolute z-[2] top-0 right-0 px-3 py-1.5 text-[10px]/4 font-bold uppercase bg-black/70 rounded-bl-md'>
                                        {anime?.type}
                                    </span>
                                )}
                                <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-transparent to-black " />
                            </Link>
                            <h3 className="group-hover:text-cyan-300 transition-all text-xs line-clamp-2 text-center mt-1">
                                {anime?.title?.english || anime?.title?.romaji}
                            </h3>
                        </div>                                
                    ))}
                </div>
            ): (
                <div className="w-full h-[calc(100vh-401px)] grid place-items-center overflow-hidden"> 
                    <div className="w-full h-full relative grid place-items-center">
                        <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                        <img 
                            src="/404.webp"
                            alt="anime not found"
                            width={400}
                            height={400}
                            className="object-contain object-center"
                        /> 
                        <span className="text-3xl font-bold bottom-1/2 uppercase absolute right-1/2 translate-y-1/2 translate-x-1/2 text-white z-10 -rotate-[15deg] text-shadow">
                            404 anime not found
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
