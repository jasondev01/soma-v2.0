'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import SearchFunction from './SearchFunction'
import { usePathname, useRouter } from 'next/navigation'

const menus = [
    { menu: 'Home', href: '/' },
    // { menu: 'recent', href: '/#recent' },
    // { menu: 'top airing', href: '/#top-airing' },
    // { menu: 'popular', href: '/#popular' },
    // { menu: 'news', href: '/news' },
]

export default function Nav() {
    const [ isScrolled, setIsScrolled ] = useState(false)
    const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
    const [ query, setQuery ] = useState('')
    const [ activeNav, setActiveNav ] = useState('')
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isMobileMenuOpen])

    const handleQuerySubmit = (e: FormEvent) => {
        e.preventDefault()
        
        setQuery('')
        setIsMobileMenuOpen(false)
        router.push(`/anime/search?q=${query}`)
    }

    useEffect(() => {
        if (pathname === '/') {
            const current = window.location.hash
            setActiveNav(current.replace('#', ''))
            return
        }

        setActiveNav(pathname.replace('/', ''))
    }, [pathname])

    const handleNavClick = (menu: string) => {
        setIsMobileMenuOpen(false)
        setActiveNav(menu)
    }

    return (
        <header className={`sticky top-0 h-14 xl:h-20 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/50 to-black/10'} z-[999999]`}>
            <nav className='container h-full flex items-center justify-between md:justify-normal'>
                <div className='text-3xl md:text-4xl font-extrabold relative z-30'>
                    <Link href="/">
                        <h1 style={{ textShadow: "0px 2px 4px rgba(103, 232, 249, 0.5)" }}>
                            soma-tv. <span className='sr-only'>| watch and stream anime, ad free</span>
                        </h1>
                    </Link>
                </div>
                <div className={`w-full fixed top-0 h-screen bg-black/80 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent md:flex-1 md:flex md:items-center md:static md:h-fit transition-all duration-200 ${isMobileMenuOpen ? 'right-0 ': '-right-[100%]'}`}>
                    <ul className='flex-1 flex gap-4 md:ml-5 xl:ml-10 h-full flex-col justify-center items-center -mt-20 w-[70%] mx-auto md:mt-0 md:mx-0 md:w-full md:items-center md:flex-row md:justify-normal md:h-fit'>
                        {menus.map(menu => (
                            <li key={menu.menu} className={`font-bold uppercase text-2xl md:text-xs hover:text-cyan-300 transition-all tracking-wider ${activeNav === menu.menu ? "text-cyan-300" : ""}`}
                                onClick={() => handleNavClick(menu.menu)}
                            >
                                <Link href={menu.href}>
                                    {menu.menu}
                                </Link>
                            </li>
                        ))}
                        <form onSubmit={handleQuerySubmit} className='w-full md:hidden'>
                            <input 
                                type="text" 
                                className='py-2 px-3 bg-white/20 outline-none text-sm placeholder:tracking-wide tracking-wide placeholder:text-white/60 transition-all duration-300 focus:placeholder:opacity-0 text-white border border-transparent focus:border-cyan-300 shadow-[0px_0px_5px_1px] shadow-transparent focus:shadow-cyan-300 w-full'
                                placeholder='Search for an anime'   
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                    </ul> 
                    <div className='block md:hidden w-[70%] mx-auto text-center -mt-24'>
                        <Link href="https://www.buymeacoffee.com/somae" target='_blank' className='text-base/[22px] uppercase font-semibold tracking-wide h-fit p-2 block relative'>
                            Donate
                            <img 
                                src="/heart.svg"
                                alt='heart donation'
                                width={20}
                                height={20}
                                className='animate-ping absolute top-[25%] left-[45%] translate-x-[45%]'
                                
                            />
                        </Link>
                        <span className='text-xs tracking-wide font-semibold flex gap-1 w-full justify-center'>
                            Built with Love
                            <img 
                                src="/heart.svg"
                                alt='built with love'
                                width={10}
                                height={10}
                                className='object-contain !fill-black text-black'
                            />
                        </span>
                    </div> 
                    <div className='hidden md:flex gap-1 justify-self-end items-center '>
                        <SearchFunction />
                        <Link href="https://www.buymeacoffee.com/somae" target='_blank' className='text-xs/[22px] uppercase font-semibold transition-all hover:bg-cyan-300 tracking-wide h-fit p-2 block relative'>
                            Donate
                            <img 
                                src="/heart.svg"
                                alt='heart donation'
                                width={20}
                                height={20}
                                className='animate-ping absolute top-[25%] right-[35%]'
                            />
                        </Link>
                    </div>      
                </div>
                <div className="flex flex-col gap-[2.5px] md:hidden relative z-20 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                >
                    <div className={`w-[20px] h-[3px] bg-white transition-all ${isMobileMenuOpen ? "translate-y-1 rotate-[45deg] rotate" : ""}`} />
                    <div className={`w-[20px] h-[3px] bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""} `} />
                    <div className={`w-[20px] h-[3px] bg-white transition-all ${isMobileMenuOpen ? "-translate-y-2 -rotate-[45deg]" : ""} `}  />
                </div>
            </nav>
        </header>
    )
}
