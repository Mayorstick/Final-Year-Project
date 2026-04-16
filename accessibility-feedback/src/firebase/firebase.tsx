import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArGXrN2fjcaEn03KtfMEClLuz7ck_KglQ",
    authDomain: "accessibility-explainer.firebaseapp.com",
    projectId: "accessibility-explainer",
    storageBucket: "accessibility-explainer.firebasestorage.app",
    messagingSenderId: "178255952998",
    appId: "1:178255952998:web:ec56c5fe10f56e344781a7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)