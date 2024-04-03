// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAsQWsbrMBtiEW2lm3s-BQua6y5ubxCZvU",
  authDomain: "the-plan-2465a.firebaseapp.com",
  databaseURL: "https://the-plan-2465a-default-rtdb.firebaseio.com",
  projectId: "the-plan-2465a",
  storageBucket: "the-plan-2465a.appspot.com",
  messagingSenderId: "84793430032",
  appId: "1:84793430032:web:c1129353453583cf167a95",
  measurementId: "G-Y2W25ZMYFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;