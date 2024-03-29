import LoadingBar from '@/components/LoadingBar'

export default function Loading() {
    return (
        <>
            <LoadingBar />
            <div className='h-[calc(100vh-305px)] grid place-items-center'>
                <img 
                    src="/loading-bar.svg"
                    height={50}
                    width={50}
                    alt='loading bar'
                    className='object-contain select-none'
                />
            </div>
        </>
    )
}
