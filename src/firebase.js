import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// My credentials
const firebaseConfig = {
  apiKey: "AIzaSyDHd0NVYsnBgXpE8sgfmp55ZyNwSHdncIg",
  authDomain: "cs279r-svelte.firebaseapp.com",
  projectId: "cs279r-svelte",
  storageBucket: "cs279r-svelte.appspot.com",
  messagingSenderId: "474284938860",
  appId: "1:474284938860:web:0efbcc82c40d9b68a16a49",
  measurementId: "G-80JRKYCLGH",
};

// Initializing a firebase app using my credentials
const app = firebase.initializeApp(firebaseConfig);

// Exporting authentication and the database for use in other files
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
