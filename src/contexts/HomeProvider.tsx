import axios from 'axios'
import { useEffect, useState, createContext, useContext } from 'react'
import { Game } from '../components/Form/CreateAdModal'

interface HomeInterface{
  loading: boolean,
  games: Game[] | null,

}

const HomeContext = createContext({} as HomeInterface)

export const HomeProvider = ({children}) => {

  const baseUrl = import.meta.env.VITE_BASE_SERVER_URL

  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<Game[] | null>(null)

  useEffect(() => {
    axios.get(`${baseUrl}/games`).then((response) => {
      setGames(response.data)
      setLoading(false)
    })
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

export function useHome() {
  const context = useContext(HomeContext);
  return context;
}