import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, TextInput, Switch, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState<{ id: string; title: string; notes: string; time: string; color: string; date: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventNotes, setEventNotes] = useState('');
  const [eventColor, setEventColor] = useState('#4CAF50');
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Selezione data
  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  // Aggiungi evento
  const handleAddEvent = () => {
    if (eventTitle.trim()) {
      const formattedTime = selectedTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
      setEvents([
        ...events,
        { id: Math.random().toString(), title: eventTitle, notes: eventNotes, time: formattedTime, color: eventColor, date: selectedDate },
      ]);
      setEventTitle('');
      setEventNotes('');
      setSelectedTime(new Date());
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{new Date(selectedDate).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</Text>
      </View>

      <Calendar
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#1976D2' },
        }}
        onDayPress={handleDayPress}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#1976D2',
          todayTextColor: '#FF5252',
          arrowColor: '#fff',
          calendarBackground: '#60A5FA',
          textMonthFontSize: 18,
          textDayFontSize: 16,
          textDayHeaderFontSize: 14,
          textSectionTitleColor: '#fff',
        }}
      />

      <View style={styles.eventContainer}>
        <Text style={styles.todayText}>Eventi di oggi</Text>
        <FlatList
          data={events.filter(event => event.date === selectedDate)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.eventItem, { borderLeftColor: item.color }]}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventNotes}>{item.notes}</Text>
              <Text style={styles.eventTime}>{item.time}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noEventsText}>Nessun evento per questa data</Text>}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modale per aggiungere evento */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Aggiungi Evento</Text>

            <TextInput style={styles.input} placeholder="Titolo" value={eventTitle} onChangeText={setEventTitle} />
            <TextInput style={styles.input} placeholder="Note" value={eventNotes} onChangeText={setEventNotes} />

            <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
              <Text>Orario: {selectedTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={(event: unknown, date?: Date) => {
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

            <Switch value={alarmEnabled} onValueChange={setAlarmEnabled} />

            <TouchableOpacity style={styles.saveButton} onPress={handleAddEvent}>
              <Text style={styles.buttonText}>Salva</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E3F2FD' },
    header: { backgroundColor: '#60A5FA', padding: 20, alignItems: 'center' },
    headerText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
    calendar: { marginVertical: 10, borderRadius: 15 },
    eventContainer: { backgroundColor: '#fff', padding: 20, flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    todayText: { fontSize: 20, fontWeight: 'bold' },
    noEventsText: { textAlign: 'center', color: 'gray', fontSize: 16, marginVertical: 10 }, // Aggiunto
  
    eventItem: { padding: 15, borderLeftWidth: 5, borderRadius: 8, marginVertical: 8 },
    eventTitle: { fontSize: 18, fontWeight: 'bold' },
    eventNotes: { fontSize: 14, color: '#555' },
    eventTime: { fontSize: 16, color: 'gray' },
  
    addButton: { 
      backgroundColor: '#FF5252', 
      borderRadius: 50, 
      width: 60, 
      height: 60, 
      justifyContent: 'center', 
      alignItems: 'center', 
      alignSelf: 'flex-end' 
    },
    addButtonText: { fontSize: 36, color: 'white' },
  
    modalOverlay: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.5)' 
    },
    modalContainer: { 
      backgroundColor: '#fff', 
      padding: 20, 
      width: '90%', 
      borderRadius: 15 
    },
    modalTitle: { 
      fontSize: 22, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      color: '#333', 
      marginBottom: 20 
    },  // Aggiunto
  
    input: { 
      borderBottomWidth: 1, 
      borderColor: '#ccc', 
      padding: 10, 
      fontSize: 16, 
      marginBottom: 10 
    },
  
    label: { 
      fontSize: 16, 
      fontWeight: '600', 
      marginTop: 10, 
      color: '#333' 
    },  // Aggiunto
  
    colorContainer: { 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      marginVertical: 10 
    },  // Aggiunto
  
    saveButton: { 
      backgroundColor: '#FF5252', 
      padding: 15, 
      borderRadius: 8, 
      alignItems: 'center', 
      marginTop: 20 
    },
  
    buttonText: { 
      color: '#fff', 
      fontWeight: 'bold', 
      fontSize: 18 
    },
  
    colorCircle: { 
      width: 30, 
      height: 30, 
      borderRadius: 15, 
      marginHorizontal: 5, 
      borderWidth: 2 
    }
  });
  

