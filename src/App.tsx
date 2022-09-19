import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from './assets/logo_esports.svg'
import { CaretRight, CaretLeft } from 'phosphor-react'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreatAdBanner'
import { useEffect, useState } from 'react';
import { CreateAdModal } from './components/Form/CreateAdModal';
import axios from 'axios';

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios.get('http://localhost:3333/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex-col flex items-center my-20'>
      <img src={logoImg} />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.
      </h1>
      <div className='flex'>
        <CaretLeft size='48' className='h-full pt-36 mr-4 text-zinc-400' />
        <div className='grid grid-cols-6 gap-6 mt-16'>
          {games.map(game => {
            return <GameBanner 
              key={game.id}
              title={game.title}
              cover={game.bannerUrl}
              ads={game._count.ads}
            />
          })}
        </div>
        <CaretRight size='48' className='h-full pt-36 ml-4  text-zinc-400' />
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
