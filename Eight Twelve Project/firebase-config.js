// Firebase Configuration
// Replace these values with your actual Firebase project credentials
// You can find these in your Firebase Console: Project Settings > General > Your apps

const firebaseConfig = {
  apiKey: "AIzaSyA911B6LgtWDzlwXzW0H1vvtYLkt18UTj8",
  authDomain: "eight-twelve-97519.firebaseapp.com",
  projectId: "eight-twelve-97519",
  storageBucket: "eight-twelve-97519.firebasestorage.app",
  messagingSenderId: "350738313520",
  appId: "1:350738313520:web:6e38f9d6f718448fce18f5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Firestore
const db = firebase.firestore();

