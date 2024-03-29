import { AnilistTrendingInterface } from "@/types"
import { cleanDescription, random } from "@/utils/helper"
import Image from "next/image"
import Link from "next/link"

type Props = {
    data: AnilistTrendingInterface[]
}

export default async function Banner({ data }: Props) {
    const randomData = random(data)

    const animeIndex = data?.findIndex(anime => anime?.id === randomData?.id)
    return (
        <section className="relative h-[500px] xl:h-[75vh] -mt-20">
            <div className="absolute top-0 left-0 w-full h-full z-[1] hero" />
            {randomData?.cover && (
                <img
                    src={randomData?.cover}
                    alt={randomData?.title?.english}
                    width={1200}
                    height={1200}
                    className="object-cover h-full w-full opacity-40 absolute top-0 left-0"
                />
            )}
            <div className="container flex items-end h-full relative z-[2]">
                <div className="md:w-[75%] lg:w-2/3 pb-8 md:pb-10 lg:pb-14">
                    <span className="text-lg block mb-1">
                        #{animeIndex+1} Trending
                    </span>
                    <h2 className="text-4xl font-semibold text-white text-shadow">
                        {randomData?.title?.english}
                    </h2>
                    <div className="flex gap-x-3 mt-2">
                        <div className="text-xs font-semibold flex items-center gap-x-[1px]">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-1"
                                viewBox="0 0 48 48"
                            >
                                <defs>
                                    <mask id="ipSPlay0">
                                        <g fill="none"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                        >
                                            <path fill="#fff"
                                                stroke="#fff"
                                                d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
                                            />
                                            <path fill="#000"
                                                stroke="#000"
                                                d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z"
                                            />
                                        </g>
                                    </mask>
                                </defs>
                                <path fill="currentColor"
                                    d="M0 0h48v48H0z"
                                    mask="url(#ipSPlay0)"
                                />
                            </svg>
                            {randomData?.type}
                        </div>
                        <div className="text-xs font-semibold flex items-center gap-x-[1px] uppercase">
                            {randomData?.status}
                        </div>
                        <div className="text-xs font-semibold flex items-center gap-x-[1px]">
                            <svg className="w-5 h-5 mr-1 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                                />
                            </svg>
                            {randomData?.releaseDate}
                        </div>
                        <div className="text-xs font-semibold flex items-center gap-x-[1px]">
                            <svg viewBox="0 0 32 32" className="w-5 h-5 mr-1" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clipRule="evenodd" d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z" fill="currentColor" />
                            </svg>
                            {randomData?.totalEpisodes}
                        </div>
                    </div>
                    <p className="text-sm mt-3 line-clamp-3 xl:w-3/4">
                        {cleanDescription(randomData?.description)}
                    </p>
                    <div className="flex gap-2 mt-4">
                        <Link
                            href={`/anime/${randomData?.id}`}
                            className="text-sm uppercase font-bold btn btn-primary !flex gap-x-1 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-1"
                                viewBox="0 0 48 48"
                            >
                                <defs>
                                    <mask id="ipSPlay0">
                                        <g fill="none"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                        >
                                            <path fill="#fff"
                                                stroke="#fff"
                                                d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
                                            />
                                            <path fill="#000"
                                                stroke="#000"
                                                d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z"
                                            />
                                        </g>
                                    </mask>
                                </defs>
                                <path fill="currentColor"
                                    d="M0 0h48v48H0z"
                                    mask="url(#ipSPlay0)"
                                />
                            </svg> 
                            Play Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
