import { UserInfo } from 'firebase/auth'
import { useState } from 'react';
import { auth } from '../utils/firebase';

import * as HoverCard from '@radix-ui/react-hover-card';

export function GoogleUserDetail() {
  

  const [user, setUser] = useState<UserInfo>();

  auth.onAuthStateChanged(user => {
    console.log('passou aqui', user)
    setUser(user || undefined)
  })

  async function handleSignout(){
    const response = await auth.signOut().then((response)=> {
      console.log(response)
      setUser(undefined)
    }).catch((error) => {
      console.log(error)
    })

    console.log(response)
    console.log(auth.currentUser)
  }
  
  return <div className='text-2xl text-white flex items-center gap-3 p-3'>
    {user?.displayName}
    <HoverCard.Root>
      <HoverCard.Trigger>
        <img className='rounded-full w-12' src={user?.photoURL || "https://i.stack.imgur.com/34AD2.jpg"} />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>
          <div className='bg-zinc-500 rounded-md p-4 text-zinc-300 flex flex-col'>
            <img className='rounded-full w-12 self-end' src={user?.photoURL || "https://i.stack.imgur.com/34AD2.jpg"} />
            <div>{user?.displayName}</div>
            <div>{user?.email}</div>
            <button className='bg-red-800 p-2 rounded-md' onClick={handleSignout}>Desconectar</button>
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  </div>
}