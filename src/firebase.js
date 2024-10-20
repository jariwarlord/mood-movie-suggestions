// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırma bilgileri
const firebaseConfig = {
    apiKey: "AIzaSyBLZi6Df77HXoOujIM1yHME1wY5ATpuSvs",
    authDomain: "moviesuggestion-1edba.firebaseapp.com",
    projectId: "moviesuggestion-1edba",
    storageBucket: "moviesuggestion-1edba.appspot.com",
    messagingSenderId: "315460097938",
    appId: "1:315460097938:web:61d278c243ad3ba8ef134b"
  };

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firestore bağlantısı
const db = getFirestore(app);

export { db };
