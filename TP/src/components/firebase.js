
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, push, ref, set, update, get, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyCqYXE71qpwWfco7MDRzgkLpvYM0ZTZws4",
  authDomain: "lwink-7f354.firebaseapp.com",
  projectId: "lwink-7f354",
  storageBucket: "lwink-7f354.firebasestorage.app",
  messagingSenderId: "395539939590",
  appId: "1:395539939590:web:2b64a01f80dd1e116fde87",
  measurementId: "G-ZSHK22XCZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const auth = getAuth(app);

export const saveUserName = async (userName) => {
  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const collection = ref(database, 'demo-user');
  await push(collection, {
    name: userName,
  });
  console.log('user name saved');
}

export const getUsers = async () => {
  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const collection = ref(database, 'demo-user');
  const snapshot = await get(collection);
  console.log('snapshot', snapshot);
  const data = snapshot.val();
  return data;
}

export const listenUsers = (callback) => {
  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const collection = ref(database, 'demo-user');
  onValue(collection, (snapshot) => {
    const data = snapshot.val();
    const usersArray = Object.values(data);
    callback(usersArray);
  });
}

export const login = async () => {
  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log('user info', result);
}
