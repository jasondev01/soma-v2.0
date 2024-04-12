"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
    const router = useRouter()

    return (
        <div className="flex gap-x-2">
            <button className="btn mt-5 text-xs font-bold tracking-wide uppercase text-white bg-red-500 !border-red-500 hover:!border-cyan-800"
            onClick={() => router.back()}
            >
                Go back
            </button>
            <button className="btn mt-5 text-xs font-bold tracking-wide uppercase text-white bg-cyan-300"
            onClick={() => window.location.reload()}
            >
                Refresh
            </button>
        </div>


    )
}
