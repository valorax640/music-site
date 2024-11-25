import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-FIObqmFuKjZWa_36BL9wLeDmRxW1Oc0",
  authDomain: "music-portfolio-83c1e.firebaseapp.com",
  projectId: "music-portfolio-83c1e",
  storageBucket: "music-portfolio-83c1e.firebasestorage.app",
  messagingSenderId: "93927789543",
  appId: "1:93927789543:web:84d314d61deac80f43e342",
  measurementId: "G-S0VGY2J9C2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };