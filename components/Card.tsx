import { AnilistRecentInterface, AnilistRecommendationInterface, AnilistRelationInterface, AnilistTrendingInterface } from "@/types";
import Link from "next/link";

type Props = {
    data: AnilistRecentInterface | AnilistTrendingInterface | AnilistRelationInterface | AnilistRecommendationInterface
    type?: string
}

export default function Card({ data: anime, type }: Props) {
    return (
        <>
            <Link 
                href={type === 'recent' ? `/anime/${anime?.id}?watch=${anime?.episodeId?.replace('/', '')}` : `/anime/${anime?.id}` }
                className="h-[250px] block relative group overflow-hidden border border-transparent hover:border-cyan-300 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300 transition-all duration-300 rounded-md"
                title={anime?.title?.english}    
            >
                <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                <img 
                    src={anime?.image}
                    alt={`Soma | ${anime?.title?.english}`}
                    width={250}
                    height={250}
                    className="h-full w-full object-cover group-hover:scale-[102%] transition-all duration-300"
                />
                {type === 'recent' && (
                    <span className="absolute z-[2] top-[2px] right-[2px] px-2 py-1 bg-cyan-500 text-[11px]/4 font-semibold uppercase">
                        Ep {anime?.episodeNumber}
                    </span>
                )}
                <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-transparent to-black group-hover:h-full transition-all duration-300 grid place-items-center ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 mr-1 group-hover:top-[44%] absolute top-[100%] transitiona-all duration-300 ease-in-out"
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
                </div>
            </Link>
            <h3 className="group-hover:text-cyan-300 transition-all text-xs line-clamp-2 mt-2 text-center">
                {anime?.title?.english || anime?.title?.romaji }
            </h3>
        </>
    )
}
