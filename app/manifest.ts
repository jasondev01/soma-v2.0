import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Soma TV (Soma v2.0)",
        short_name: "Soma",
        description: "Version 2.0 of Soma (soma-chill)",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#0f172a",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/logo.png",
                sizes: "any",
                type: "image/png",
            },
            {
                src: "/logo192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/logo512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    }
}
