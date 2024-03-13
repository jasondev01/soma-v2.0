import { NextRequest, NextResponse } from "next/server"
import { config } from "@/config"
import { IAnimeResult } from "@consumet/extensions"

const { gogo } = config

type Props = {
    params: {
        query: string
    }
}

export async function GET(req: NextRequest, { params }: Props) {
    const { query } = params
    
    try {
        let allResults: IAnimeResult[] = []
        let currentPage = 1

        let response = await gogo.search(query)

        allResults = allResults.concat(response.results)

        while (response?.hasNextPage) {
            currentPage++
            response = await gogo.search(query, currentPage)
            allResults = allResults.concat(response?.results)
        }

        return NextResponse.json(allResults)
    } catch (error) {
        return NextResponse.json({ message: `An error occurred in search/[query] route: ${error}` });
    }
}
