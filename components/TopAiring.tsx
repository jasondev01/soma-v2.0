import { AnilistTrendingInterface } from "@/types"
import SliderSection from "./SliderSection"

type Props = {
    data: AnilistTrendingInterface[]
}

export default function TopAiring({ data }: Props) {

    return (
        <section id="top-airing">
            <div className="container mt-10">
                <h2 className="text-lg md:text-xl font-bold uppercase after">
                    Trending Anime
                </h2>
                <SliderSection data={data} isCardComponent={true} />
            </div>
        </section>
    )
}
