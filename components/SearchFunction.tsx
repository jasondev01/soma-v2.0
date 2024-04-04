import { XIcon } from "@/icons"
import { AnilistSearchResultInterface } from "@/types"
import { searchAnime } from "@/utils/get-anime"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, FormEvent, useEffect } from "react"


export default function SearchFunction() {
    const [ query, setQuery ] = useState('')
    const [ isEmpty, setIsEmpty ] = useState(false)
    const [ searchResults, setSearchResult ] = useState<AnilistSearchResultInterface[]>([])
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
        if (!query) return router.push('/anime/search?q=anime')
        router.push(`/anime/search?q=${query}`)
    }

    return (
        <form onSubmit={handleQuerySubmit} className='md:max-w-[11rem] lg:max-w-[16rem] xl:max-w-[18rem] w-full relative'>
            <div className="relative w-full">
                {query && (
                    <div className="absolute right-2 translate-y-1/2 cursor-pointer"
                        onClick={() => setQuery('')}
                    >
                        <XIcon className="hover:fill-cyan-300 transtion-all" />
                    </div>
                )}
                <input 
                    type="text" 
                    className='py-2 pl-3 pr-7 bg-white/20 outline-none text-sm placeholder:tracking-wide tracking-wide placeholder:text-white/60 transition-all duration-300 focus:placeholder:opacity-0 text-white border border-transparent focus:border-cyan-300 shadow-[0px_0px_5px_1px] shadow-transparent focus:shadow-cyan-300 w-full'
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
                                href={`/anime/${result?.id}`}
                                onClick={() => setQuery('')}
                                className='flex w-full gap-2 p-2 items-center transition-all hover:bg-black/80'
                            >
                                <div className='relative w-[70px] h-14 overflow-hidden shrink-0'>
                                    <div className="absolute top-0 left-0 w-full h-full z-[1]" />
                                    <img
                                        src={result?.image}
                                        alt={result?.title?.english || result?.title?.romaji}
                                        title={result?.title?.english || result?.title?.romaji}
                                        width={70}
                                        height={40}
                                        className='object-cover'
                                    />
                                </div>
                                <div className=' px-2'>
                                    <span className='block text-sm font-semibold'>
                                        {result?.title?.english || result?.title?.romaji}
                                    </span>
                                    <div className="flex gap-2 ">
                                        <p className="font-semibold">
                                            Rating: 
                                        </p>
                                        <p className="flex gap-1 mt-[1px] text-xs">
                                            {result?.rating}%
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                        ) : isEmpty ? (
                            <div className="w-full h-10 grid place-items-center text-xs font-bold uppercase py-2 px-3 bg-black border border-cyan-300/20">
                                No results found
                            </div>
                        ) : (
                            <div className="w-full h-10 grid place-items-center mx-auto overflow-hidden">
                                <img 
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
