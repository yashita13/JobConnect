import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9izYrANjnfM9aAmTBsB_kePAxwSKBV1o",
    authDomain: "jobconnect-a948e.firebaseapp.com",
    projectId: "jobconnect-a948e",
    storageBucket: "jobconnect-a948e.firebasestorage.app",
    messagingSenderId: "1068980639415",
    appId: "1:1068980639415:web:5c138d85adef4e9eed1f32",
    measurementId: "G-QB9LJ82P2N"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);