import { auth } from './utils/firebase'
import { UserInfo } from 'firebase/auth'

import { useState } from 'react';
import './styles/main.css'
import { Home } from './components/Home';
import { Login } from './components/Login';

function App() {  

  return (
    <div className='flex flex-col'>
      <Login /> 
      <Home />
    </div>
  )
}

export default App
