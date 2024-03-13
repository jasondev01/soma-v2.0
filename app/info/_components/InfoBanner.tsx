import { InfoInterface, TopInterface } from "@/types"
import { bannerBasePath, logoBasePath } from "@/utils/constants"
import { getBanner, getTMDBResource } from "@/utils/get-anime"
import { random } from "@/utils/helper"
import moment from "moment"
import Image from "next/image"

type Props  = {
    data: InfoInterface
}

export default async function InfoBanner({ data }: Props) {

    const tmdbInfo: TopInterface = await getTMDBResource(data?.title?.replace('(Dub)', ''))
    const banner = await getBanner(String(tmdbInfo?.id))

    const name = `${tmdbInfo?.original_name} / ${tmdbInfo?.name} / ${data?.title}`
    const title = name.includes('undefined') ? data?.title : name 
    const releasedDate = moment(tmdbInfo?.first_air_date).format("LL") || moment(data?.releaseDate).format("LL")
    
    const infos = [
        { name: 'Release Date:', value: releasedDate },
        { name: 'Type/Season:', value: data?.type },
        { name: 'Genre/s:', value: data?.genres?.join(', ') },
        { name: 'Sub or Dub:', value: data?.subOrDub },
        { name: 'Status:', value: data?.status },
        { name: 'Popularity:', value: tmdbInfo?.popularity },
        { name: 'Rating:', value: tmdbInfo?.vote_average },
        { name: 'Other Name/s:', value: data?.otherName },
        { name: 'Total Episode:', value: data?.totalEpisodes },
        { name: 'Description:', value: data?.description || tmdbInfo?.overview },
    ]

    return (
        <section className='relative h-[700px] xl:min-h-[75vh] -mt-20 overflow-hidden w-full grid place-items-center px-5 xl:px-0'>
            <div className="absolute top-0 left-0 w-full h-full z-[1]" />
            {banner?.backdrops?.length > 0 && (
                <Image 
                    priority
                    src={`${bannerBasePath}/${banner?.backdrops[0]?.file_path}`}
                    alt={title}
                    title={title}
                    width={1200}
                    height={1200}
                    className="object-cover h-full w-full opacity-40 absolute top-0 left-0"
                />
            )}
            <div className='container bg-black/20 rounded-sm !p-0 md:!p-5 h-3/4 relative z-[2] mt-16 xl:mt-10 flex gap-x-7 overflow-hidden'>
                <div className="basis-1/3 shrink-0 absolute top-0 left-0 w-full md:relative h-full">
                    <div className="absolute top-0 left-0 w-full z-[2] " />
                    <Image
                        src={data?.image}
                        alt={title}
                        title={title}
                        height={500}
                        width={500}
                        className="w-full h-full object-cover relative z-[-1]"
                    />
                    {banner?.logos?.length > 0 && (
                        <Image
                            src={`${logoBasePath}/${random(banner?.logos)?.file_path}`}
                            alt={title}
                            title={title}
                            width={350}
                            height={350}
                            className="object-contain object-center drop-shadow-md absolute z-[-1] top-4 left-1/2 transform -translate-x-1/2"
                            style={{ filter: 'drop-shadow(0px 4px 4px rgba(103, 232, 249, 1)', }}
                        />
                    )}
                </div>
                <div className="flex-1 h-full flex justify-center flex-col bg-black/50 md:bg-transparent p-3 md:p-0">
                    <h2 className="text-2xl font-bold" style={{ textShadow: "0px 4px 4px rgba(103, 232, 249, 0.5)" }}>
                        {title} 
                    </h2>
                    {infos?.map(info => (
                        <div key={info?.name} className="flex gap-x-3 gap-y-1 first:mt-2 mt-1 text-[11.5px] flex-wrap">
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
        </section>
    )
}
