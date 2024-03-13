import { config } from "@/config"
import { NextResponse } from "next/server"

const{ gogo } = config

export async function GET() {
    try {
        const response = await gogo.fetchRecentEpisodes()
        return NextResponse.json(response.results)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in recent route ${error}` })
    }
}
