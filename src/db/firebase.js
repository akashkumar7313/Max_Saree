import firebase from "firebase/compat/app";
import "firebase/compat/database"; 
import 'firebase/compat/storage'; // Add this line
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPrKFCOzUacvgMf0roQBmopVyPJwze_B4",
  authDomain: "crud-758b3.firebaseapp.com",
  databaseURL: "https://crud-758b3-default-rtdb.firebaseio.com",
  projectId: "crud-758b3",
  storageBucket: "crud-758b3.appspot.com",
  messagingSenderId: "845011600231",
  appId: "1:845011600231:web:1cb166339d378bcb4325c2",
  measurementId: "G-T6FERT3VEP"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const storage = firebase.storage();

export { firebase as default, auth, storage };