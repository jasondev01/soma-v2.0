'use client'

import { AnilistRecentInterface } from "@/types"
import Card from "./cards/Card"
import Slider from "./Slider"
import { SwiperSlide } from "swiper/react"

type Props = {
    data: AnilistRecentInterface[]
}

export default function Recent({ data }: Props) {

    return (
        <section id="recent">
            <div className="container mt-10">
                <h2 className="text-lg md:text-xl font-bold uppercase after">
                    Recent Release
                </h2>
                <Slider>
                    {data?.map(anime => (
                        <SwiperSlide key={anime?.id}>
                            <Card data={anime} type="recent" isComponent={true} />
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        </section>
    )
}
