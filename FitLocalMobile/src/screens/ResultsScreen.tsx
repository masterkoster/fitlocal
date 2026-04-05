import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const workouts = [
  { day: 1, name: 'Push Day', exercises: ['Bench Press 4x10', 'Shoulder Press 3x12', 'Lateral Raises 3x15', 'Tricep Pushdown 3x12'] },
  { day: 2, name: 'Pull Day', exercises: ['Lat Pulldown 4x10', 'Seated Row 4x10', 'Face Pulls 3x15', 'Barbell Curl 3x12'] },
  { day: 3, name: 'Legs Day', exercises: ['Squats 4x10', 'Leg Press 3x12', 'Leg Curls 3x12', 'Calf Raises 4x15'] },
  { day: 4, name: 'Push Day', exercises: ['Bench Press 4x10', 'Shoulder Press 3x12', 'Lateral Raises 3x15', 'Tricep Pushdown 3x12'] },
  { day: 5, name: 'Pull Day', exercises: ['Lat Pulldown 4x10', 'Seated Row 4x10', 'Face Pulls 3x15', 'Barbell Curl 3x12'] },
  { day: 6, name: 'Legs Day', exercises: ['Squats 4x10', 'Leg Press 3x12', 'Leg Curls 3x12', 'Calf Raises 4x15'] },
  { day: 7, name: 'Rest Day', exercises: [] },
];

const meals = [
  { day: 'Monday', meals: { breakfast: '4 Eggs + Greek Yogurt (52g)', lunch: '6oz Chicken + Rice (45g)', dinner: '6oz Salmon (40g)', snack: 'Protein Shake (24g)' } },
  { day: 'Tuesday', meals: { breakfast: 'Egg Whites + Oatmeal (40g)', lunch: '6oz Turkey + Potato (42g)', dinner: '6oz Beef (38g)', snack: 'Cottage Cheese (24g)' } },
];

const shoppingList = [
  { name: 'Chicken Breast', qty: '5 lbs' },
  { name: 'Salmon', qty: '2 lbs' },
  { name: 'Ground Turkey', qty: '2 lbs' },
  { name: 'Eggs', qty: '2 dozen' },
  { name: 'Greek Yogurt', qty: '4 containers' },
  { name: 'Protein Powder', qty: '1 tub' },
  { name: 'Rice', qty: '2 lbs' },
];

export default function ResultsScreen() {
  const [tab, setTab] = useState<'workout' | 'food' | 'shop'>('workout');

  const openStore = () => {
    const url = 'https://www.kroger.com/search?q=chicken+breast+salmon+eggs+greek+yogurt+protein+powder';
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Daily Targets</Text>
        <View style={styles.macros}>
          <View style={styles.macro}><Text style={styles.macroLabel}>Calories</Text><Text style={styles.macroValue}>2,650</Text></View>
          <View style={styles.macro}><Text style={styles.macroLabel}>Protein</Text><Text style={styles.macroValue}>145g</Text></View>
          <View style={styles.macro}><Text style={styles.macroLabel}>Carbs</Text><Text style={styles.macroValue}>280g</Text></View>
          <View style={styles.macro}><Text style={styles.macroLabel}>Fat</Text><Text style={styles.macroValue}>65g</Text></View>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, tab === 'workout' && styles.activeTab]} onPress={() => setTab('workout')}>
          <Text style={[styles.tabText, tab === 'workout' && styles.activeTabText]}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'food' && styles.activeTab]} onPress={() => setTab('food')}>
          <Text style={[styles.tabText, tab === 'food' && styles.activeTabText]}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'shop' && styles.activeTab]} onPress={() => setTab('shop')}>
          <Text style={[styles.tabText, tab === 'shop' && styles.activeTabText]}>Shop</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {tab === 'workout' && (
          <View>
            <Text style={styles.subtitle}>Push / Pull / Legs Split</Text>
            {workouts.map(w => (
              <View key={w.day} style={styles.card}>
                <Text style={styles.cardTitle}>Day {w.day}: {w.name}</Text>
                {w.exercises.length === 0 ? (
                  <Text style={styles.rest}>Rest day</Text>
                ) : (
                  w.exercises.map((ex, i) => (
                    <Text key={i} style={styles.exercise}>{ex}</Text>
                  ))
                )}
              </View>
            ))}
          </View>
        )}

        {tab === 'food' && (
          <View>
            <Text style={styles.subtitle}>Weekly meal plan - ~1,015g protein</Text>
            {meals.map(m => (
              <View key={m.day} style={styles.card}>
                <Text style={styles.cardTitle}>{m.day}</Text>
                {Object.entries(m.meals).map(([meal, food]) => (
                  <View key={meal} style={styles.mealRow}>
                    <Text style={styles.mealType}>{meal}</Text>
                    <Text style={styles.mealFood}>{food}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {tab === 'shop' && (
          <View>
            <View style={styles.shopHeader}>
              <View>
                <Text style={styles.shopTitle}>Weekly Shopping List</Text>
                <Text style={styles.shopSubtitle}>~800g protein</Text>
              </View>
              <TouchableOpacity style={styles.shopButton} onPress={openStore}>
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            {shoppingList.map((item, i) => (
              <View key={i} style={styles.shopItem}>
                <Text style={styles.shopItemName}>{item.name}</Text>
                <Text style={styles.shopItemQty}>{item.qty}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#2563eb', padding: 20, paddingTop: 15 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  macros: { flexDirection: 'row', justifyContent: 'space-between' },
  macro: { alignItems: 'center' },
  macroLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  macroValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#2563eb' },
  tabText: { color: '#666', fontSize: 14 },
  activeTabText: { color: '#2563eb', fontWeight: '600' },
  content: { flex: 1, padding: 15 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  rest: { color: '#666', fontStyle: 'italic' },
  exercise: { fontSize: 14, color: '#333', paddingVertical: 4 },
  mealRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  mealType: { fontSize: 12, color: '#666', width: 80 },
  mealFood: { fontSize: 13, color: '#333', flex: 1 },
  shopHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  shopTitle: { fontSize: 16, fontWeight: '600' },
  shopSubtitle: { fontSize: 12, color: '#666' },
  shopButton: { backgroundColor: '#22c55e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  shopButtonText: { color: '#fff', fontWeight: '600' },
  shopItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 8 },
  shopItemName: { fontSize: 14, fontWeight: '500' },
  shopItemQty: { fontSize: 14, color: '#666' },
});
