import { AnilistInfoInterface } from "@/types"
import { cleanDescription } from "@/utils/helper"

type Props = {
    data: AnilistInfoInterface
}

export default function Overview({ data }: Props) {

    const infos = [
        { name: 'Release Date:', value: data?.releaseDate },
        { name: 'Type:', value: data?.type },
        { name: 'Season:', value: data?.season },
        { name: 'Genre/s:', value: data?.genres?.join(', ') },
        { name: 'Studio/s:', value: data?.studios?.join(', ') },
        { name: 'Country:', value: data?.countryOfOrigin },
        { name: 'Sub or Dub:', value: data?.subOrDub },
        { name: 'Status:', value: data?.status },
        { name: 'Popularity:', value: data?.popularity },
        { name: 'Rating:', value: `${data?.rating}%` },
        { name: 'Total Episode:', value: `${data?.totalEpisodes} Episodes` },
        { name: 'Othername/s:', value: data?.synonyms?.join(', ') },
    ]

    return (
        <div className="container w-full h-full">
            <div className="bg-slate-800/60 h-full w-full rounded-xl flex flex-col items-center md:flex-row gap-5 p-2 md:p-4 relative overflow-hidden">
                <div className="w-full md:w-[300px] absolute top-0 left-0 h-full shrink-0 md:relative">
                    <img 
                        src={data?.image}
                        alt={data?.title?.english}
                        width={250}
                        height={200}
                        className="object-cover md:object-contain mx-auto md:mx-0 w-full h-full rounded-md opacity-40 md:opacity-100"
                    /> 
                </div>
                <div className="flex-1 text-xs relative md:static">
                    <h2 className="text-3xl font-semibold">
                        {data?.title?.english}
                    </h2>
                    <p className="mt-2 leading-[17px]">
                        {cleanDescription(data?.description)}
                    </p>
                    <div className="mt-2">
                        {infos?.map(info => (
                            <div key={info?.name} className="flex gap-x-3 gap-y-1 first:mt-2 mt-1 flex-wrap">
                                <span className="opacity-80">
                                    {info?.name}
                                </span>
                                <span className="text-semibold line-clamp-[8]">
                                    {info?.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
