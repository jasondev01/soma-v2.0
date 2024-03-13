
export interface PopularInterface {
    id: string
    title: string
    image: string
    url: string
    genres: string[]
}

export interface RecentInterface {
    id: string
    episodeId: string
    episodeNumber: number
    title: string
    image: string
    url: string
}

export interface TopInterface {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    first_air_date: string
    name: string
    vote_average: number
    vote_count: number
}

export interface InfoInterface {
    id: string
    title: string
    url: string
    genres: string[]
    totalEpisodes: number,
    image: string
    releaseDate: string
    description: string
    subOrDub: string,
    type: string
    status: string
    otherName: string
    episodes: EpisodeInterface[]
}

export interface EpisodeInterface {
    id: string
    number: number
    url: string
}

export interface SourceInterface {
    Referer: string
    sources: SourcesInterface[]
    download: string
}

export interface SourcesInterface {
    url: string
    isM3U8: boolean
    quality: string
}

export interface SearchResultInterface { 
   id: string
   image: string
   subOrDub: string
   title: string
   url?: string
   releaseDate?: string
}

export interface NewsAnnInterface {
    title: string
    id: string
    uploadedAt: string
    thumbnail: string
    url: string
}