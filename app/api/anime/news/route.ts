import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"
import { Topics } from "@consumet/extensions"

const { ann, authorization_key } = config

export async function GET(req: NextRequest){
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const response = await ann.fetchNewsFeeds(Topics.ANIME)
        return NextResponse.json(response.slice(0, 20), { status: 200 }, )
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in news api route ${error}` })
    }
}