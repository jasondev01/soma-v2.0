'use client'

import { AnilistRecentInterface } from "@/types"
import Card from "./Card"
import Slider from "./Slider"
import { SwiperSlide } from "swiper/react"

type Props = {
    data: AnilistRecentInterface[]
}

export default function Recent({ data }: Props) {

    return (
        <section id="recent">
            <div className="container mt-10">
                <h2 className="text-xl font-bold uppercase after">
                    Recent Release
                </h2>
                {/* <div className="mt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-7"> 
                    </div> */}
                <Slider>
                    {data?.map(anime => (
                        <SwiperSlide key={anime?.id}>
                            <Card data={anime} type="recent" />
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        </section>
    )
}
