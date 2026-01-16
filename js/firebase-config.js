// Firebase Configuration
// Substitua o objeto abaixo pelas chaves que obteve no passo 5 do FIREBASE_SETUP.md
const firebaseConfig = {
    apiKey: "AIzaVy...",
    authDomain: "grace-hope-initiative.firebaseapp.com",
    projectId: "grace-hope-initiative",
    storageBucket: "grace-hope-initiative.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log("Firebase Initialized");
