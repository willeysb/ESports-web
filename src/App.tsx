import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module

import logoImg from './assets/logo_esports.svg'
import { CaretRight, CaretLeft } from 'phosphor-react'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreatAdBanner'
import { useEffect, useState } from 'react';
import { CreateAdModal } from './components/Form/CreateAdModal';
import { NewGame } from './components/NewGame';
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
  
  const baseUrl = import.meta.env.VITE_BASE_SERVER_URL

  const [games, setGames] = useState<Game[]>([])

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: {
        perView: 6,
        spacing: 8,
      },
      breakpoints: {
        '(max-width: 768px)': {
          slides: {
            perView: 2.5,
            spacing: 2,
          },
        },
        '(max-width: 640px)': {
          slides: {
            perView: 1.5,
            spacing: 2,
          },
        },
        
      }
    }
  )

  function goBack () {
    instanceRef.current?.prev();
  }

  function goFoward () {
    instanceRef.current?.next();
  }

  useEffect(() => {
    axios.get(`${baseUrl}/games`).then((response) => {
      setGames(response.data)
    })
  }, [])

  useEffect(() => {
    instanceRef.current?.update()
  }, [games])

  return (
    <div className='max-w-[1344px] mx-auto flex-col flex items-center my-20'>
      <img src={logoImg} />
      <h1 className='text-xl mt-5 md:text-6xl md:mt-20 text-white font-black '>
        Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.
      </h1>
      <div className='w-full flex flex-row px-4'>
        <button className='text-zinc-500 pr-2 text-5xl' onClick={goBack}> {'<'} </button>
        <div className='md:mt-16 md:mb-20 mt-4 mb:5 flex-col flex w-9/12 grow'>
            
            <div ref={sliderRef} className='keen-slider items-stretch'>
              {games.map((game, index) => {
                return <GameBanner 
                      key={game.id}
                      title={game.title}
                      cover={game.bannerUrl}
                      ads={game._count.ads}
                      className="keen-slider__slide justify-center"
                  />
              })}
            <NewGame className='keen-slider__slide'/>
          </div>
        </div>
        <button className='text-zinc-500 w-6 pl-2 text-5xl' onClick={goFoward}> {'>'} </button>
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App