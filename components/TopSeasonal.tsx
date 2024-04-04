import { getSeasonal } from "@/utils/get-anime"
import TopSeasonalCard from "./cards/TopSeasonalCard"
import { TopSeasonalInterface } from "@/types"

type TopSeasonalCards = {
    top: TopSeasonalInterface[]
    seasonal: TopSeasonalInterface[]
}

export default async function TopSeasonal() {
    const data = await getSeasonal() as TopSeasonalCards

    return (
        <section>
             <div className="container mt-10 flex gap-y-5 flex-col lg:flex-row gap-x-7 lg:gap-x-24  ">
                <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold uppercase after lg:ml-4">
                        Top 10 Anime
                    </h2>
                    <div className="mt-5 flex flex-col gap-y-3.5">
                        {data?.top
                                ?.slice(0, 10)
                                ?.map((anime: TopSeasonalInterface, idx: number) => (
                            <div key={idx} className="flex gap-x-3 w-full items-center ">
                                <div className="hidden sm:block sm:text-xl font-semibold w-6 sm:w-[37px] text-white/80 relative"
                                    style={{
                                        color: idx < 3 ? `${anime?.color}` : ''
                                    }}
                                >
                                    #{idx+1}
                                </div>
                                <TopSeasonalCard data={anime} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold uppercase after lg:ml-4">
                        Seasonal Anime
                    </h2>
                    <div className="mt-5 flex flex-col gap-y-3.5">
                        {data?.seasonal
                                ?.sort((a, b) => b.rating?.anilist - a.rating?.anilist)
                                ?.slice(0, 10)
                                ?.map((anime: TopSeasonalInterface, idx: number) => (
                            <div key={idx} className="flex gap-x-3 w-full items-center">
                                <div className="hidden sm:block sm:text-xl font-semibold w-6 sm:w-[37px] text-white/80"
                                    style={{
                                        color: idx < 3 ? `${anime?.color}` : ''
                                    }}
                                >
                                    #{idx+1}
                                </div>
                                <TopSeasonalCard data={anime} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
