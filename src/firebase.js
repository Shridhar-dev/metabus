// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4g2bADXUE_HogFxphcCF-MB8iWOFsfnU",
  authDomain: "metabus-101.firebaseapp.com",
  projectId: "metabus-101",
  storageBucket: "metabus-101.appspot.com",
  messagingSenderId: "236464815561",
  appId: "1:236464815561:web:e0692fde486df989837c18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const provider = new GoogleAuthProvider();

export {db,provider}
