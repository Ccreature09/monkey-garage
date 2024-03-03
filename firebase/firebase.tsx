import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuaVX2bXPngZ2Zr0XNGWaw9wSY7ZiUSUY",
  authDomain: "monkeygarage-14c9b.firebaseapp.com",
  projectId: "monkeygarage-14c9b",
  storageBucket: "monkeygarage-14c9b.appspot.com",
  messagingSenderId: "471826251531",
  appId: "1:471826251531:web:b0fa6e41dacbf629b12c0e",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
