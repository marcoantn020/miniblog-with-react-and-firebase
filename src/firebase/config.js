import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT2e8L2uKCPohDMDIAldzeBmCHRP-zj_0",
  authDomain: "miniblog-30f9a.firebaseapp.com",
  projectId: "miniblog-30f9a",
  storageBucket: "miniblog-30f9a.appspot.com",
  messagingSenderId: "329455045550",
  appId: "1:329455045550:web:24e3ceb79e7550582a163f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }