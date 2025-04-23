// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAacnWZVIR0s_0R8JLsb9nLAgvZlpZyFFU",
  authDomain: "proyecto-desarrollo-2.firebaseapp.com",
  projectId: "proyecto-desarrollo-2",
  storageBucket: "proyecto-desarrollo-2.firebasestorage.app",
  messagingSenderId: "710499156808",
  appId: "1:710499156808:web:8004d7a227d4ad7a3fe97d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);