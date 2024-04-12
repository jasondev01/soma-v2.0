'use client'

import CharacterCard from "@/components/cards/CharacterCard"
import Slider from "@/components/Slider"
import { AnilistCharacterInterface } from "@/types"
import { SwiperSlide } from "swiper/react"

type Props = {
    data: AnilistCharacterInterface[]
}

export default function Characters({ data }: Props) {
    return (
        <section className="pt-5">
            <div className="container w-full h-full">
                <h3 className="text-lg md:text-xl font-bold uppercase after">
                    Characters
                </h3>
                <div className="w-full mt-5 ">
                    <Slider className="!mt-2 characters">
                        {data
                            ?.sort((a, b) => (a.role === 'MAIN' ? -1 : 1))
                            ?.map(char => (
                            <SwiperSlide key={char?.id}>
                                <CharacterCard data={char} />
                            </SwiperSlide>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}
