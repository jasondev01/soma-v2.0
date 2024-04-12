'use client'

import { AnilistInfoInterface } from "@/types"
import Image from "next/image"
import parse from 'html-react-parser'
import Link from "next/link"
import { MdPlayCircle } from "react-icons/md"
import { IoMdShare } from "react-icons/io"
import { FacebookShareButton } from "react-share"
import { FaRegStar } from "react-icons/fa6"
import { useEffect, useState } from "react"

type Props = {
    data: AnilistInfoInterface
}

export default function Overview({ data }: Props) {
    const [ isHovered, setIsHovered ] = useState(false)

    const firstDataArray = [
        { name: 'episodes', value: `${data?.totalEpisodes} Episodes` },
        { name: 'rating', value: data?.rating ? ` ${data?.rating}%` : null},
        { name: 'type', value: data?.type === 'TV' ? 'TV Show' : data?.type },
        { name: 'status', value: data?.status },
    ]

    const episodeOne = data?.episodes?.find(ep => ep?.number === 1)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    
    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <section className="pt-14 relative z-10">
            <div className="container flex flex-col md:flex-row gap-x-4 gap-y-2 items-center md:items-end">
                <div className="max-w-[180px] w-full shrink-0 h-[250px] rounded-md overflow-hidden relative"
                    style={{
                        boxShadow: `0 0 10px -2px ${data?.color || 'sky'}`
                    }}
                >
                    <div className="absolute left-0 top-0 w-full h-full" />
                    <Image
                        src={data?.image}   
                        alt={data?.title?.english || data?.title?.romaji}
                        width={180}
                        height={250}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center items-center md:items-start">
                    <span className="text-sm text-white/80">
                        {data?.season} {data?.releaseDate}
                    </span>
                    <h2 className="font-bold text-2xl md:text-[34px] tracking-wide mt-1.5 text-center md:text-left">
                        {data?.title?.english || data?.title?.romaji}
                    </h2>
                    <ul className="text-xs font-medium tracking-wide mt-1.5 flex gap-x-2">
                        {data?.genres?.map(genre => (
                            <li key={genre} className="text-white/90">
                                {genre}
                            </li>
                        ))}
                    </ul>
                    <ul className="flex gap-x-2 mt-2">
                        {firstDataArray?.map(({ name, value }) => value && (
                            <li key={name} 
                                className="px-2 py-1 rounded-md text-xs font-semibold text-white flex gap-x-1 items-center" 
                                style={{
                                    background: data?.color?.includes("fff") ? "#06B6D4" : data?.color || "#06B6D4"
                                }}
                            >
                                {name === 'rating' && <FaRegStar />} {value}
                            </li>
                        ))}
                    </ul>
                    <div className="container mt-3 block md:hidden">
                        <Link
                            href={`/anime/watch/${data?.id}?episode=${episodeOne?.id}`}
                            className="text-xs uppercase font-bold btn btn-primary md:!w-[180px] !flex justify-center items-center gap-x-1 rounded-full mx-auto"
                            style={{
                                backgroundColor: data?.color || 'sky',
                                borderColor: data?.color || 'sky'
                            }}
                        >
                           <MdPlayCircle className="size-5 mr-1" />
                            Watch Now
                        </Link>
                    </div>
                    <div className="text-[13px] lg:text-[15px] mt-3 md:mt-2.5 h-fit md:h-[100px] md:overflow-auto text-white/80 md:pr-4 description">
                        {parse(data?.description as string)}
                    </div>
                </div>
            </div>
            <div className="container mt-4 hidden md:flex items-center justify-start gap-x-4">
                <Link
                    href={`/anime/watch/${data?.id}?episode=${episodeOne?.id}`}
                    className="text-sm uppercase font-bold btn btn-primary !w-[180px] items-center !flex justify-center gap-x-1 rounded-full" 
                    style={{
                        backgroundColor: data?.color || 'sky',
                        borderColor: data?.color || 'sky'
                    }}
                >
                    <MdPlayCircle className="size-5 mr-1" />
                    Watch Now
                </Link>

                <FacebookShareButton 
                    url={`https://www.soma-tv.me/anime/${data?.id}`}
                    className="size-9 grid place-items-center rounded-full transition-all duration-300 hover:!border-cyan-800 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300"
                    onMouseEnter={() => handleMouseEnter()}
                    onMouseLeave={() => handleMouseLeave()}
                    style={{
                        backgroundColor: isHovered ? '#155E75' : data?.color
                    }}
                >
                    <IoMdShare className="size-5" />
                </FacebookShareButton>
            </div>
        </section>
    )
}
