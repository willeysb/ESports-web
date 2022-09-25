import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL

export interface TokenTwitchProps {
  token: string | null,
  clientId: string | null
}

async function getTokenIfEmpty() {
  const token = localStorage.getItem('token');
  if(!token){
    await axios.get(`${baseUrl}/authTwitch`).then((response) => {
      let { token, clientId } = response.data
      localStorage.setItem('token', token);
      localStorage.setItem('clientId', clientId);
    })
  }
}

export function getTwitchToken ():TokenTwitchProps {
  getTokenIfEmpty();
  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('clientId');
  return { token, clientId }
}