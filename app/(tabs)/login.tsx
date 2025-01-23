import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';

// Definizione dei tipi per la navigazione
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type NavigationProp = StackNavigationProp<AuthStackParamList>;

interface Props {
  navigation: NavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Accesso riuscito!');
    } catch (error: any) {
      Alert.alert('Errore di accesso', error.message || 'Qualcosa è andato storto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accedi</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Non hai un account? Registrati</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#E3F2FD', 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  input: { 
    width: '100%', 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    marginBottom: 15 
  },
  button: { 
    backgroundColor: '#60A5FA', 
    padding: 15, 
    borderRadius: 8, 
    width: '100%', 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  link: { 
    color: '#1976D2', 
    marginTop: 10, 
    fontSize: 16 
  },
});
