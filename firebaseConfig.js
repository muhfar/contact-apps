// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6bkJlwoq6TS2VEmvW-NHoCzYkVmjLdRE",
  authDomain: "contact-apps-3f20f.firebaseapp.com",
  projectId: "contact-apps-3f20f",
  storageBucket: "contact-apps-3f20f.appspot.com",
  messagingSenderId: "274972884316",
  appId: "1:274972884316:web:3a6f12965e43e16b13d599",
  measurementId: "G-9W5FB55WJ8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebase);

export { firebase, firebaseStorage };
