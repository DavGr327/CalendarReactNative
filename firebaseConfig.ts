import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyARja7BlOukccjL9YIpMFeGjqVvADa-A2Q",
  authDomain: "testreactnativestudio.firebaseapp.com",
  projectId: "testreactnativestudio",
  storageBucket: "testreactnativestudio.firebasestorage.app",
  messagingSenderId: "626494768463",
  appId: "1:626494768463:web:07bcfa32b560b18770f13a",
  measurementId: "G-QWM3E269EV"
};

// Inizializza Firebase solo se non è già inizializzato
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };