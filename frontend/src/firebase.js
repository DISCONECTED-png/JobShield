import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBMFYCSktdjZw6PaVEOMrUeiots8EYphk",
  authDomain: "jobshield-c587a.firebaseapp.com",
  projectId: "jobshield-c587a",
  appId: "1:817962981143:web:90eecf3230d0cce5134952",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
