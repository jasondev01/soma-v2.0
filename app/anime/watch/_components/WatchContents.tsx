import { AnilistInfoInterface } from '@/types'
import SideEpisodes from './SideEpisodes'
import WatchOverview from './WatchOverview'
import { config } from '@/config'
import Disqus from './Disqus'
import WatchEpisodes from './WatchEpisodes'
import AnimePlayer from './AnimePlayer'

type Props = {
    data: AnilistInfoInterface
    id: string
    episode: string
}

const { disqus_shortname } = config

export default async function WatchContents({ data, id, episode,  }: Props) {
    const currentEpisode = data && data?.episodes?.length !==0 ? data?.episodes?.find(ep => ep?.id === episode) : undefined

    return (
        <>
            <section className="relative min-h-[500px] w-full">
                <div className="container h-full relative shrink-0 flex gap-x-4">
                    <div className='w-full xl:w-[72%] pt-3'>
                        <AnimePlayer data={data} id={id} episode={episode} currentEpisode={currentEpisode} />
                        <div className='pt-3.5 pb-3 border-b border-slate-300/10'>
                            <h2 className='text-lg md:text-3xl font-semibold tracking-wide'>
                                {data?.title?.english || data?.title?.romaji}
                            </h2>
                            <h3 className='text-[13px] md:text-lg font-medium tracking-wide'>
                                Episode {currentEpisode?.number} {currentEpisode?.title && `- ${currentEpisode?.title}`}
                            </h3>
                        </div>
                        <WatchEpisodes data={data} currentEpisode={currentEpisode} />
                        <WatchOverview data={data} />
                        <Disqus currentEpisode={currentEpisode} data={data} disqus_shortname={disqus_shortname}  />
                    </div>
                    <div className='flex-1 h-[1200px] shrink-0 p-2 hidden xl:block'>
                        <SideEpisodes data={data} currentEpisode={currentEpisode} />
                    </div>
                </div>
            </section>
        </>
    )
}
