import { SearchResultInterface } from "@/types"
import { searchAnime } from "@/utils/get-anime"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, FormEvent, useEffect } from "react"


export default function SearchFunction() {
    const [ query, setQuery ] = useState('')
    const [ isEmpty, setIsEmpty ] = useState(false)
    const [ searchResults, setSearchResult ] = useState<SearchResultInterface[]>([])
    const [ typingTimeout, setTypingTimeout ] = useState<NodeJS.Timeout | null>(null)

    const handleSearchQuery = async (q: string) => {
        const results = await searchAnime(q)

        if(results.length === 0) {
            setIsEmpty(true)
        }

        setSearchResult(results) 
    }

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout)
        }
    
        if (query) {
            const timeout = setTimeout(() => {
                handleSearchQuery(query)
            }, 1000)
    
            setTypingTimeout(timeout)
        }
    
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout)
            }
        }
    }, [query])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const eQuery = e.target.value
        setQuery(eQuery)
        setIsEmpty(false)

        if (eQuery === '' || eQuery !== query) {
            setSearchResult([])
        }
    }

    const router = useRouter()
    const handleQuerySubmit = (e: FormEvent) => {
        e.preventDefault()
        
        setQuery('')
        router.push(`/search?q=${query}`)
    }

    return (
        <form onSubmit={handleQuerySubmit} className='justify-self-end md:max-w-[11rem] lg:max-w-[16rem] xl:max-w-[18rem] w-full relative'>
            <div className="relative w-full">
                {query && (
                    <div className="absolute right-2 translate-y-1/2 cursor-pointer"
                        onClick={() => setQuery('')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 30 30" stroke="rgba(103, 232, 249, .5)" className=" hover:fill-cyan-300 transtion-all">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z">
                            </path>
                        </svg>
                    </div>
                )}
                <input 
                    type="text" 
                    className='py-2 px-3 bg-white/20 outline-none text-sm placeholder:tracking-wide tracking-wide placeholder:text-white/60 transition-all duration-300 focus:placeholder:opacity-0 text-white border border-transparent focus:border-cyan-300 shadow-[0px_0px_5px_1px] shadow-transparent focus:shadow-cyan-300 w-full'
                    placeholder='Search for an anime'   
                    value={query}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            {query && (
                <div className='min-h-10 w-full absolute origin-bottom mt-1 text-xs flex flex-col bg-black/60 '>
                    { searchResults.length > 0 ? (
                        searchResults?.slice(0, 5)?.map((result, idx) => (
                            <Link key={idx}
                                href={`/info/${result?.id}`}
                                onClick={() => setQuery('')}
                                className='flex w-full gap-2 p-2 items-center transition-all hover:bg-black/80'
                            >
                                <div className='relative w-[70px] h-14 overflow-hidden shrink-0'>
                                    <Image
                                        src={result?.image}
                                        alt='alt'
                                        title='title'
                                        width={70}
                                        height={40}
                                        className='object-cover'
                                    />
                                </div>
                                <div className=' px-2'>
                                    <span className='block text-sm font-semibold'>
                                        {result?.title}
                                    </span>
                                    <ul className="flex gap-2">
                                        <li className="flex gap-1 capitalize">
                                            <span className="font-semibold">
                                                Type:
                                            </span>
                                            <span>
                                                {result?.subOrDub}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        ))
                        ) : isEmpty ? (
                            <div className="w-full h-10 grid place-items-center text-xs font-bold uppercase py-2 px-3 bg-black border border-cyan-300/20">
                                No results found
                            </div>
                        ) : (
                            <div className="w-full h-10 grid place-items-center mx-auto overflow-hidden">
                                <Image 
                                    src="/loading.gif"
                                    alt="Loading..."
                                    width={100}
                                    height={40}
                                    className="object-cover -mt-4"
                                />
                            </div>
                        )
                    }
                    {searchResults.length > 5 && (
                        <button type="submit" className="w-full grid place-items-center text-xs font-bold uppercase py-2 px-3 bg-black transition-all hover:bg-cyan-300 border border-cyan-300/20">
                            See more
                        </button>
                    )}
                </div>
            )}
        </form>
    )
}
