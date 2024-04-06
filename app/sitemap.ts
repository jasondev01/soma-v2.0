import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.soma-tv.me",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
    ]
}