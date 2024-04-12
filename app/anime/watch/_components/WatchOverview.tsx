'use client'

import { AnilistInfoInterface } from "@/types"
import parse from 'html-react-parser'
import { useState } from "react"

type Props = {
    data: AnilistInfoInterface
}

export default function WatchOverview({ data }: Props) {
    const [ readMore, setReadMore ] = useState(false)

    const infos = [
        { name: 'Release Date:', value: data?.releaseDate },
        { name: 'Type:', value: data?.type },
        { name: 'Season:', value: data?.season },
        { name: 'Genre/s:', value: data?.genres?.join(', ') },
        { name: 'Studio/s:', value: data?.studios?.join(', ') },
        { name: 'Country:', value: data?.countryOfOrigin },
        { name: 'Sub or Dub:', value: data?.subOrDub },
        { name: 'Status:', value: data?.status },
        { name: 'Popularity:', value: data?.popularity },
        { name: 'Rating:', value: `${data?.rating}%` },
        { name: 'Total Episode:', value: `${data?.totalEpisodes} Episodes` },
        { name: 'Othername/s:', value: data?.synonyms?.join(', ') },
    ]

    const handleReadMore = () => {
        setReadMore(prev => !prev)
    }

    return (
        <>
            <div className="h-fit w-full flex flex-col items-center md:flex-row gap-5 relative mt-5 p-2 md:p-0">
                <div className="h-full md:h-[270px]  w-full md:w-fit top-0 left-0 shrink-0 absolute md:static">
                    <div className="absolute top-0 left-0 w-full h-full hidden md:block" />
                    <img 
                        src={data?.image}
                        alt={data?.title?.english}
                        width={250}
                        height={200}
                        className="object-cover md:object-contain w-full h-full rounded-md opacity-40 md:opacity-100" 
                        style={{ boxShadow: `0 0 10px -2px ${data?.color || "sky"}` }}
                    /> 
                </div>
                <div className="flex-1 text-xs relative md:static">
                    <div className="mt-2">
                        {infos?.map(info => info?.value && (
                            <div key={info?.name} className="flex gap-x-2 gap-y-1 first:mt-2 mt-1 flex-wrap">
                                <span className="opacity-80">
                                    {info?.name}
                                </span>
                                <span className="text-semibold line-clamp-[8]">
                                    {info?.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`mt-5 w-full rounded-md bg-gray-900/90 p-4 overflow-hidden text-xs tracking-wide relative ${readMore ? 'h-fit pb-10' : "h-[80px] transition-all duration-500 "}`}>
                {parse(data?.description || "")}
                {data?.description?.length > 410 && (
                    <div className={`absolute h-[50px] bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black ${readMore ? "hidden" : "block"}`} />
                )}
                {data?.description?.length > 410 && (
                    <button className="absolute bottom-2 text-xs tracking-wider uppercase font-medium right-1/2 translate-x-1/2"
                        onClick={() => handleReadMore()}
                    >
                        { readMore ? "Hide" : "Read More"}
                    </button>
                )}
            </div>
        </>
    )
}
