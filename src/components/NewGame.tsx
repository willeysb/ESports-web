import { useState, useEffect } from 'react'

import * as Dialog from "@radix-ui/react-dialog";
import * as Select from '@radix-ui/react-select';

import { getTwitchToken, TokenTwitchProps } from "../utils/getTwitchToken"
import { GameBanner } from './GameBanner';
import axios from 'axios';
import { FloppyDisk  } from 'phosphor-react';

interface GameTwitchProps{
  box_art_url: string,
  id: string,
  name: string
}

export function NewGame () {

  const baseUrl = import.meta.env.VITE_BASE_SERVER_URL

  const [ isOpenModal, setIsOpenModal ] = useState<boolean>()
  const [ tokenTwitch, setTokenTwitch ] = useState<TokenTwitchProps>()
  const [ gamesTwitch, setGamesTwitch ] = useState<GameTwitchProps[]>([])
  const [ gameSelectedId, setGameSelectedId ] = useState<string>()
  const [ gameInfo, setGameInfo ] = useState<GameTwitchProps>()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  function getTwitchAxiosConfig(): any {
    return {headers: {
      "Authorization": `Bearer ${tokenTwitch?.token}`,
      "Client-Id": `${tokenTwitch?.clientId}`
    }}
  }

  function handleOpenModal() {
    if(!tokenTwitch){
      setTokenTwitch(getTwitchToken());
    }
    setIsOpenModal(state => !state)
  }

  function handleSelectGame(id: string) {
    setIsLoading(true)
    if(!!tokenTwitch && id){
      axios.get(`https://api.twitch.tv/helix/games/?id=${id}`, getTwitchAxiosConfig())
        .then((response) => {
          let data = response.data.data[0]
          setGameInfo({...data, box_art_url: data.box_art_url.replace('{width}x{height}','280x385')})
        }).then(() => {
          setIsLoading(false)
          setGameSelectedId(id)
        }).catch(error => {
          console.log(error);
          setIsLoading(false);
        })
    }
  }

  function handleAddGame():void {
    axios.post(`${baseUrl}/games`,{
      title: gameInfo?.name,
      bannerUrl: gameInfo?.box_art_url
    })
  }

  useEffect(() => {
    setIsLoading(true);
    if(!!tokenTwitch){
      axios.get(`https://api.twitch.tv/helix/games/top`, getTwitchAxiosConfig())
        .then((response) => {
          let {data} = response
          setGamesTwitch(data.data)
        }).then(() => {
          setIsLoading(false);
        }).catch(error => {
          console.log(error);
          setIsLoading(false);
        })
    }
  }, [tokenTwitch])

  return (
  <>
    <Dialog.Root open={isOpenModal} onOpenChange={handleOpenModal}> 
      <Dialog.Trigger>
        <GameBanner 
          title={"Ache um jogo"}
          cover={'https://cdn2.iconfinder.com/data/icons/social-aquicons/512/Twitch.png'}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
            <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[360px] shadow-lg shadow-black/25'>
              <Dialog.Title className='text-3xl font-black'> Ache um jogo via Twitch.TV </Dialog.Title>
              <div className='mt-6'>
                <Select.Root value={gameSelectedId} onValueChange={handleSelectGame}>
                  <Select.Trigger disabled={gamesTwitch.length===0} className="px-3 py-2 rounded-lg bg-zinc-500 font-semibold hover:bg-zinc-600 disabled:bg-zinc-700">
                    <Select.Value placeholder="Selecione um jogo da lista."/>
                    <Select.Icon />
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className='rounded-lg m-1 gap-2 flex flex-row'>
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        <Select.Group>
                          <Select.Label>Jogos via Twitch</Select.Label>
                          {gamesTwitch && gamesTwitch.map(game => {
                            return <Select.Item value={game.id} key={game.id} className='cursor-pointer text-white bg-zinc-900 hover:bg-zinc-700 py-3 px-4 text-sm font-semibold placeholder:text-zinc-500'>
                              <Select.ItemText> {game.name} </Select.ItemText>
                              <Select.ItemIndicator />
                            </Select.Item>
                          })}
                          
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              <div className='pt-6 pb-6'>
                {gameInfo && <GameBanner title={gameInfo.name} cover={gameInfo.box_art_url}/> }
              </div>
              <footer className='flex justify-end gap-4'>
              <button 
                className={`disabled:bg-zinc-700 bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3 `}
                onClick={() => handleAddGame()}
                disabled={isLoading}
                >
                <FloppyDisk  className='w-6 h-6'/>
                Adicionar
              </button>
                <Dialog.Close 
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                    Cancelar
                </Dialog.Close>
              </footer>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      
    </>
  )
    
}