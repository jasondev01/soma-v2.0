import { config } from "../config"

const { baseUrl } = config

export const getRecent = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/recent`, {
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
        const response = await fetch(`${baseUrl}/api/top-airing`, {
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
        const response = await fetch(`${baseUrl}/api/popular`, {

            next: {
                revalidate: 120 // two minutes
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
        const response = await fetch(`${baseUrl}/api/watch/${id}`, {
            next: {
                revalidate: 120 // two minutes
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
        const response = await fetch(`${baseUrl}/api/cover?id=${title}`, {
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
        const response = await fetch(`${baseUrl}/api/search/${query}`, {
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
        const response = await fetch(`${baseUrl}/api/news`, {
            next: {
                revalidate: 120 // two minutes
            }
        })
        return await response.json()
    } catch (error) {
        console.log('getNews', error)
    }
}
