// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZH4m9d3DK9ZWlADlja6XVBdcveSQM5GU",
  authDomain: "sports-management-kcpd.firebaseapp.com",
  projectId: "sports-management-kcpd",
  storageBucket: "sports-management-kcpd.appspot.com",
  messagingSenderId: "77490130385",
  appId: "1:77490130385:web:e3bfe1910941f2e998a4f0",
  measurementId: "G-NGW1F67N1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
export const storage = getStorage(app)