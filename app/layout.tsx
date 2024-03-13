import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ScrollUp from "@/components/ScrollUp"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        template: 'Soma | %s',
        default: 'Soma',
    },
    robots: {
        index: true,
        follow: true,
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
            <body className={inter.className} suppressHydrationWarning>
                <Nav />
                    {children}
                <Footer />
                <ScrollUp />
            </body>
        </html>
    )
}
