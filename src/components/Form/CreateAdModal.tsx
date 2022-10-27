import { FormEvent, useEffect, useState } from "react";


import { Label } from '@radix-ui/react-label';
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from '@radix-ui/react-select';
import * as Checkbox from "@radix-ui/react-checkbox"
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController, ArrowDown } from "phosphor-react";

import { Input } from "../Input";
import axios from "axios";

export interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

interface Props {
  setIsModalOpen: (newState : boolean) => void
}

export function CreateAdModal (props: Props) {

  const baseUrl = import.meta.env.VITE_BASE_SERVER_URL

  const [games, setGames] = useState<Game[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)
  const [gameSelectedId, setGameSelectedId] = useState<string>()
  const [weekDays, setWeekDays] = useState<string[]>([])

  useEffect(() => {
    axios.get(`${baseUrl}/games`).then((response) => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    if(gameSelectedId){
      if (weekDays.length > 0 ) {
        try {
          await axios.post(`${baseUrl}/games/${gameSelectedId}/ads`, {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
          })
          .catch(err => {
            console.log(err)
          })
            alert('Anúncio criado com sucesso!')
            props.setIsModalOpen(false)
          } catch (error) {
            console.log(error)
            alert('Erro ao criar anúncio.')
          }
      } else {
        alert('Pelo menos um dia na semana é necessário.')
      }
    } else {
      alert('É necessário selecionar um jogo.')
    }
    

    
  }
  
  return (
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
    <Dialog.Content className='fixed bg-[#2a2634] md:py-8 md:px-10 py-4 px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-[640px] w-11/12 shadow-lg shadow-black/25'>
      <Dialog.Title className='md:text-3xl text-xl font-black'> Publique um anúncio </Dialog.Title>
      <form className='mt-4' 
            onSubmit={event => handleCreateAd(event)}
            >
        <div className='flex flex-col md:gap-2'>
          <Label className="flex flex-col gap-2 md:pt-4">
            <div>
              Qual o game?
            </div>
            <Select.Root value={gameSelectedId} onValueChange={setGameSelectedId}>
              <Select.Trigger disabled={games.length===0} className="text-left px-3 py-2 bg-zinc-900 hover:bg-zinc-600 disabled:bg-zinc-700">
                <Select.Value placeholder="Selecione um game que deseja jogar"/>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='m-1 gap-2 flex flex-row'>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    <Select.Group>
                      <Select.Item value={""} key={0} disabled className='cursor-not-allowed text-zinc-500 bg-zinc-900 hover:bg-zinc-700 py-3 px-4 text-sm placeholder:text-zinc-500'>
                        <Select.ItemText> Selecione um game que deseja jogar </Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                      {games && games.map(game => {
                        return (
                          <Select.Item value={game.id} key={game.id} className='cursor-pointer text-white bg-zinc-900 hover:bg-zinc-700 py-3 px-4 text-sm placeholder:text-zinc-500'>
                            <Select.ItemText> {game.title} </Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        )
                      })}
                      
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton>
                    <ArrowDown />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </Label>
          
        </div>
        <div className='flex flex-col gap-2 pt-4'>
          <label htmlFor='name'>Seu nome (ou Nickname)</label>
          <Input required id="name" name="name" type='text' placeholder='Como te chamam dentro do game?'></Input>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 pt-4'>
          <div className='flex flex-col gap-2 md:pt-4'>
            <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
            <Input required id="yearsPlaying" name="yearsPlaying" type='number' placeholder='Tudo bem ser ZERO'></Input>
          </div>
          <div className='flex flex-col gap-2 pt-4'>
            <label htmlFor='discord'>Qual seu discord?</label>
            <Input required id="discord" name="discord" type='text' placeholder='Usuario#0000'></Input>
          </div>
        </div>
        <div className='md:flex gap-6 pt-4'>
          <div className='md:flex md:flex-col gap-1'>
            <label htmlFor='weekDays'>Quando costuma jogar?</label>
            <ToggleGroup.Root 
              className='flex gap-1 flex-wrap' 
              type="multiple"
              value={weekDays}
              onValueChange={value => setWeekDays(value)}>
              <ToggleGroup.Item 
                value={'0'}
                type='button'
                title='Domingo' 
                className={`px-3 py-2 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'1'}
                type='button'
                title='Segunda' 
                className={`px-3 py-2 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'2'}
                type='button'
                title='Terça' 
                className={`px-3 py-2 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'3'}
                type='button'
                title='Quarta' 
                className={`px-3 py-2 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'4'}
                type='button'
                title='Quinta' 
                className={`px-3 py-2 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'5'}
                type='button'
                title='Sexta' 
                className={`px-3 py-2 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'6'}
                type='button'
                title='Sábado' 
                className={`px-3 py-2 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          <div className='md:flex md:flex-col md:gap-2 md:flex-1 md:pt-0 pt-4'>
            <label htmlFor='hourStart'>Qual horário do dia?</label>
            <div className='grid grid-cols-2 gap-2'>
              <Input required id="hourStart" name="hourStart" type='time' placeholder='De'></Input>
              <Input required id="hourEnd" name="hourEnd" type='time' placeholder='Até'></Input>
            </div>
          </div>
        </div>
        <label className='mt-2 flex gap-2 text-sm pt-4 items-center hover:cursor-pointer'>
          <Checkbox.Root 
            className="w-6 h-6 p-1 rounded bg-zinc-900"
            checked={useVoiceChannel}
            onCheckedChange={value => {
              if(value !== 'indeterminate') setUseVoiceChannel(!!value)
            }}>
            <Checkbox.Indicator>
              <Check className="w-4 h-4 text-emerald-400"/>
            </Checkbox.Indicator>
          </Checkbox.Root>
          Costumo me conectar ao chat de voz.
        </label>

        <footer className='mt-4 flex flex-wrap justify-end gap-4'>
          <Dialog.Close 
            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
          </Dialog.Close>
            
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
  )
}