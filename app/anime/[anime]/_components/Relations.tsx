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
        <div className='container w-full h-full mt-4'>
            <h2 className="text-lg md:text-xl font-bold uppercase after">
                Relations
            </h2>
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
