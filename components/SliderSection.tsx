"use client"

import { AnilistTrendingInterface } from "@/types"
import Slider from "./Slider"
import { SwiperSlide } from "swiper/react"
import Card from "./cards/Card"

type Props = {
    data: AnilistTrendingInterface[] 
    type?: string
    isCardComponent: boolean
}

export default function SliderSection({ data, type, isCardComponent }: Props) {
    return (
        <Slider>
            {data
                ?.sort((a, b) => b.rating - a.rating)
                ?.map(anime => (
                    <SwiperSlide key={anime?.id}>
                        <Card data={anime} type={type} isComponent={isCardComponent} />
                    </SwiperSlide>
            ))}
        </Slider>
    )
}
