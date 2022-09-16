import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner () {
  return (
    <div className='pt-1 self-stretch bg-nlw-gradient w-full rounded-lg mt-8 overflow-hidden'>
      <div className='bg-[#2a2634] px-8 py-6 rounded-md flex justify-between items-center'>
        <div>
          <span className='text-2xl font-black block text-white'>Não encontrou seu duo?</span>
          <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
        </div>
        <button className='bg-violet-500 px-3 py-4 text-white rounded-md gap-3 hover:bg-violet-600 flex items-center'>
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </button>
      </div>
    </div>
  )
}