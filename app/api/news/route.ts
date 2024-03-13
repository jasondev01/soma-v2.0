import { NextResponse } from "next/server"
import { config } from "@/config"
import { Topics } from "@consumet/extensions";

const { ann } = config

export async function GET(){

    try {
        const response = await ann.fetchNewsFeeds(Topics.ANIME)

        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in news api route ${error}` })
    }
}
