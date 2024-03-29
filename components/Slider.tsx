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
            // slidesPerView={slidesPerview || 8}
            breakpoints={breakpoint ? breakpoint : breakpoint1}
            spaceBetween={20}
            pagination={{
                clickable: true,
            }}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className={`mt-5 ${className}`}
        >
            {children}
        </Swiper>
    )
}
