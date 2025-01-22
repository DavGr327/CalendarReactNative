import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: 'gray',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default EventCard;
