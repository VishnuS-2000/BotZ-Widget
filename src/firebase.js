// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM19_KCp_-BSKPdZJjkVTS7rS00zUWkUE",
  authDomain: "botz-5e86b.firebaseapp.com",
  databaseURL: "https://botz-5e86b-default-rtdb.firebaseio.com",
  projectId: "botz-5e86b",
  storageBucket: "botz-5e86b.appspot.com",
  messagingSenderId: "114979646600",
  appId: "1:114979646600:web:dc434282b5b61e473ac33d",
  measurementId: "G-010RM283DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db=getFirestore(app)
