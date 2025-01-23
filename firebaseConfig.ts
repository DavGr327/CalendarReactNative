import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "your-api",
  authDomain: "your-api",
  projectId: "your-api",
  storageBucket: "your-api",
  messagingSenderId: "your-api",
  appId: "your-api",
  measurementId: "your-api"
};

// Inizializza Firebase solo se non è già inizializzato
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
