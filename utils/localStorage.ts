import { WatchedInterface } from "@/types"

type Props = {
    id: string
    title: string
    image: string
    ep: {
        id: string
        number?: number
        duration?: number
        timeWatched?: number
    }
    nextEp: {
        id: string
        number?: number
    }
    color: string
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

    const setWatched = ({ id, title, image, ep, nextEp, color }: Props) => {
        try {
            if (typeof window !== "undefined") {
                const watched = localStorage.getItem("watched")
                const watchedArr: WatchedInterface[] = watched ? JSON.parse(watched) : []

                const existingItemIndex = watchedArr.findIndex(item => item?.id === id)

                if (existingItemIndex !== -1) {
                    const removedItem = watchedArr.splice(existingItemIndex, 1)[0]
                    removedItem.nextEp.id = nextEp?.id
                    removedItem.nextEp.number = nextEp?.number
                    watchedArr.push(removedItem)
                    const existingEpisodeIndex = watchedArr[watchedArr.length - 1]?.ep?.findIndex(episode => episode?.id === ep?.id)
                    
                    if (existingEpisodeIndex !== -1) {
                        const removedEpisode = watchedArr[watchedArr.length - 1]?.ep?.splice(existingEpisodeIndex, 1)[0]

                        removedEpisode.timeWatched = ep?.timeWatched
                        removedEpisode.duration = ep?.duration
                    
                        watchedArr[watchedArr.length - 1].ep.push(removedEpisode)
                    } else {
                        watchedArr[watchedArr.length - 1]?.ep?.push(ep)
                    }
                } else {
                    watchedArr.push({
                        id,
                        title,
                        image,
                        ep: ep ? [ep] : [],
                        nextEp,
                        color,
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
