import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setCurrentUsername(docSnap.data().username);
          setUsername(docSnap.data().username);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!username.trim()) {
      Alert.alert('Errore', 'Il nome utente non può essere vuoto.');
      return;
    }
    try {
      const userRef = doc(db, 'users', auth.currentUser!.uid);
      await setDoc(userRef, { username }, { merge: true });
      Alert.alert('Successo', 'Nome utente aggiornato con successo!');
      setCurrentUsername(username);
    } catch (error: any) {
      Alert.alert('Errore', error.message || 'Impossibile aggiornare il nome utente');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Alert.alert('Logout effettuato!');
    } catch (error: any) {
      Alert.alert('Errore', error.message || 'Qualcosa è andato storto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilo</Text>
      <Text style={styles.subtitle}>Benvenuto, {currentUsername || 'Utente'}!</Text>

      <TextInput
        style={styles.input}
        placeholder="Aggiorna il tuo nome utente"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Salva Nome Utente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E3F2FD' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 20, marginBottom: 20, color: '#555' },
  input: { width: '80%', padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#60A5FA', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#FF5252', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center', marginTop: 20 },
  logoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
