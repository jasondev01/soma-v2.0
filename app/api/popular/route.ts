import { NextResponse } from "next/server"
import { config } from "@/config"

const { gogo } = config

export async function GET(){

    try {
        const response = await gogo.fetchPopular()

        return NextResponse.json(response?.results, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `This just happed in popuplar api route ${error}` })
    }
}
