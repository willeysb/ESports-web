import { useEffect, useState } from 'react'

import * as Dialog from "@radix-ui/react-dialog";
import { getTwitchToken, TokenTwitchProps } from "../utils/getTwitchToken"
import { GameBanner } from './GameBanner';

export function NewGame () {

  const [ isOpenModal, setIsOpenModal ] = useState<boolean>()
  const [ tokenTwitch, setTokenTwitch ] = useState<TokenTwitchProps>()

  function handleOpenModal() {
    if(!tokenTwitch){
      setTokenTwitch(getTwitchToken());
    }
    setIsOpenModal(state => !state)
  }
  
  useEffect(() => {
    
  }, [isOpenModal])

  return (
  <Dialog.Root open={isOpenModal} onOpenChange={handleOpenModal}> 
    <Dialog.Trigger>
      <GameBanner 
        title={"Ache um jogo"}
        cover={'https://cdn2.iconfinder.com/data/icons/social-aquicons/512/Twitch.png'}
      />
    </Dialog.Trigger>
    <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
          <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[640px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'> Ache um jogo via Twitch.TV </Dialog.Title>
            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close 
                className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                  Cancelar
              </Dialog.Close>
            </footer>
          </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
    
}