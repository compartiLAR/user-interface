// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYQh3DS9v4Tt9okhIHqjv_EseH_kYxVIs",
  authDomain: "compartilar-6dfcc.firebaseapp.com",
  projectId: "compartilar-6dfcc",
  storageBucket: "compartilar-6dfcc.firebasestorage.app",
  messagingSenderId: "576290408753",
  appId: "1:576290408753:web:22abe90dfe5513bcca8810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);