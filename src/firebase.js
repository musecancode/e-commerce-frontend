// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4oUsPu40t8fdRFsxgFdvgL8R6mlx8FP8",
  authDomain: "ecommerce-frontend-cba6d.firebaseapp.com",
  projectId: "ecommerce-frontend-cba6d",
  storageBucket: "ecommerce-frontend-cba6d.firebasestorage.app",
  messagingSenderId: "755200215294",
  appId: "1:755200215294:web:ce4161213e9fd167ee3daf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
