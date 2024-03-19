import { ANIME, META, NEWS } from "@consumet/extensions"

const isProduction = process.env.NODE_ENV === "production"

export const config = {
    baseUrl: isProduction ? process.env.NEXT_PUBLIC_URL : 'http://localhost:3000',
    tmdb_access_key: process.env.TMDB_ACCESS_KEY,
    disqus_shortname: process.env.DISQUS_SHORT_NAME,
    authorization_key: process.env.AUTHORIZATION_KEY,
    gogo: new ANIME.Gogoanime(),
    zoro: new ANIME.Zoro(),
    anilist: new META.Anilist(),
    ann: new NEWS.ANN()
}