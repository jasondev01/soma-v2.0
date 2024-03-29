import { config } from "@/config"
import { tmdbApiUri } from "@/utils/constants"
import { NextRequest, NextResponse } from "next/server"

const { tmdb_access_key, authorization_key } = config

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const response = await fetch(`${tmdbApiUri}/tv/${searchParams.get("id")}/images`, {
            headers: {
                'Authorization': `Bearer ${tmdb_access_key}`,
                'Accept': 'application/json'
            }
        })

        const result = await response.json()
        return NextResponse.json(result)
    } catch (error: any) {
        return NextResponse.json({error, message: `This just happened in cover route ${error}` })
    }
}   