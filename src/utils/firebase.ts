import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { firebaseConfig } from './firebaseConfig'

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)

export { auth, signInWithPopup, provider, GoogleAuthProvider }
