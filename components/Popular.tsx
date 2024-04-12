import { AnilistTrendingInterface } from "@/types"
import SliderSection from "./SliderSection"

type Props = {
    data: AnilistTrendingInterface[]
}

export default function Popular({ data }: Props) {

    return (
        <section id="popular">
            <div className="container mt-10">
                <h2 className="text-lg md:text-xl font-bold uppercase after">
                    Popular Anime Of All Time
                </h2>
                <SliderSection data={data} isCardComponent={true}/>
            </div>
        </section>
    )
}
