'use client'

import { useState, useEffect } from 'react'

export default function ScrollUp() {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        })
    }

    return (
        <>
            {showButton && (
                <button
                    className="fixed z-20 bottom-4 right-4 xl:bottom-28 xl:right-6 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition-all shadow-[0_0_5px_-1px] shadow-cyan-300"
                    onClick={scrollToTop}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            )}
        </>
    )
}
