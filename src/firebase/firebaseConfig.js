import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC-oXvimSe_MsJ_7s36QC0ixOhYYa4asx8",
  authDomain: "blog-auth-572aa.firebaseapp.com",
  projectId: "blog-auth-572aa",
  storageBucket: "blog-auth-572aa.appspot.com",
  messagingSenderId: "823560600856",
  appId: "1:823560600856:web:5baadcb34fca297cde326d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
