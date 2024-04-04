"use client"

import Card from "@/components/cards/Card"
import Slider from "@/components/Slider"
import { AnilistRelationInterface } from "@/types"
import { SwiperSlide } from "swiper/react"

type Props = {
    data: AnilistRelationInterface[]
}

export default function Relations({ data }: Props) {
    return (
        <div className='container w-full h-full'>
            <Slider>
                {data?.map(anime => (
                    <SwiperSlide key={anime?.id}>
                        <Card data={anime} />
                    </SwiperSlide>
                ))}
            </Slider>
        </div>
    )
}
