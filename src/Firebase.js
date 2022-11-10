import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALYF8-Rq10-EriieYKDevFMILoF8M0tpY",
  authDomain: "char-react-c1279.firebaseapp.com",
  projectId: "char-react-c1279",
  storageBucket: "char-react-c1279.appspot.com",
  messagingSenderId: "300593249737",
  appId: "1:300593249737:web:f356e06e898da3be483c18",
  measurementId: "G-9Z0DDF7G5K",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
