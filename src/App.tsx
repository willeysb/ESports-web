import './styles/main.css'

import logoImg from './assets/logo_esports.svg'
import { MagnifyingGlassPlus, CaretRight, CaretLeft } from 'phosphor-react'
import { GameBanner } from './components/GameBanner'
import { GAMES } from './util/games'
import { CreateAdBanner } from './components/CreatAdBanner'

function App() {

  return (
    <div className='max-w-[1344px] mx-auto flex-col flex items-center my-20'>
      <img src={logoImg} />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.
      </h1>
      <div className='flex'>
        <CaretLeft size='48' className='h-full pt-36 mr-4 text-zinc-400' />
        <div className='grid grid-cols-6 gap-6 mt-16'>
          {GAMES.map(game => {
            return <GameBanner 
              title={game.name}
              cover={game.cover}
              ads={game.ads}
            />
          })}
        </div>
        <CaretRight size='48' className='h-full pt-36 ml-4  text-zinc-400' />
      </div>
      <CreateAdBanner />
    </div>
  )
}

export default App
