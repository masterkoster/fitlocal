import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'GymStore'> };

const gyms = [
  'Planet Fitness', 'LA Fitness', 'Lifetime Fitness', "Gold's Gym",
  '24-Hour Fitness', 'Anytime Fitness', 'Crunch Fitness', 'YMCA', 'Local Gym'
];

const stores = [
  'Walmart', 'Target', 'Kroger', 'Costco', 'Aldi', "Trader Joe's",
  'Whole Foods', 'Amazon Fresh', 'Instacart'
];

export default function GymStoreScreen({ navigation }: Props) {
  const [gym, setGym] = useState(gyms[0]);
  const [store, setStore] = useState(stores[2]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select your gym</Text>
      <Text style={styles.subtitle}>We'll tailor exercises to the equipment available</Text>
      <View style={styles.grid}>
        {gyms.map(g => (
          <TouchableOpacity key={g} style={[styles.item, gym === g && styles.active]} onPress={() => setGym(g)}>
            <Text style={[styles.itemText, gym === g && styles.activeText]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.title, { marginTop: 30 }]}>Select your store</Text>
      <Text style={styles.subtitle}>We'll generate shopping lists with links</Text>
      <View style={styles.grid}>
        {stores.map(s => (
          <TouchableOpacity key={s} style={[styles.item, store === s && styles.active]} onPress={() => setStore(s)}>
            <Text style={[styles.itemText, store === s && styles.activeText]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generate} onPress={() => navigation.navigate('Results')}>
          <Text style={styles.generateText}>Generate My Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 15, marginTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  item: { width: '48%', padding: 15, backgroundColor: '#fff', borderRadius: 8, borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center' },
  active: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  itemText: { fontSize: 14, color: '#333' },
  activeText: { color: '#2563eb', fontWeight: '600' },
  buttons: { flexDirection: 'row', gap: 15, marginTop: 30, marginBottom: 30 },
  back: { flex: 1, padding: 16, backgroundColor: '#fff', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  backText: { color: '#666', fontSize: 16 },
  generate: { flex: 2, padding: 16, backgroundColor: '#2563eb', borderRadius: 8, alignItems: 'center' },
  generateText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
