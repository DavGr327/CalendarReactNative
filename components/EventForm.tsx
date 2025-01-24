import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Switch, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface EventFormProps {
  visible: boolean;
  onClose: () => void;
}

export default function EventForm({ visible, onClose }: EventFormProps) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [sendNotification, setSendNotification] = useState(false);
  const [eventColor, setEventColor] = useState('#4CAF50');

  const handleAddEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert('Errore', 'Il nome dell\'evento è obbligatorio.');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title: eventTitle,
        description: eventDescription,
        eventDate: Timestamp.fromDate(selectedTime),
        sendNotification: sendNotification,
        createdBy: auth.currentUser?.uid || 'anonimo',
        createdAt: Timestamp.now(),
        color: eventColor,
      });

      Alert.alert('Successo', 'Evento creato con successo!');
      setEventTitle('');
      setEventDescription('');
      setSelectedTime(new Date());
      setSendNotification(false);
      onClose();
    } catch (error: any) {
      Alert.alert('Errore', error.message || 'Impossibile creare l\'evento');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Aggiungi Evento</Text>

          <TextInput style={styles.input} placeholder="Titolo" value={eventTitle} onChangeText={setEventTitle} />
          <TextInput style={styles.input} placeholder="Descrizione (opzionale)" value={eventDescription} onChangeText={setEventDescription} />

          <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
            <Text>Data Evento: {selectedTime.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowTimePicker(false);
                if (date) setSelectedTime(date);
              }}
            />
          )}

          <Text style={styles.label}>Colore</Text>
          <View style={styles.colorContainer}>
            {['#1976D2', '#FF9800', '#4CAF50'].map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorCircle, { backgroundColor: color, borderColor: eventColor === color ? '#000' : 'transparent' }]}
                onPress={() => setEventColor(color)}
              />
            ))}
          </View>

          <View style={styles.switchContainer}>
            <Text>Invia notifica push</Text>
            <Switch value={sendNotification} onValueChange={setSendNotification} />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleAddEvent}>
            <Text style={styles.buttonText}>Salva Evento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Annulla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#B0BEC5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
