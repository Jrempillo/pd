// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAM2jqPegMugBmo7vBLen5CmlFBHH5Dd3M",
  authDomain: "pdpalmsap.firebaseapp.com",
  databaseURL: "https://pdpalmsap-default-rtdb.firebaseio.com",
  projectId: "pdpalmsap",
  storageBucket: "pdpalmsap.firebasestorage.app",
  messagingSenderId: "349899581898",
  appId: "1:349899581898:web:8d14b35b24a9aa2687c733",
  measurementId: "G-PSCGFKD3K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// added
const database = getDatabase(app)

export { database }
export const auth = getAuth();
export default app;