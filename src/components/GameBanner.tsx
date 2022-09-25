interface GameBannerProps {
  title: string,
  ads?: number,
  cover: string
}

export function GameBanner(props: GameBannerProps) {
  return (
    <div className='relative w-full rounded-lg overflow-hidden h-full'>
      <img src={props.cover} />
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 '>
        <strong className='text-white font-bold block'> {props.title} </strong>
        {props.ads !== undefined 
          ? (<span className='text-zinc-300 text-sm block mt-1'> {props.ads} anúncio{props.ads === 1 ? '' : 's'}</span>)
          : <span className='text-zinc-300 text-sm block mt-1'> Cadastrar (Via Twitch) </span>
        }
      </div>
    </div>
  )
}

