import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"

const { authorization_key, anilist, anify, external_api, gogo } = config

type Props = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params: { id } }: Props) {
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        
        const [ response, episodes,  ] = await Promise.all([
            anilist.fetchAnimeInfo(id),
            anilist.fetchEpisodesListById(id),
        ])

        let anifyEpisodes

        if (!episodes || episodes?.length === 0) {
            const anifyEpisodesInfo = await fetch(`${external_api}/episodes/${id}`, { next: { revalidate: 0 } }).then(res => res.json())

            anifyEpisodes = anifyEpisodesInfo[0]?.episodes
        }

        const result = {
            ...response,
            mappings: undefined,    
            artwork: undefined,
            episodes: episodes?.length !== 0 ? episodes : anifyEpisodes,
        }

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happened in /anime/info/[id] route ${error}` })
    }
}

export const revalidate = 0