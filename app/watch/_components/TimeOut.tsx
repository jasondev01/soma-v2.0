'use client'

import { useRouter } from "next/navigation"

export default function TimeOut() {
    const router = useRouter()

    const handleHardRefresh = () => {
        window.location.reload()
    }

    return (
        <main>
            <div className="h-screen w-screen fixed top-0 left-0 z-[-1]">
                <img
                    src='/eat.webp'
                    alt="Page not found"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover object-right md:object-center"
                />
            </div>
            <div className="h-[calc(100vh-305px)] container flex justify-center items-center flex-col">
                <span className="text-4xl font-bold tracking-wide text-shadow text-black uppercase text-center">
                    504 Page Has timed out.
                </span>
                <p className="mt-5 text-base font-semibold tracking-wide text-black text-center">
                    The page took too long to respond and has timed out. To solve this issue:<br />
                    You can hard refresh the page by pressing Ctrl + F5 / Ctrl + R (or Cmd + Shift + R on Mac) on your keyboard.  <br />
                    <span className="italic text-xs font-normal">
                        If the issue persist, you can report the issue at <a href="mailto:somajsn@gmail.com" target="_blank" className="underline text-cyan-500 hover:text-cyan-800 transition-all">somajsn@gmail.com</a> or go back and and ignore this.
                    </span>
                </p>
                <div className="mt-5 flex gap-3">
                    <button className="btn text-xs font-bold tracking-wide uppercase text-white bg-red-500 !border-red-500 hover:!border-cyan-800"
                        onClick={() => router.back()}
                    >
                        Go back
                    </button>
                    <button className="btn text-xs font-bold tracking-wide uppercase text-white bg-cyan-400"
                        onClick={() => handleHardRefresh()}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </main>
    )
}
