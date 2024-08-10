
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, connectAuthEmulator, signInWithEmailAndPassword} from 'firebase/auth'




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "ai-chat-support-8d9ed.firebaseapp.com",
  projectId: "ai-chat-support-8d9ed",
  storageBucket: "ai-chat-support-8d9ed.appspot.com",
  messagingSenderId: "622922346282",
  appId: "1:622922346282:web:35ed1bf2448b5305c23853",
  measurementId: "G-G8RLDYH0PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}