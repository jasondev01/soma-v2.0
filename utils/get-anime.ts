import { config } from "../config"

const { baseUrl, authorization_key } = config

const headers = new Headers({
    'Accept': 'application/json',
    'Authorization': `Bearer ${authorization_key}`,
})

export const getRecent = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/recent`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getRecent', error)
    }
}

export const getTopAiring = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/top-airing`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getTopAiring', error)
    }
}

export const getPopular = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/popular`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getPopular', error)
    }
}

export const getSeasonal = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/seasonal`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getSeasonal', error)
    }
}

export const getInfo = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/info/${id}`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })

        return await response.json()
    } catch (error) {
        console.log('getInfo', error)
    }
}

export const getSources = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/watch/${id}`, {
            headers: headers,
            next: {
                revalidate: 0 // 0 minutes
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getSources', error)
    }
}

export const getSkipTimes = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/skip/${id}`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getSkipTimes', error)
    }
}

export const getTMDBResource = async (title: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/tmdb?query=${title}`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getSources', error)
    }
}

export const getBanner = async (title: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/cover?id=${title}`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getSources', error)
    }
}

export const searchAnime = async (query: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/search/${query}`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })
        return await response.json()
    } catch (error) {
        console.log('searchAnime', error)
    }
} 

export const getNews = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/anime/news`, {
            headers: headers,
            next: {
                revalidate: 120 // two minutes
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getNews', error)
    }
}
