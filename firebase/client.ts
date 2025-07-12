import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAkjr3A84FPuC67z7L7HqGZzp7lFO9RNNE",
    authDomain: "jobconnect-d0fe0.firebaseapp.com",
    projectId: "jobconnect-d0fe0",
    storageBucket: "jobconnect-d0fe0.firebasestorage.app",
    messagingSenderId: "798879554888",
    appId: "1:798879554888:web:669d36490827f4d5c7e77d",
    measurementId: "G-DLF2NVCVHC"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);