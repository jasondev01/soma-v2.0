import { PlayButton } from "@/icons";
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
                className="h-[165px] lg:h-[250px] block relative !z-[999] group overflow-hidden border border-transparent hover:border-cyan-300 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300 transition-all duration-300 rounded-md"
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
                {type === 'recent' ? (
                    <span className="absolute z-[2] top-0 right-0 px-3 py-1.5 bg-black/80 text-[11px]/4 font-semibold uppercase rounded-bl-md group-hover:text-cyan-300 transition-all">
                        Ep {anime?.episodeNumber}
                    </span>
                ): (
                    <span className="absolute z-[2] top-0 right-0 px-3 py-1.5 bg-black/80 text-[11px]/4 font-semibold uppercase rounded-bl-md group-hover:text-cyan-300 transition-all">
                        {anime?.type || anime.episodeNumber}
                    </span>
                )}
                <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-transparent to-black group-hover:h-full transition-all duration-300 grid place-items-center ease-in-out">
                    <PlayButton className="w-10 h-10 mr-1 group-hover:top-[44%] absolute top-[100%] transitiona-all duration-300 ease-in-out"/>
                </div>
            </Link>
            <h3 className="group-hover:text-cyan-300 transition-all text-xs line-clamp-2 mt-2 text-center">
                {anime?.title?.english || anime?.title?.romaji }
            </h3>
        </>
    )
}
