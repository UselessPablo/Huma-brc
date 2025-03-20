// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDEiUIJ8Oikd...",
    authDomain: "huma-84504.firebaseapp.com",
    databaseURL: "https://huma-84504-default-rtdb.firebaseio.com",
    projectId: "huma-84504",
    storageBucket: "huma-84504.appspot.com",
    messagingSenderId: "486032106258",
    appId: "1:486032106258:web:b622447066d46ebc0d89cb"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);  // Aquí estamos exportando correctamente el storage
