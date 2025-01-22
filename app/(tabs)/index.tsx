import { Image, StyleSheet, Platform, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CalendarScreen from './calendar';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Benvenuto!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 1: Prova</ThemedText>
        <ThemedText>
          Modifica <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> per vedere i cambiamenti.
          Premi{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          per aprire gli strumenti di sviluppo.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 2: Esplora</ThemedText>
        <ThemedText>
          Tocca la scheda "Esplora" per scoprire cosa è incluso in questa app di partenza.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 3: Calendario Eventi</ThemedText>
        <ThemedText>
          Visualizza e gestisci i tuoi eventi personali con la nostra funzione calendario.
        </ThemedText>
        <View style={styles.calendarContainer}>
          <CalendarScreen />
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 4: Ripristina progetto</ThemedText>
        <ThemedText>
          Quando sei pronto, esegui{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> per ottenere una nuova{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. Questo sposterà l'attuale{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> in{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  calendarContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
