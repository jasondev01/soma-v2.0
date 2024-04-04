import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { breakpoint1 } from '@/utils/breakpoints'

type Props = {
    children: React.ReactNode
    className?: string
    breakpoint?: {
        [key: number]: {
            slidesPerView: number
        }
    }
}

export default function Slider({ children, className, breakpoint }: Props) {
    return (
        <Swiper
            breakpoints={breakpoint ? breakpoint : breakpoint1}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Navigation]}
            className={`mt-5 ${className}`}
        >
            {children}
        </Swiper>
    )
}
