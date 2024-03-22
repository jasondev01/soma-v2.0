import BackButton from "@/components/BackButton";
import Image from "next/image";

export default function NotFound() {

    return (
        <main>
            <div className="h-screen w-screen fixed top-0 left-0 z-[-1]">
                <img
                    src='/eat.webp'
                    alt="Page not found"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover object-right md:object-center"
                />
            </div>
            <div className="h-[calc(100vh-305px)] flex justify-center items-center flex-col">
                <span className="text-4xl font-bold tracking-wide text-shadow text-black uppercase">
                    404 Page not found
                </span>
                <BackButton />
            </div>
        </main>
    )
}
