import { SearchResultInterface } from "@/types"
import Image from "next/image"
import Link from "next/link"

type Props = {
    data: SearchResultInterface[]
}

export default function SearchCards({ data }: Props) {

    return (
        <div className="container min-h-[calc(100vh-401px)]">
            {data?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-7">
                    {data?.map(anime => (
                        <Link 
                            key={anime?.id} 
                            href={`/info/${anime?.id}`}
                            className={`block relative h-[250px] font-bold group overflow-hidden border border-transparent  hover:shadow-[0px_0px_5px_1px]  transition-all duration-300 ${anime?.subOrDub === 'sub' ? " hover:border-red-500 hover:shadow-red-500" : "hover:border-cyan-300 hover:shadow-cyan-300"}`}
                        >
                            <Image 
                                src={anime?.image}
                                alt={anime?.title}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover object-center group-hover:scale-[102%] transition-all duration-300"
                            />
                            {anime?.subOrDub && (
                                <span className={`absolute z-[2] top-1 right-1 px-2 py-1  text-[10px]/4 font-bold uppercase ${anime?.subOrDub === 'sub' ? ' bg-red-500' : 'bg-cyan-300' }`}>
                                    {anime?.subOrDub}
                                </span>
                            )}
                            <div className="absolute z-[2] bottom-0 left-0 w-full p-2 bg-gradient-to-b from-black/20 to-black ">
                                <h3 className="group-hover:text-cyan-300 transition-all text-sm line-clamp-2 ">
                                    {anime?.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            ): (
                <div className="w-full min-h-[calc(100vh-401px)] grid place-items-center overflow-hidden"> 
                    <Image 
                        src="/not-found.jpg"
                        alt="anime not found"
                        width={1200}
                        height={1200}
                        className="object-cover h-full w-full"
                    /> 
                </div>
            )}
        </div>
    )
}
