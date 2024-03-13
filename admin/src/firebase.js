// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "e-shop-74124.firebaseapp.com",
  projectId: "e-shop-74124",
  storageBucket: "e-shop-74124.appspot.com",
  messagingSenderId: "465698483834",
  appId: "1:465698483834:web:4752dd29c1615596f415c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
