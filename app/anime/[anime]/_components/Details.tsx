"use client"

import { AnilistInfoInterface } from "@/types"
import Overview from "./Overview"
import Relations from "./Relations"
import Recommendations from "./Recommendations"
import { useState } from "react"
import Episodes from "./Episodes"
import Disqus from "./Disqus"
import Characters from "./Characters"

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

    return (
        <>
            <div className="w-full flex flex-wrap container gap-x-2 mt-5 relative">
                {Object.keys(infoMenus).map((menu) => (
                    <div key={menu}
                        className={`text-[10px] md:text-xs tracking-wider font-semibold uppercase cursor-pointer py-1.5 md:py-2 px-[2px] md:px-1 opacity-80 transition-all duration-300 ${ selected === menu ? "text-cyan-300 opacity-100 detail_menu" : "" }`}
                        onClick={() => handleMenuClick(menu as MenuKey)}
                    >
                        {menu}
                    </div>
                ))}
            </div>
            <section className="mt-5 h-fit lg:min-h-[400px] relative !z-1">
                {infoMenus[selected]}
            </section>
            <Recommendations data={data?.recommendations} />
        </>
    );
}
