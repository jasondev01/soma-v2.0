"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Notice() {
    const [ isIgnored, setIsIgnored ] = useState<boolean>()
    const router = useRouter()

    useEffect(() => {
        const status = localStorage.getItem("cleared")

        const body = document.body
        
        if(status && status === "2") {
            setIsIgnored(true)
            return
        } else {
            localStorage.setItem('cleared', "1")
            if(!isIgnored) {
                body.style.overflow = "hidden"
            } else {
                body.style.overflow = ""
            }
            setIsIgnored(false)
        }

        return () => {
            body.style.overflow = ""
        }
    }, [])

    const clearWatchedHistory = () => {
        try {
            localStorage.setItem('cleared', "2")
            localStorage.removeItem('watched')
            console.log(`Successfully cleared watched history.`)

            router.refresh()

            const body = document.body;
            body.style.overflow = ""
        } catch (error) {
            console.error(`Error clearing watched history:`, error)
        }
    }

    const handleIgnore = () => {    
        setIsIgnored(true)
        const body = document.body
        body.style.overflow = ""
    }

    return isIgnored === false && (
        <div className={`fixed top-0 left-0 h-screen w-full grid place-items-center z-[9999] px-3.5 bg-black/80 backdrop-blur-md ${isIgnored ? "hidden" : ""}`}>
            <div className="h-fit max-w-[384px] w-full shadow-[0_0_10px_-2px] shadow-black bg-gray-900 rounded-md text-center p-5">
                <span className="text-xl font-bold tracking-wider uppercase mb-2 block">
                    Notice yo!
                </span>
                <p className="tracking-wide text-xs/[1.7] mb-3.5">
                    Due to the recent update, your previous watched history might cause some issues. To prevent this, you can clear your watched history by pressing the button "clear history" below.
                </p>
                <div className="flex justify-center gap-x-2.5">
                    <button className="rounded-md w-fit py-2 px-4 bg-cyan-800 opacity-75 text-xs hover:scale-[98%] hover:opacity-100 transition-all uppercase font-medium tracking-wide"
                        onClick={() => handleIgnore()}
                    >
                        Ignore
                    </button>
                    <button className="rounded-md w-fit py-2 px-4 bg-cyan-500 hover:bg-cyan-800 hover:scale-[98%] transition-all text-xs uppercase font-semibold tracking-wide" 
                        onClick={() => clearWatchedHistory()}
                    >
                        Clear History
                    </button>
                </div>
            </div>
        </div>
    )
}
