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
        <div className="container w-full h-full">
            <div className="w-full">
                <h2 className="text-lg md:text-xl font-bold uppercase">
                    Main
                </h2>
                <Slider className="!mt-2">
                    {data
                        ?.filter(data => data.role === 'MAIN')
                        ?.map(char => (
                        <SwiperSlide key={char?.id}>
                            <CharacterCard data={char} />
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>

            <div className="w-full mt-5">
                <h2 className="text-lg md:text-xl font-bold uppercase">
                    Other Roles
                </h2>
                <Slider className="!mt-2">
                    {data
                        ?.filter(data => data.role !== 'MAIN')
                        ?.map(char => (
                        <SwiperSlide key={char?.id}>
                            <CharacterCard data={char} />
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
