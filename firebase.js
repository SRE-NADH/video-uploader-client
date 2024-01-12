// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5QWce6YgweLAaRS5itfc21iZHboRijiw",
  authDomain: "video-uploader-2bd46.firebaseapp.com",
  projectId: "video-uploader-2bd46",
  storageBucket: "video-uploader-2bd46.appspot.com",
  messagingSenderId: "298897610278",
  appId: "1:298897610278:web:3cf0b4041709c7a442f8e7",
  measurementId: "G-NFXQWQL93B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};
