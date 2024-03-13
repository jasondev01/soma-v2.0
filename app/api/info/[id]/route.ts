import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"

const { gogo } = config

type Props = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: Props) {
    const { id } = params
    
    try {
        const response = await gogo.fetchAnimeInfo(id)

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happened in info/[id] route ${error}` })
    }
}
