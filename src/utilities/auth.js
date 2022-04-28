import {db,provider} from '../firebase'
import {collection, addDoc,setDoc, Timestamp, doc} from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

async function authenticate(){
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider)
    let user = result.user;
        
    await setDoc(doc(db, 'users', result.user.uid), {
        user:result.user.uid,        
    })   

    return user;
}

export {authenticate}