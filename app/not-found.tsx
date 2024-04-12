import NotFoundBtns from "@/components/NotFoundBtns";
import Image from "next/image";

export default function NotFound() {

    return (
        <main>
            <div className="h-screen w-screen fixed top-0 left-0 z-[-1]">
                <div className="hero" />
                <Image
                    priority
                    src='/eat.webp'
                    alt="Page not found"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover object-right md:object-center"
                />
            </div>
            <div className="h-[calc(100vh-305px)] md:h-[calc(100vh-328px)] flex justify-center items-center flex-col text-center">
                <span className="text-4xl font-bold tracking-wide text-shadow text-black uppercase ">
                    404 Page not found
                </span>
                <NotFoundBtns />
            </div>
        </main>
    )
}
