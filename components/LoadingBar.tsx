'use client'

import { useEffect, useState } from "react"

export default function LoadingBar() {
    const [ progress, setProgress ] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + 10
            )
        }, 500)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className='fixed z-[51] top-0 left-0 h-[2px] w-full  bg-transparent'>
            <div className="h-full bg-cyan-300/70 transition-[width] duration-[700ms]" style={{ width: `${progress}%` }} />
        </div>
    ) 
}
