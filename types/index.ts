export interface AnilistRecentInterface {
    id: string
    malId: string
    title: {
      romaji: string
      english: string
      native: string
    },
    image: string 
    imageHash: string
    episodeId: string
    episodeTitle: string
    episodeNumber: number
    type: string 
}

export interface AnilistTrendingInterface {
    id: string,
    malId: number
    title: {
        romaji: string
        english: string
        native: string
        userPreferred: string
    }
    image:  string 
    imageHash?: string
    trailer?: {
        id: string 
        site: string 
        thumbnail: string 
        thumbnailHash: string
    } 
    description?: string
    status: string
    cover: string 
    coverHash: string
    rating: number
    releaseDate: number
    color: string
    genres: string[],
    episodeNumber?: number
    episodeId?: string
    totalEpisodes: number
    duration: number
    type: string 
}

export interface AnilistInfoInterface {
    id: string
    title: {
      romaji: string
      english: string
      native: string
    }
    malId: number
    synonyms: string[]
    isLicensed: boolean
    isAdult: boolean
    countryOfOrigin: string
    trailer: {
        id: string
        site: string
        thumbnail: string
        thumbnailHash: string
    }
    image: string
    imageHash: string
    popularity: number
    color: string
    cover: string
    coverHash: string
    description: string
    status: string
    releaseDate: number
    startDate: { year: number, month: number, day: number },
    endDate: { year: number, month: number, day: number },
    totalEpisodes: number
    currentEpisode: number
    rating: number
    duration: number
    genres: string[]
    season: string
    studios: string[]
    subOrDub: string
    type: string
    recommendations: AnilistRecommendationInterface[]
    relations: AnilistRelationInterface[]
    characters: AnilistCharacterInterface[]
    mappings: {
        id: string
        providerId: string,
        similarity: number
        providerType: string
    }[] | undefined
    artwork: {
        img: string
        type: string
        providerId: string
    }[] | undefined
    episodes: AnilistEpisodeInterface[]
}

export interface AnilistCharacterInterface {
    id: number
    image: string
    imageHash: string
    name: {
        first: string
        full: string
        last: string
        native: string
        userPreferred: string
    }
    role: string
    voiceActors: {
        id: number
        image: string
        imageHash: string
        language: string
        name: {
            first: string
            full: string
            last: string
            native: string
            userPreferred: string
        }
    }[]
}

export interface AnilistRecommendationInterface {
    id: number
    idMal: number
    title: {
      romaji: string
      english: string
      native: string 
      userPreferred: string 
    },
    status: string
    episodes: number
    episodeNumber?: number
    episodeId?: string
    image: string
    cover: string
    score: number
    type?: string
}

export interface AnilistRelationInterface {
    id: number
    relationType: string
    malId: number
    title: {
      romaji: string
      english: string
      native: string
      userPreferred: string
    },
    status: string
    episodes: AnilistEpisodeInterface[] | null
    episodeNumber?: number
    episodeId?: string
    image: string   
    imageHash: string
    color: string
    type: string
    cover: string
    coverHash: string
    rating: number
}

export interface AnilistEpisodeInterface {
    id: string
    title: string
    image: string
    number: number
    description: string
    url?: string
    imageHash: string
    airDate?: string
    createdAt?: string
}

export interface SkipTimeInterface {
    intro: {
        end: number,
        start: number
    },
    outro: {
        end: number,
        start: number
    },
    number: number
}

export interface SourceAnilistInterface {
    headers: {
        Referer: string
    }
    sources: SourcesInterface[]
    quality: string
}

export interface SourcesInterface {
    url: string
    isM3U8: boolean
    quality: string
}

export interface AnilistSearchResultInterface {
    id: string
    malId: number
    title: {
        romaji: string
        english: string
        native: string
    }
    status: string,
    image: string   
    imageHash: string
    cover: string | null
    coverHash: string
    popularity: number
    description: string
    rating: number | null
    genres: string[]
    color: string
    totalEpisodes?: number 
    currentEpisodeCount?: number | null 
    type: string
    releaseDate: number
}

export interface NewsAnnInterface {
    title: string
    id: string
    uploadedAt: string
    thumbnail: string
    url: string
}

export interface WatchedInterface {
    id: string;
    title: string;
    image: string;
    ep: {
        id: string
        number?: number
        url?: string
    }[]
}

export interface TopSeasonalInterface {
    id: string
    coverImage: string
    season: string
    title: {
        native: string
        romaji: string
        english: string
    },
    rating: {
        anilist: number
    },
    format: string
    totalEpisodes: number
    status: string
    duration?: number 
    color: string
}

export interface VideoTrailerInterface {
    videoStreams: {
        url: string
    }[]
}