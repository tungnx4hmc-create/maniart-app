import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWtEsEvxu_wFmTu6A6vR0jzuRr7uJ7aVQ",
  authDomain: "spherical-mystery-fr6mz.firebaseapp.com",
  projectId: "spherical-mystery-fr6mz",
  storageBucket: "spherical-mystery-fr6mz.firebasestorage.app",
  messagingSenderId: "877723436920",
  appId: "1:877723436920:web:b12120a717cae50d83aa8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore targeting our custom database ID
const db = getFirestore(app, "ai-studio-websitekhahcback-1300a03e-0bc2-440c-bb25-02c64e6ec0f0");

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
