import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXPdNT6DplJNHAJhT1G14OYGbmH4ld6-o",
  authDomain: "slack-clone-fb34a.firebaseapp.com",
  projectId: "slack-clone-fb34a",
  storageBucket: "slack-clone-fb34a.appspot.com",
  messagingSenderId: "827592515178",
  appId: "1:827592515178:web:75823584cc2defbfbc3413",
  measurementId: "G-QJGSL3KY6V",
};
const firebaseApp = initializeApp(firebaseConfig); //connects our frontend to the firebase
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, auth, provider, serverTimestamp };
