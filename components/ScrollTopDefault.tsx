'use client'

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react'

export default function ScrollTopDefault() {
    const pathname = usePathname()

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return null
}
