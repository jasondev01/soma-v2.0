import { NextRequest, NextResponse } from "next/server";
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
        const response = await gogo.fetchEpisodeSources(id)
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in watch/[id] route ${error}` })
    }
}
