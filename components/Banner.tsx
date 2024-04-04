import { Calendar, Cc, PlayButton } from "@/icons"
import { AnilistTrendingInterface } from "@/types"
import { cleanDescription, random } from "@/utils/helper"
import Link from "next/link"
import FeaturedBanner from "./FeaturedBanner"
import { config } from "@/config"

type Props = {
    data: AnilistTrendingInterface[]
}

const { video_api } = config

export default async function Banner({ data }: Props) {
    const randomData = random(data)

    const animeIndex = data?.findIndex(anime => anime?.id === randomData?.id)

    return (
        <section className="relative h-[500px] xl:h-[80vh] -mt-20">
            <div className="absolute top-0 left-0 w-full h-full z-[1] hero" />
            <FeaturedBanner 
                data={randomData} 
                video_api={video_api} 
            />
            <div className="container flex items-end h-full relative z-[2]">
                <div className=" pb-8 md:pb-10 lg:pb-14">
                    <span className="text-xl block mb-1 font-medium"
                        style={{ 
                            color: randomData?.color || ''
                        }}
                    >
                        #{animeIndex+1} Trending
                    </span>
                    <h2 className="text-3xl md:text-5xl font-semibold text-white text-shadow md:w-[80%] lg:w-2/3">
                        {randomData?.title?.english}
                    </h2>
                    <div className="flex gap-x-3 mt-2 ">
                        <div className="text-xs font-semibold flex items-center gap-x-[1px]">
                            <PlayButton className="w-5 h-5 mr-1" />
                            {randomData?.type}
                        </div>
                        <div className="text-xs font-semibold flex items-center gap-x-[1px] uppercase">
                            {randomData?.status}
                        </div>
                        <div className="text-xs font-semibold flex items-center gap-x-[1px]">
                            <Calendar className="w-5 h-5 mr-1 text-gray-800 dark:text-white" />
                            {randomData?.releaseDate}
                        </div>
                        <div className="text-xs font-semibold flex items-center gap-x-[1px]">
                            <Cc className="w-5 h-5 mr-1" />
                            {randomData?.totalEpisodes}
                        </div>
                    </div>
                    <p className="text-sm mt-3 line-clamp-2 md:line-clamp-3 md:w-[75%] lg:w-1/2">
                        {cleanDescription(randomData?.description)}
                    </p>
                    <div className="flex gap-2 mt-4">
                        <Link
                            href={`/anime/${randomData?.id}`}
                            className="text-sm uppercase font-bold btn btn-primary !flex gap-x-1 rounded-full"
                        >
                            <PlayButton className="w-5 h-5 mr-1" />
                            Play Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
