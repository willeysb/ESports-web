import { auth, signInWithPopup, provider, GoogleAuthProvider } from '../utils/firebase'
import { UserInfo } from 'firebase/auth'
import { GoogleLogo } from 'phosphor-react';
import { GoogleUserDetail } from './GoogleUserDetail';
import { useState } from 'react';

export function Login() {

  const [user, setUser] = useState<UserInfo>();

  auth.onAuthStateChanged(user => {
    setUser(user || undefined)
  })

  function handleClick() {
    if(!user){
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        GoogleAuthProvider.credentialFromResult(result);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('errorCode', errorCode, 'errorMessage', errorMessage, 'email', email, 'credential', credential)
      });
    }
  }

  return (
    
    <div className='self-end'>
      {
        !user && <button onClick={handleClick} className="mr-3 mt-6 rounded-md bg-red-600 text-white text-lg px-4 py-2 flex flex-row items-center gap-3">
          <GoogleLogo size={36}/> Conectar com o Google
        </button>
      }
      {
        user && <GoogleUserDetail/>
      }
    </div>
  )
}