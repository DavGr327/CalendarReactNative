import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import EventForm from '../../components/EventForm';
import { DateData } from 'react-native-calendars';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState<{ id: string; title: string; date: string; color: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Recupera eventi da Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventSnapshot = await getDocs(eventsCollection);
        const eventList = eventSnapshot.docs.map(doc => {
          const eventData = doc.data();
          
          // Converte Firestore timestamp in stringa 'YYYY-MM-DD'
          const eventDate = eventData.eventDate?.toDate().toISOString().split('T')[0];
  
          return {
            id: doc.id,
            title: eventData.title || 'Evento senza titolo',
            date: eventDate || '',  // Qui usiamo la data formattata
            color: eventData.color || '#000000',
          };
        });
  
        setEvents(eventList);
        console.log('Eventi caricati:', eventList);  // Debug per vedere gli eventi caricati
      } catch (error) {
        console.error('Errore nel recupero degli eventi:', error);
      }
    };
  
    fetchEvents();
  }, []);
  

  // Filtra eventi per la data selezionata (controlla che il formato corrisponda)
  const filteredEvents = events.filter(event => event.date === selectedDate);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calendario Eventi</Text>

      <Calendar
        current={selectedDate}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#FF5252' },
          ...events.reduce((acc, event) => {
            acc[event.date] = { marked: true, dotColor: event.color };
            return acc;
          }, {} as Record<string, any>)
        }}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        theme={{
          selectedDayBackgroundColor: '#FF5252',
          todayTextColor: '#60A5FA',
          arrowColor: '#60A5FA',
          calendarBackground: '#F6F6F6',
          textMonthFontSize: 18,
          textDayFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />

      <View style={styles.eventContainer}>
        <Text style={styles.todayText}>Eventi del {selectedDate}</Text>

        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.eventItem, { borderLeftColor: item.color }]}>
              <Text style={styles.eventTitle}>{item.title}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noEventsText}>Nessun evento per questa data</Text>}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <EventForm visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  headerText: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  calendar: { alignSelf: 'center', borderRadius: 15, elevation: 5 },
  eventContainer: { backgroundColor: '#fff', marginTop: -20, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, flex: 1 },
  todayText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  noEventsText: { textAlign: 'center', color: 'gray', fontSize: 16, marginVertical: 10 },
  eventItem: { padding: 15, borderLeftWidth: 5, backgroundColor: '#F6F6F6', borderRadius: 8, marginVertical: 8 },
  eventTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#FF5252', borderRadius: 50, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 30, right: 30 },
  addButtonText: { fontSize: 36, color: 'white' },
});
