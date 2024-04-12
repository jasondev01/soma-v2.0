import { AnilistCharacterInterface } from "@/types";

type Props = {
    data: AnilistCharacterInterface
}

export default function CharacterCard({ data: char }: Props) {


    return (
        <div className="h-[165px] lg:h-[210px] block relative group overflow-hidden border border-transparent hover:border-cyan-300 hover:shadow-[0px_0px_5px_1px] hover:shadow-cyan-300 transition-all duration-300 rounded-md"
            title={char?.name?.full}    
        >
            <div className="absolute top-0 left-0 w-full h-full z-[1]" />
            <img 
                src={char?.image}
                alt={`${char?.name?.full}`}
                width={250}
                height={250}
                className="h-full w-full object-cover group-hover:scale-[102%] transition-all duration-300 opacity-100 group-hover:opacity-0 absolute top-0 left-0"
            />
            <img 
                src={char?.voiceActors[0]?.image || '/no_image.png'}
                alt={char?.voiceActors[0]?.name?.full }
                width={250}
                height={250}
                className="h-full w-full object-cover group-hover:scale-[102%] transition-all duration-300 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
            />
            <div className="absolute z-[2] bottom-0 left-0 w-full p-1 lg:p-2 bg-gradient-to-b from-transparent to-black flex flex-col gap-y-[1px]">
                <span className="text-xs md:text-sm font-semibold block group-hover:hidden">
                    {char?.name?.full}    
                </span>
                <span className="text-sm font-semibold hidden group-hover:block">
                    {char?.voiceActors[0]?.name?.full}    
                </span>
                <span className="text-[10px] md:text-xs font-medium">
                    {char?.role} 
                </span>
            </div>
        </div>
    )
}
