import type { Metadata, Viewport } from "next"
import { Raleway } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ScrollTopButton from "@/components/ScrollTopButton"
import ScrollTopDefault from "@/components/ScrollTopDefault"

const raleway = Raleway({ subsets: ["latin"] })

export const viewport: Viewport = {
    themeColor: '#317EFB',
}

export const metadata: Metadata = {
    title: {
        template: 'Soma | %s',
        default: 'Soma',
    },
    robots: {
        index: true,
        follow: true,
    },
    verification: {
        google: [ "Rvz79dlMLtSH_LQe2d7wBI6vEG5gF7fVvry88YA7mK0", ]
    },
    openGraph: {
        locale: 'en_US',
        type: 'website',
    },
}


type Props = {
    children: React.ReactNode
}

export default function RootLayout({ children, }: Readonly<Props>) {
    return (
        <html lang="en">
            <body className={raleway.className} suppressHydrationWarning>
                <Nav />
                    {children}
                <Footer />
                <ScrollTopButton />
                <ScrollTopDefault />
            </body>
        </html>
    )
}
