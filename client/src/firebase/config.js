// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcsWQpxJt7o1QTvsHmTgU5bcpEpAFdl3M",
  authDomain: "localeyes-app-f82b1.firebaseapp.com",
  projectId: "localeyes-app-f82b1",
  storageBucket: "localeyes-app-f82b1.firebasestorage.app",
  messagingSenderId: "356854769018",
  appId: "1:356854769018:web:4a6701ba7a228844e062c3",
  measurementId: "G-RKBV2BLP3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;