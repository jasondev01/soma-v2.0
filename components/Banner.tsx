import { PopularInterface, TopInterface } from "@/types"
import { logoBasePath, bannerBasePath } from "@/utils/constants"
import { getBanner, getTMDBResource } from "@/utils/get-anime"
import { random } from "@/utils/helper"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"

type Props = {
    data: PopularInterface[]
}

export default async function Banner({ data }: Props) {
    const top: TopInterface = await getTMDBResource(data[0]?.title)
    const banner = await getBanner(String(top?.id))

    return (
        <section className="relative h-[500px] xl:h-[75vh] -mt-20 overflow-hidden w-full">
            <div className="absolute top-0 left-0 w-full h-full z-[1]" />
            {banner?.backdrops?.length > 0 && (
                <Image 
                    priority
                    src={`${bannerBasePath}/${random(banner?.backdrops)?.file_path}`}
                    alt={`${top?.original_name}`}
                    width={1200}
                    height={1200}
                    className="object-cover h-full w-full opacity-40 absolute top-0 left-0"
                />
            )}
            <div className="container mt-14 flex justify-between lg:gap-x-2 items-center h-full relative z-[2]">
                <div className="flex-1 shrink-0">
                    <h2 className="text-2xl font-semibold text-white" style={{ textShadow: "0px 4px 4px rgba(103, 232, 249, 0.5)" }}>
                        {data[0]?.title } {data[0]?.title ? " / " : ''} {top?.original_name}
                    </h2>
                    <span className="text-[11px] mt-1">
                        {moment(top.first_air_date).format('LL')}
                    </span>
                    <p className="text-sm mt-3 line-clamp-5 xl:w-3/4">
                        {top?.overview}
                    </p>

                    <div className="flex gap-2 mt-4">
                        <Link 
                            href={`/watch/${data[0]?.id}-episode-1`} 
                            className="text-sm uppercase font-bold btn btn-primary"
                        >
                            First Episode
                        </Link>
                        <Link
                            href={`/info/${data[0]?.id}`}
                            className="text-sm uppercase font-bold btn"
                        >
                            Info<span className="sr-only">rmation</span>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:flex justify-end w-fit">
                    {banner?.logos?.length > 0 && (
                        <Image
                            src={`${logoBasePath}/${random(banner?.logos)?.file_path}`}
                            alt={`${top.original_name}`}
                            width={350}
                            height={350}
                            className="object-contain object-center drop-shadow-md w-3/4 h-3/4 lg:w-full xl:h-full"
                            style={{ filter: 'drop-shadow(0px 4px 4px rgba(103, 232, 249, 1)', }}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
