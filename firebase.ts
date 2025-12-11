import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBrgrFrPE9oDIjVaLuORcf1lqYSXIgTWeE",
  authDomain: "aavointernation-landingpage.firebaseapp.com",
  projectId: "aavointernation-landingpage",
  storageBucket: "aavointernation-landingpage.firebasestorage.app",
  messagingSenderId: "1026919648062",
  appId: "1:1026919648062:web:db13af3f2e20d2cbe2ba6f"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
