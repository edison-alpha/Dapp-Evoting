// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQWRr1eBh6UICq42ZekWpUxETOPh57ppU",
    authDomain: "b-vote.firebaseapp.com",
    projectId: "b-vote",
    storageBucket: "b-vote.appspot.com",
    messagingSenderId: "108391650364",
    appId: "1:108391650364:web:d683b4f16dd0daaf165f39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const fbProvider = new FacebookAuthProvider();