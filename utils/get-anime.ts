import { config } from "../config"

const { baseUrl } = config

const headers = new Headers({
    "Content-Type": "application/json",
    "Accept": `application/json`,
})

export const getRecent = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/recent`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getRecent', error)
    }
}

export const getTopAiring = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/top-airing`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getTopAiring', error)
    }
}

export const getPopular = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/popular`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getPopular', error)
    }
}

export const getInfo = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/info/${id}`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getInfo', error)
    }
}

export const getSources = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/watch/${id}`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getSources', error)
    }
}

export const getTMDBResource = async (title: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/tmdb?query=${title}`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getSources', error)
    }
}

export const getBanner = async (title: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/cover?id=${title}`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getSources', error)
    }
}

export const searchAnime = async (query: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/search/${query}`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })
        return await response.json()
    } catch (error) {
        console.log('searchAnime', error)
    }
} 

export const getNews = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/news`, {
            method: 'GET',
            headers: headers,
            next: {
                revalidate: 3600
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getNews', error)
    }
}
