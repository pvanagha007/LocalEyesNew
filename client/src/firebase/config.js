// src/firebase/config.js - Storage removed
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcsWQpxJt7o1QTvsHmTgU5bcpEpAFdl3M",
  authDomain: "localeyes-app-f82b1.firebaseapp.com",
  projectId: "localeyes-app-f82b1",
  storageBucket: "localeyes-app-f82b1.firebasestorage.app",
  messagingSenderId: "356854769018",
  appId: "1:356854769018:web:4a6701ba7a228844e062c3",
  measurementId: "G-RKBV2BLP3T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
