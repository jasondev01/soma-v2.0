"use client"

import { FiAlertTriangle } from "react-icons/fi"
import { FaDiscord } from "react-icons/fa"
import { IoMdCloseCircle } from "react-icons/io"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function TakeDownNotice() {
    const [ closeNotice, setCloseNotice ] = useState(false)

    useEffect(() => {
        if (!closeNotice) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "visible"
        }

        return () => {
            document.body.style.overflow = "visible"
        }
    }, [closeNotice])


    return !closeNotice && (
        <div className="fixed z-[9999999] h-screen w-full top-0 left-0 grid place-items-center bg-black/50 backdrop-blur-sm"
        >
            <div className="max-w-96 w-full h-fit rounded-xl bg-gray-900 shadow-sm py-7 px-5 font-raleway relative">
                <FiAlertTriangle className="size-10 mx-auto text-red-500 " />
                <p className="mt-4 text-sm/[25px] text-justify text-white/80">
                    Hey there, Soma guest! It's your Soma Developer waving hello! 👋 I actually started off with big plans to beef up Soma-tv with cool stuff like movies and dramas. But, handling it all solo, the costs just got too steep. So, sadly, I've gotta break the news: Soma-tv is saying goodbye to the internet this week. It's been a blast keeping it ad-free for you all these past months. But, hey, everything has its time, right? 
                </p>
                
                <div className="rounded-full mt-3.5 w-fit mx-auto py-2 px-5 bg-gradient-to-r from-slate-200 from-0% to-[#ccaaf6] to-100% flex gap-x-2.5 items-center">
                    <span className="text-xs text-black font-medium">
                        News in discord: 
                    </span>
                    <Link href="https://discord.gg/MGvTqmN3Se" target="_blank">
                        <FaDiscord className="size-6 text-black hover:text-gray-800 transition-all hover:scale-[98%]"/>
                    </Link>
                </div>

                <IoMdCloseCircle className="absolute top-2.5 right-2.5 size-6 cursor-pointer hover:text-red-500 transition-all hover:scale-[98%]"
                    onClick={() => setCloseNotice(true)}
                />
            </div>
        </div>
    )
}
