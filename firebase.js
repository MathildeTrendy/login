// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_71uaASnsEooXvGDPua1qplNBhhs7GpM",
  authDomain: "login-2a409.firebaseapp.com",
  projectId: "login-2a409",
  storageBucket: "login-2a409.appspot.com",
  messagingSenderId: "619957617006",
  appId: "1:619957617006:web:460233d219f3e64f25c17f",
  measurementId: "G-KJTKNKEK8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database, app }; // Eksporter database og app variablerne

