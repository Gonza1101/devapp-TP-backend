// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDD5x-RIzrWSuWrSx6qujkRS53vuyPHsp0',
    authDomain: 'ejemploappdev.firebaseapp.com',
    projectId: 'ejemploappdev',
    storageBucket: 'ejemploappdev.firebasestorage.app',
    messagingSenderId: '266394306182',
    appId: '1:266394306182:web:9ddd0382dc0e1904acf307',
    measurementId: 'G-CM5CWQZS2D'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firebasedb = getFirestore(app);
