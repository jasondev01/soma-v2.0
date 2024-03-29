import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"
import { IAnimeResult } from "@consumet/extensions"

const { authorization_key, anilist } = config

type Props = {
    params: {
        query: string
    }
}

export async function GET(req: NextRequest, { params }: Props) {
    const { query } = params
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        let allResults: IAnimeResult[] = []
        let currentPage = 1

        let response = await anilist.search(query)

        allResults = allResults.concat(response.results)

        while (response?.hasNextPage) {
            currentPage++
            response = await anilist.search(query, currentPage)
            allResults = allResults.concat(response?.results)
        }

        console.log({allResults})

        return NextResponse.json(allResults)
    } catch (error) {
        return NextResponse.json({ message: `An error occurred in search/[query] route: ${error}` })
    }
}