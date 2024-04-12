import { config } from "@/config"
import { NextRequest, NextResponse } from "next/server"

const{ authorization_key, external_api } = config

export async function GET(req: NextRequest) {
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const fields = `[id,title,coverImage,rating,format,totalEpisodes,season,status,duration,color]`
        const response = await fetch(`${external_api}/seasonal/anime?fields=${fields}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 60
            }
        })

        const data = await response.json()

        const result = {
            ...data,
            trending: undefined,
            popular: undefined,
        }

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in api/seasonal route ${error}` })
    }
}
