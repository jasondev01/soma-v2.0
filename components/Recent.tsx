import { RecentInterface } from "@/types"
import Image from "next/image"
import Link from "next/link"

type Props = {
    data: RecentInterface[]
}

export default function Recent({ data }: Props) {
    return (
        <section id="recent">
            <div className="container mt-10">
                <h2 className="text-xl font-bold uppercase">
                    Recent Release
                </h2>
                <div className="mt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-7">
                    {data
                        ?.slice(0, 12)
                        ?.map(anime => (
                        <Link 
                            href={`/watch/${anime?.episodeId}`}
                            key={anime?.id} className="h-[250px] block relative group overflow-hidden border border-transparent hover:border-cyan-300 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300 transition-all duration-300 recent"
                            title={anime?.title}    
                        >
                            <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                            <Image 
                                src={anime?.image}
                                alt={anime?.title}
                                width={250}
                                height={250}
                                className="h-full w-full object-cover group-hover:scale-[102%] transition-all duration-300"
                            />
                            <span className="absolute z-[2] top-1 right-1 px-2 py-1 bg-cyan-500 text-[11px]/4 font-semibold uppercase">
                                Ep {anime?.episodeNumber}
                            </span>
                            <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-black/20 to-black ">
                                <h3 className="group-hover:text-cyan-300 transition-all text-sm line-clamp-2 ">
                                    {anime?.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
