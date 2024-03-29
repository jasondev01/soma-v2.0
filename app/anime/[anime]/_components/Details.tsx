"use client"

import { AnilistInfoInterface } from "@/types"
import Overview from "./Overview"
import Relations from "./Relations"
import Recommendations from "./Recommendations"
import { useLayoutEffect, useState } from "react"
import Episodes from "./Episodes"
import Disqus from "./Disqus"
import Characters from "./Characters"
import { usePathname } from "next/navigation"


type Props = {
    data: AnilistInfoInterface
    watchParams: string
    disqus_shortname: string
}

type MenuKey = 'overview' | 'relations' | 'characters' | 'episodes' | 'comments' 

export default function Details({ data, watchParams, disqus_shortname }: Props) {
    const [selected, setSelected] = useState<MenuKey>("overview");

    const infoMenus: Record<MenuKey, JSX.Element> = {
        overview: <Overview data={data} />,
        relations: <Relations data={data?.relations} />,
        characters: <Characters data={data?.characters} />,
        episodes: <Episodes watchParams={watchParams} data={data?.episodes} anime={data} />,
        comments: <Disqus watchParams={watchParams} episodes={data?.episodes} disqus_shortname={disqus_shortname} />,
    }

    const handleMenuClick = (menu: MenuKey) => {
        setSelected(menu)
    }

    const pathname = usePathname()

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return (
        <>
            <div className="w-full flex flex-wrap container gap-x-2 mt-5 relative">
                {Object.keys(infoMenus).map((menu) => (
                    <div key={menu}
                        className={`text-sm font-semibold capitalize cursor-pointer tracking-wide py-2 px-1 opacity-80 transition-all duration-300 ${ selected === menu ? "text-cyan-300 opacity-100 detail_menu transition-all duration-300" : "" }`}
                        onClick={() => handleMenuClick(menu as MenuKey)}
                    >
                        {menu}
                    </div>
                ))}
            </div>
            <section className="mt-5 min-h-[400px] relative !z-1">
                {infoMenus[selected]}
            </section>
            <Recommendations data={data?.recommendations} />
        </>
    );
}
