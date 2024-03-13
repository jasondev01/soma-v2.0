import { PopularInterface, TopInterface } from "@/types"
import { getTMDBResource } from "@/utils/get-anime"
import Image from "next/image"
import Link from "next/link"

type Props = {
    data: PopularInterface[]
}

export default async function TopAiring({ data }: Props) {

    const ratingData: TopInterface[] = await Promise.all(data?.slice(0, 7).map(async (anime) => {
        return await getTMDBResource(anime?.title);
    }))
    
    return (
        <section id="top-airing">
            <div className="container mt-10">
                <h2 className="text-xl font-bold uppercase">
                    Top Airing Anime
                </h2>
                <div className="mt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-7">
                    {data
                        ?.slice(0, 10)
                        ?.map((anime, i) => {
                            return (
                                <Link 
                                    key={anime?.id} 
                                    href={`/info/${anime?.id}`}
                                    className="block relative h-[250px] md:first:h-[528px] md:first:col-span-2 md:first:row-span-2 text-2xl font-bold group overflow-hidden border border-transparent hover:border-cyan-300 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300 transition-all duration-300 first"
                                >
                                    <Image 
                                        src={anime?.image}
                                        alt={anime?.title}
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover object-center group-hover:scale-[102%] transition-all duration-300"
                                    />
                                    {ratingData[i]?.vote_average && (
                                        <span className="absolute z-[2] top-1 left-1 px-2 py-1 bg-red-500 text-[11px]/4 font-semibold uppercase">
                                            {ratingData[i]?.vote_average?.toFixed(1)}
                                        </span>
                                    )}
                                    <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-black/20 to-black ">
                                        <h3 className="group-hover:text-cyan-300 transition-all text-sm line-clamp-2 ">
                                            {anime?.title}
                                        </h3>
                                    </div>
                                </Link>
                            )
                        }
                    )}
                </div>
            </div>
        </section>
    )
}
