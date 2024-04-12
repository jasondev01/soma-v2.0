import { config } from "@/config"
import { NextRequest, NextResponse } from "next/server"

const{ authorization_key, external_api } = config

type Props = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params: { id } }: Props) {
    const authorization = req.headers.get("Authorization")
    
    try {
        if (!authorization || authorization_key !== authorization.split(" ")[1]) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const response = await fetch(`${external_api}/skip-times/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 60
            }
        })

        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error, message: `This just happed in api/skip/[id] route ${error}` })
    }
}
