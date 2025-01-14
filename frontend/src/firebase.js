// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import auth functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDI5Lt-xzt51sZ8kMdiV8xrr797E_f_8I",
  authDomain: "realestate-bc6ed.firebaseapp.com",
  projectId: "realestate-bc6ed",
  storageBucket: "realestate-bc6ed.firebasestorage.app",
  messagingSenderId: "765260604494",
  appId: "1:765260604494:web:bd4faf6f716d039bb00f1f",
  measurementId: "G-3SE7Y2W0S6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();

// Export auth and provider for use in other parts of your app
export { auth, provider };