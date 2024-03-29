import { AnilistEpisodeInterface, AnilistInfoInterface } from "@/types"
import Link from "next/link"
import SelectEpisode from "./SelectEpisode"

type Props = {
    data: AnilistInfoInterface
    episodes: AnilistEpisodeInterface[]
    watchParams?: string
}

export default function PrevNext({ data: info, episodes, watchParams }: Props) {

    const currentEpisode = episodes?.findIndex(episode => episode?.id === watchParams)

    const prevEpisode = episodes[currentEpisode - 1]
    const nextEpisode = episodes[currentEpisode + 1]

    return (
        <div className="flex gap-x-2 justify-end h-10">
            <SelectEpisode
                info={info}
                episodes={episodes}
                currentEpisode={currentEpisode} 
            />
            <div className="flex gap-x-2">
                <Link
                    href={`/anime/${info?.id}?watch=${prevEpisode?.id}`} 
                    className={`px-2 w-fit h-full grid place-items-center rounded-md bg-slate-800 rotate-180 shadow-none hover:shadow-[0_0_10px_-4px] border border-transparent hover:border-cyan-300/70 hover:shadow-cyan-300 hover:bg-cyan-300 1over:scale-[97%] transition-all group/left ${prevEpisode ? '' : 'hidden'}`}
                    title="Previous Episode"
                >
                    <span className="sr-only">Previous Episode</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                        className="h-6 md:h-7 w-6 md:w-7 fill-white group-hover/left:fill-white/100 group-hover/left:scale-[97%] transition-all"
                        stroke="#fff "
                        fill="none"
                    >
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        >
                            <path
                                d="M1260 4056 c0 -3 162 -330 360 -726 198 -396 360 -731 360 -745 0
                                        -14 -162 -350 -361 -746 -198 -397 -359 -723 -357 -725 6 -6 2749 1461 2749
                                        1471 1 5 -558 308 -1242 673 -1543 822 -1509 805 -1509 798z"
                            />
                        </g>
                    </svg>
                </Link>
            
                <Link 
                    href={`/anime/${info?.id}?watch=${nextEpisode?.id}`} 
                    className={`w-fit grid place-items-center rounded-md bg-slate-800 shadow-none hover:shadow-[0_0_10px_-4px] border border-transparent hover:border-cyan-300/70 hover:shadow-cyan-300 hover:bg-cyan-300 1over:scale-[97%] transition-all group/right ${nextEpisode ? "px-2" : "hidden"}`}
                    title={nextEpisode && 'Next Episode'}
                >
                    <span className="sr-only">{nextEpisode ? 'Next Episode' : 'Info'}</span>
                    {nextEpisode && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                            className="h-6 md:h-7 w-6 md:w-7 fill-white group-hover/right:fill-white transition-all"
                            stroke="#fff"
                            fill="none"
                        >
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            >
                                <path
                                    d="M1260 4056 c0 -3 162 -330 360 -726 198 -396 360 -731 360 -745 0
                                            -14 -162 -350 -361 -746 -198 -397 -359 -723 -357 -725 6 -6 2749 1461 2749
                                            1471 1 5 -558 308 -1242 673 -1543 822 -1509 805 -1509 798z"
                                />
                            </g>
                        </svg>
                    )}
                </Link>
            </div>
        </div>
    )
}
