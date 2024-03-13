import { NextResponse } from "next/server"
import { config } from "@/config"

const { gogo } = config

export async function GET(){

    try {
        const response = await gogo.fetchTopAiring()
        return NextResponse.json(response?.results)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in popular route ${error}` })
    }
}
