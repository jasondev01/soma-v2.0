import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"

const { gogo, authorization_key } = config

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
        
        const response = await gogo.fetchAnimeInfo(id)

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happened in info/[id] route ${error}` })
    }
}
