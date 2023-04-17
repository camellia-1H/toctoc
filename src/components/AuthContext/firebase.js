// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAFJaQpUJKsAuaE72eNZQhfxHfdESI2klg',
    authDomain: 'toctoc-a30e3.firebaseapp.com',
    projectId: 'toctoc-a30e3',
    storageBucket: 'toctoc-a30e3.appspot.com',
    messagingSenderId: '934504663537',
    appId: '1:934504663537:web:ed64a56c6b5661d8d51c50',
    measurementId: 'G-4B71QNNVET',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// export { auth, provider, db };
