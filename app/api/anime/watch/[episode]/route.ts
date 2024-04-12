import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"

const { authorization_key, anilist, anify, external_api, gogo } = config

type Props = {
    params: {
        episode: string
    }
}

export async function GET(req: NextRequest, { params: { episode } }: Props) {
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        
        const sources = await anilist.fetchEpisodeSources(episode)

        return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happened in /anime/watch/[id]/[episode] route ${error}` })
    }
}

export const revalidate = 0