import { useEffect, useState, createContext, ReactNode } from 'react'
import { Game } from '../components/Form/CreateAdModal'

interface HomeInterface{
  loading: boolean,
  games: Game[] | null,

}

const HomeContext = createContext({} as HomeInterface)

const HomeProvider = (children: ReactNode) => {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<Game[] | null>(null)

  useEffect(() => {
    
  }, [])
  return (
    <HomeContext.Provider value={{
        loading,
        games
      }
    }>
      {children}
    </HomeContext.Provider>
  )


}