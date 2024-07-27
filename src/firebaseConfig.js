// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClpvVzZX4dgmVUD2B1dlmyOfQ_FMuaXl0",
  authDomain: "student-management-syste-ae267.firebaseapp.com",
  projectId: "student-management-syste-ae267",
  storageBucket: "student-management-syste-ae267.appspot.com",
  messagingSenderId: "462381366063",
  appId: "1:462381366063:web:8fc95e126f6ac5d1b7bfda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore

const db = getFirestore(app);

export { db }