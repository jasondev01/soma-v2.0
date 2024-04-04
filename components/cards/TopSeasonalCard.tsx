import { StarOutline } from "@/icons";
import { TopSeasonalInterface } from "@/types";
import { formatTime } from "@/utils/helper";
import Link from "next/link";

type Props = {
    data: TopSeasonalInterface
}

export default function TopSeasonalCard({ data }: Props) {
    return (
        <Link href={`/anime/${data?.id}`} className="flex-1 flex gap-x-3 justify-between rounded-md bg-slate-800/60 hover:bg-cyan-400/30 transition-all group p-2">
            <div className="flex gap-x-3 items-center">
                <div className="h-[60px] w-[48px] shrink-0">
                    <img 
                        src={data?.coverImage}
                        alt={data?.title?.english || data?.title?.romaji}
                        width={48}
                        height={60}
                        className="rounded-sm w-full h-full "
                    />
                </div>      
                <div className="">
                    <h3 className="text-sm sm:text-base font-medium lg:line-clamp-1">
                        {data?.title?.english || data?.title?.romaji}  
                    </h3>
                    <div className="flex gap-x-1 text-xs tracking-wide mt-2 text-white/70">
                        <span className="flex gap-x-[1px]">
                            <StarOutline className="w-[14px] h-[14px] mt-[1px] mr-[2px]" />
                            {data?.rating?.anilist}
                        </span>
                        <span> • </span>
                        <span>
                            {data?.season}
                        </span>
                        <span> • </span>
                        <span className={`${data?.status === 'RELEASING' ? "text-green-600" : ""}`}>
                            {data?.status}  
                        </span>
                    </div>
                </div>
            </div> 
            <div className="w-[80px] sm:w-[100px] shrink-0 flex flex-col justify-center ">
                <span className="text-xs sm:text-sm font-semibold block">
                    {data?.format === 'TV' ? "TV Shows" : data?.format}
                </span>
                <span className="text-[11px] sm:text-xs mt-1.5 block text-white/70">
                    {data?.format === "MOVIE" ? formatTime(data?.duration as number) : `${data?.totalEpisodes} Episodes`}
                </span>
            </div>
        </Link>
    )
}
