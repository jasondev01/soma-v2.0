import Link from 'next/link'

const footerMenus = [
    { menu: 'Terms of Service', href: '/terms' },
    { menu: '•', href: '' },
    { menu: 'DMCA', href: '/dmca' },
    { menu: '•', href: '' },
    { menu: 'GitHub', href: 'https://github.com/jasondev01' },
]

export default function Footer() {
    return (        
        <footer className='mt-16'>
            <div className='container pt-10 pb-5'>
                <Link href='/' className="block w-fit mx-auto text-2xl font-bold tracking-wide">
                    soma-tv.
                </Link>
                <ul className='flex gap-2 justify-center'>
                {footerMenus.map((menu, idx) => (
                    <li key={idx}>
                        <Link
                            href={menu.href}
                            className={`text-[11px] hover:text-cyan-300 transition-all ${menu.href ? '' : 'pointer-events-none'}`}
                        >
                            {menu.menu}
                        </Link>
                    </li>
                ))}
                </ul>
                <p className='text-[11px] text-center mt-2'>
                    This website does not store any files on its server. Instead, it offers links to media content hosted on third-party services. <br />
                </p>
                <ul className='flex gap-2 justify-center mt-1 text-[11px]'>
                    <li>&copy; soma-tv.</li>
                    <li className='bulletpoints'>•</li>
                    <li>2024</li>
                </ul>
            </div>
        </footer>
    )
}
