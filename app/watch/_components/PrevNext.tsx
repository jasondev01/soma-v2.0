import { EpisodeInterface, InfoInterface } from "@/types"
import Link from "next/link"

type Props = {
    info: InfoInterface
    episodes: EpisodeInterface[]
    currentEpisode: number
}

export default function PrevNext({ info, episodes, currentEpisode }: Props) {

    const prevEpisode = episodes[currentEpisode - 1]
    const nextEpisode = episodes[currentEpisode + 1]

    return (
        <div className="mt-2 flex justify-between h-10">
            <Link
                href={`/watch/${prevEpisode?.id}`} 
                className={`px-2 w-fit h-full grid place-items-center rounded-sm bg-black/50 rotate-180 hover:bg-black hover:scale-[97%] transition-all group/left ${prevEpisode ? '' : 'opacity-0 pointer-events-none'}`}
                title="Previous Episode"
            >
                <span className="sr-only">Previous Episode</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-8 w-8 fill-white/50 group-hover/left:fill-white/100 group-hover/left:scale-[97%] transition-all"
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
                href={nextEpisode ? `/watch/${nextEpisode?.id}` : `/info/${info?.id}`} 
                className="px-2 w-fit grid place-items-center rounded-sm bg-black/50 hover:bg-black group/right"
                title={nextEpisode ? 'Next Episode' : 'Info'}
            >
                <span className="sr-only">{nextEpisode ? 'Next Episode' : 'Info'}</span>
                {nextEpisode ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                        className="h-8 w-8 fill-white/50 group-hover/right:fill-white transition-all"
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
                ) : (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 48 48"
                        className="h-7 w-7 fill-white/50 group-hover/right:fill-white transition-all"
                        stroke="#fff"
                        fill="none"
                    >
                        <path 
                            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" 
                        />
                        <path 
                            className="fill-black/50 stroke-black/50 group-hover/right:fill-black group-hover/right:stroke-black"
                            d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z" 
                        />
                    </svg>
                )}
            </Link>
        </div>
    )
}
