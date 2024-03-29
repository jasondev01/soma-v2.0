import { AnilistTrendingInterface } from "@/types"
import Image from "next/image"
import Link from "next/link"
import Slider from "./Slider"
import SliderSection from "./SliderSection"

type Props = {
    data: AnilistTrendingInterface[]
}

export default function Popular({ data }: Props) {

    return (
        <section id="popular">
            <div className="container mt-10">
                <h2 className="text-xl font-bold uppercase after">
                    Popular Anime Of All Time
                </h2>
                <SliderSection data={data}/>
            </div>
        </section>
    )
}
