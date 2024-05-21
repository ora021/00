// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-qUoEPqirPMqVZelszUDzR-pd4-agVeo",
  authDomain: "medibot-f62b5.firebaseapp.com",
  projectId: "medibot-f62b5",
  storageBucket: "medibot-f62b5.appspot.com",
  messagingSenderId: "441047614558",
  appId: "1:441047614558:web:1a0ec554bccd9e05e6a0cf",
  measurementId: "G-F9HXZ13B0P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
