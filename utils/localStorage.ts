import { AnilistEpisodeInterface, WatchedInterface } from "@/types"

type Props = {
    id: string
    title: string
    image: string
    ep: {
        id: string
        number?: number
    }
}

export default function useLocalStorage() {
    const getWatched = () => {
        try {
            if (typeof window !== "undefined") {
                const watched = localStorage.getItem("watched")
                if (watched !== null) {
                    const result = JSON.parse(watched)
                    return result
                }
            }
        } catch (error) {
            console.error("Error getting watched list from localStorage:", error)
        }
        return null
    }

    const setWatched = ({ id, title, image, ep }: Props) => {
        try {
            if (typeof window !== "undefined") {
                const watched = localStorage.getItem("watched")
                const watchedArr: WatchedInterface[] = watched ? JSON.parse(watched) : []

                const existingItemIndex = watchedArr.findIndex(item => item?.id === id)

                if (existingItemIndex !== -1) {
                    watchedArr.push(watchedArr.splice(existingItemIndex, 1)[0])
                    const existingEpisodeIndex = watchedArr[watchedArr.length - 1]?.ep?.findIndex(episode => episode?.id === ep?.id)
                    
                    if (existingEpisodeIndex !== -1) {
                        watchedArr[watchedArr.length - 1].ep.push(watchedArr[watchedArr.length - 1]?.ep?.splice(existingEpisodeIndex, 1)[0])
                    } else {
                        watchedArr[watchedArr.length - 1]?.ep?.push(ep!)
                    }
                } else {
                    watchedArr.push({
                        id,
                        title,
                        image,
                        ep: ep ? [ep] : [],
                    })
                }
                localStorage.setItem("watched", JSON.stringify(watchedArr))
            }
        } catch (error) {
            console.error("Error setting watched item to localStorage:", error)
        }
    }

    const removeWatched = (id: string) => {
        try {
            if (typeof window !== "undefined") {
                const watched = localStorage.getItem("watched")
    
                if (watched) {
                    const watchedArr = JSON.parse(watched)
                    const index = watchedArr.findIndex((item: any) => item.id === id)
                    if (index !== -1) {
                        watchedArr.splice(index, 1)
                        localStorage.setItem("watched", JSON.stringify(watchedArr))
                    }
                }
            }
        } catch (error) {
            console.error("Error removing watched item from localStorage:", error)
        }
    }

    return {
        getWatched,
        setWatched,
        removeWatched,
    }
}
