"use client"

import Card from "@/components/cards/Card"
import Slider from "@/components/Slider"
import { AnilistRecommendationInterface } from "@/types"
import { SwiperSlide } from "swiper/react"

type Props = {
    data: AnilistRecommendationInterface[]
}

export default function Recommendations({ data }: Props) {
    return (
        <section className="mt-5">
            <div className='container w-full h-full'>
                <h2 className="text-lg md:text-xl font-bold uppercase after">
                    Recommendations
                </h2>
                <Slider>
                    {data?.map(anime => (
                        <SwiperSlide key={anime?.id}>
                            <Card data={anime} />
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        </section>
    )
}
