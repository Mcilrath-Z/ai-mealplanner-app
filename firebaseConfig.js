// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Authentication
import { getFirestore } from "firebase/firestore";  // Firestore

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCLiw4CdKf96qRemdNOOSvZZ9_8iRPvGNQ",
  authDomain: "ai-meal-planner-backend.firebaseapp.com",
  projectId: "ai-meal-planner-backend",
  storageBucket: "ai-meal-planner-backend.appspot.com",
  messagingSenderId: "1057307988271",
  appId: "1:1057307988271:web:857a0300e7d4a3ccd951da",
  measurementId: "G-T4R0BVZZ47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);  // Add Authentication
export const db = getFirestore(app);  // Add Firestore
export default app;
