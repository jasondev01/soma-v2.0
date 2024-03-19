import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"

const { gogo, authorization_key } = config

export async function GET(req: NextRequest){
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        
        const response = await gogo.fetchTopAiring()
        return NextResponse.json(response?.results)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in top airing route ${error}` })
    }
}