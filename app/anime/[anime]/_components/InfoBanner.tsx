import { AnilistInfoInterface } from "@/types"
import Image from "next/image"

type Props = {
    data: AnilistInfoInterface
}

export default function InfoBanner({ data }: Props) {

    
    return (
        <section className="h-[350px] absolute left-0 top-0 -mt-[100px] w-full">
            <div className="h-full w-full relative">
                <div className="absolute top-0 left-0 w-full h-full z-[1] hero" />
                <Image 
                    priority
                    src={data?.cover}
                    alt={data?.title?.english || data?.title?.romaji}
                    width={1200}
                    height={350}
                    className="object-cover w-full h-full opacity-80 object-top"
                />
            </div>
        </section>
    )
}
