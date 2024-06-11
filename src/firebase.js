// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5070b.firebaseapp.com",
  projectId: "mern-blog-5070b",
  storageBucket: "mern-blog-5070b.appspot.com",
  messagingSenderId: "4986697054",
  appId: "1:4986697054:web:52797be98c7b81feb38bcf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
