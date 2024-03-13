import { config } from "@/config"
import { Metadata } from "next"

const { baseUrl } = config

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl as string),
    title: 'DMCA Takedown Request',
    description: "Read the DMCA Takedown Request",
    keywords: 'Soma DMCA Takedown Request, dmca takedown request, takedown request, dmca',
    alternates: {
        canonical: '/dmca'
    },
    openGraph: {
        title: 'DMCA Takedown Request',
        description: 'Read the DMCA Takedown Requests',
        url: '/dmca',
        siteName: 'Soma',
        images: [
            {
                url: '/soma-og.webp',
                width: 800,
                height: 600,
                alt: 'Soma TV',
            },
            {
                url: '/soma-og.webp',
                width: 1800,
                height: 1600,
                alt: 'Soma TV',
            },
        ],
        type: 'website',
    },
}

export default function DMCA() {
    return (
        <main>
            <section className='h-[calc(100vh-305px)] grid place-items-center'>
                <div className='container text-sm'>
                    <h2 className="text-2xl font-bold mb-3">
                        DMCA Takedown Request
                    </h2>
                    <p className="mb-2">
                        The anime streaming website (soma-anime.) provides links to content hosted by third-party sites. We do not host any of the anime or other content ourselves, and we do not have control over the content hosted on these third-party sites. We simply provide links to these sites as a service to our users.
                    </p>
                    <p className="mb-2">
                        We take copyright infringement very seriously and will promptly remove any content that violates copyright laws or the Digital Millennium Copyright Act (DMCA) when we are notified of such violations. If you believe that any content on our site infringes your copyright or the copyright of someone you represent, please send us a DMCA takedown notice.
                    </p>
                    <p className="mb-2">
                        To file a DMCA takedown notice, please provide us with the following information:
                    </p>
                    <ul className="list-disc ml-8 mb-2 flex flex-col gap-y-2">
                        <li>
                            Identification of the copyrighted work you claim has been infringed.
                        </li>
                        <li>
                            Identification of the material that you claim is infringing and that you want removed, with enough detail so that we may locate it.
                        </li>
                        <li>
                            Your name, address, telephone number, and email address.
                        </li>
                        <li>
                            A statement that you have a good faith belief that the use of the copyrighted material is not authorized by the copyright owner, its agent, or the law.
                        </li>
                        <li>
                            A statement that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.
                        </li>
                    </ul>
                    <p className="">
                        Please send your DMCA takedown notice to <a href="mailto: somajsn@gmail.com" target="_blank" className="text-cyan-400 font-bold tracking-wide relative after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-cyan-400 hover:after:transition-all hover:after:w-full  ">somajsn@gmail.com</a>. We will promptly investigate and take appropriate action in accordance with the DMCA.
                    </p>
                </div>
            </section>
        </main>
    )
}
