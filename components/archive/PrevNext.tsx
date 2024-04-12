import { AnilistEpisodeInterface, AnilistInfoInterface } from "@/types"
import Link from "next/link"
import SelectEpisode from "../../watch/_components/SelectEpisode"
import { ArrowLeft, ArrowRight } from "@/icons"

type Props = {
    data: AnilistInfoInterface
    episodes: AnilistEpisodeInterface[]
    watchParams?: string
}

export default function PrevNext({ data: info, episodes, watchParams }: Props) {
    if (!episodes || episodes?.length <= 0) return null

    const currentEpisode = episodes?.findIndex(episode => episode?.id === watchParams)
    const prevEpisode = episodes[currentEpisode - 1]
    const nextEpisode = episodes[currentEpisode + 1]

    return (
        <div className="flex gap-x-1 md:gap-x-2 justify-end h-7 md:h-10">
            <SelectEpisode
                info={info}
                episodes={episodes}
                currentEpisode={currentEpisode} 
            />
            <div className="flex gap-x-1 md:gap-x-2">
                <Link
                    href={`/anime/${info?.id}?watch=${prevEpisode?.id}`} 
                    className={`px-2 w-fit h-full grid place-items-center rounded-md bg-slate-800 rotate-180 shadow-none hover:shadow-[0_0_10px_-4px] border border-transparent hover:border-cyan-300/70 hover:shadow-cyan-300 hover:bg-cyan-300 1over:scale-[97%] transition-all group/left ${prevEpisode ? '' : 'hidden'}`}
                    title="Previous Episode"
                >
                    <span className="sr-only">Previous Episode</span>
                    <ArrowLeft className="h-4 md:h-6 w-4 md:w-6 fill-white group-hover/left:fill-white/100 group-hover/left:scale-[97%] transition-all" />
                </Link>
            
                <Link 
                    href={`/anime/${info?.id}?watch=${nextEpisode?.id}`} 
                    className={`w-fit grid place-items-center rounded-md bg-slate-800 shadow-none hover:shadow-[0_0_10px_-4px] border border-transparent hover:border-cyan-300/70 hover:shadow-cyan-300 hover:bg-cyan-300 1over:scale-[97%] transition-all group/right ${nextEpisode ? "px-2" : "hidden"}`}
                    title={nextEpisode && 'Next Episode'}
                >
                    <span className="sr-only">{nextEpisode ? 'Next Episode' : 'Info'}</span>
                    {nextEpisode && (
                        <ArrowRight className="h-4 md:h-6 w-4 md:w-6 fill-white group-hover/right:fill-white transition-all"
                        />
                    )}
                </Link>
            </div>
        </div>
    )
}
