import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"

const { authorization_key, anilist } = config

type Props = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: Props) {
    const { id } = params
    const authorization = req.headers.get("Authorization")

    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const response = await anilist.fetchEpisodeSources(id)

        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in watch/[id] route ${error}` })
    }
}