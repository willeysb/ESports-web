import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from './assets/logo_esports.svg'
import { CaretRight, CaretLeft, GameController } from 'phosphor-react'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreatAdBanner'
import { useEffect, useState } from 'react';
import { Input } from './components/Input';

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
    console.log('teste')
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
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
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
          <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[640px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'> Publique um anúncio </Dialog.Title>
            <form className='mt-8'>
              <div className='flex flex-col gap-2 pt-4'>
                <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                <Input 
                  id="game" 
                  type='text' 
                  placeholder='Selecione um game que deseja jogar'
                  className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                ></Input>
              </div>
              <div className='flex flex-col gap-2 pt-4'>
                <label htmlFor='name'>Seu nome (ou Nickname)</label>
                <Input id="name" type='text' placeholder='Como te chamam dentro do game?'></Input>
              </div>
              <div className='grid grid-cols-2 gap-6 pt-4'>
                <div className='flex flex-col gap-2 pt-4'>
                  <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type='number' placeholder='Tudo bem ser ZERO'></Input>
                </div>
                <div className='flex flex-col gap-2 pt-4'>
                  <label htmlFor='discord'>Qual seu discord?</label>
                  <Input id="discord" type='text' placeholder='Usuario#0000'></Input>
                </div>
              </div>
              <div className='flex gap-6 pt-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='weekDays'>Quando costuma jogar?</label>
                  <div className='flex gap-1'>
                    <button 
                      title='Domingo' 
                      className="px-3 py-2 bg-zinc-900"
                      >
                        D
                    </button>
                    <button 
                      title='Segunda' 
                      className="px-3 py-2 bg-zinc-900"
                      >
                        S
                    </button>
                    <button 
                      title='Terça' 
                      className="px-3 py-2 bg-zinc-900"
                      >
                        T
                    </button>
                    <button 
                      title='Quarta' 
                      className="px-3 py-2 bg-zinc-900"
                      >
                        Q
                    </button>
                    <button 
                      title='Quinta' 
                      className="px-3 py-2 bg-zinc-900"
                      >
                        Q
                    </button>
                    <button 
                      title='Sexta' 
                      className="px-3 py-2 bg-zinc-900"
                      >
                        S
                    </button>
                    <button 
                      title='Sábado' 
                      className="px-3 py-2 bg-zinc-900"
                      >
                        S
                    </button>
                  </div>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor='hourStart'>Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input id="hourStart" type='time' placeholder='De'></Input>
                    <Input id="hourEnd" type='time' placeholder='Até'></Input>
                  </div>
                </div>
              </div>
              <div className='mt-2 flex gap-2 text-sm pt-4'>
                <Input type='checkbox'></Input>
                Costumo me conectar ao chat de voz.
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close 
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                    Cancelar
                </Dialog.Close >
                  
                <button 
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                  type="submit">
                  <GameController className='w-6 h-6'/>
                  Encontrar duo
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
