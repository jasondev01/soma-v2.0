import { NewsAnnInterface } from "@/types"
import { getNews } from "@/utils/get-anime"
import Image from "next/image"
import Link from "next/link"

export default async function NewsPage() {
    const data: NewsAnnInterface[] = await getNews()

    return (
        <main>
            <div className="container grid place-items-center h-16 md:h-24">
                <h2 className="text-xl font-bold uppercase">
                    Recent News
                </h2>
            </div>
            <div className="container min-h-[calc(100vh-401px)]">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-7">
                    {data?.map(news => (
                        <div className="" key={news?.url} >
                            <Link 
                                href={`/info/${news?.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative h-[250px] font-bold group overflow-hidden border border-transparent  hover:shadow-[0px_0px_5px_1px] hover:border-cyan-300 hover:shadow-cyan-300 transition-all duration-300"
                                title={news?.title}
                            >
                                <Image 
                                    src={news?.thumbnail}
                                    alt={news?.title}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover object-center group-hover:scale-[102%] transition-all duration-300"
                                />
                            </Link>
                            <div className="w-full py-2">
                                <Link href={news?.url} className="transition-all hover:text-cyan-300" title={news?.title} rel="noopener noreferrer">
                                    <h3 className="group-hover:text-cyan-300 transition-all text-sm line-clamp-2" >
                                        {news?.title}
                                    </h3>
                                </Link>
                                <Link href={news?.url} className="text-xs font-bold tracking-wide uppercase transition-all hover:text-cyan-300" title={news?.title} rel="noopener noreferrer">
                                    Read more <span className="sr-only">on {news?.url}</span>
                                </Link>
                                <span className="block mt-1 text-xs">
                                    {news?.uploadedAt}
                                </span>
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>
        </main>
    )
}