import { config } from "@/config";
import { tmdbApiUri } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

const { tmdb_access_key } = config

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl

    try {
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