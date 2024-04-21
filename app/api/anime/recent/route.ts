import { config } from "@/config"
import { NextRequest, NextResponse } from "next/server"

const{ authorization_key, anilist } = config

export async function GET(req: NextRequest) {
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const response = await anilist.fetchRecentEpisodes()
        return NextResponse.json(response.results)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in recent route ${error}` })
    }
}

export const revalidate = 60 