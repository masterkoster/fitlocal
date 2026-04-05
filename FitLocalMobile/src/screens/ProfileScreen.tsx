import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'> };

export default function ProfileScreen({ navigation }: Props) {
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('10');
  const [weight, setWeight] = useState('160');
  const [age, setAge] = useState('25');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState('moderate');
  const [currentBF, setCurrentBF] = useState(20);
  const [targetBF, setTargetBF] = useState(15);
  const [goal, setGoal] = useState<'cut' | 'lean_bulk' | 'bulk' | 'recomp'>('lean_bulk');

  const goals = [
    { id: 'cut', label: 'Cut', desc: 'Lose fat' },
    { id: 'lean_bulk', label: 'Lean Bulk', desc: 'Build muscle' },
    { id: 'bulk', label: 'Bulk', desc: 'Build more' },
    { id: 'recomp', label: 'Recomp', desc: 'Both' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>

      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Height</Text>
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.small]} value={feet} onChangeText={setFeet} keyboardType="numeric" />
            <Text style={styles.unit}>ft</Text>
            <TextInput style={[styles.input, styles.small]} value={inches} onChangeText={setInches} keyboardType="numeric" />
            <Text style={styles.unit}>in</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Weight (lbs)</Text>
          <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Age</Text>
          <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Sex</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, sex === 'male' && styles.active]} onPress={() => setSex('male')}>
              <Text style={sex === 'male' ? styles.activeText : styles.buttonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, sex === 'female' && styles.active]} onPress={() => setSex('female')}>
              <Text style={sex === 'female' ? styles.activeText : styles.buttonText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.select}>
          <Text style={styles.selectText}>
            {activity === 'sedentary' ? 'Sedentary' :
             activity === 'light' ? 'Light (1-3x/week)' :
             activity === 'moderate' ? 'Moderate (3-5x/week)' :
             activity === 'active' ? 'Active (6-7x/week)' : 'Very Active'}
          </Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Current Body Fat: {currentBF}%</Text>
        <View style={styles.slider}>
          {[5, 10, 15, 20, 25, 30, 35, 40].map(v => (
            <TouchableOpacity key={v} style={[styles.sliderDot, currentBF === v && styles.sliderDotActive]} onPress={() => setCurrentBF(v)} />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Target Body Fat: {targetBF}%</Text>
        <View style={styles.slider}>
          {[5, 10, 15, 20, 25, 30, 35].map(v => (
            <TouchableOpacity key={v} style={[styles.sliderDot, styles.sliderDotGreen, targetBF === v && styles.sliderDotActiveGreen]} onPress={() => setTargetBF(v)} />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Goal</Text>
        <View style={styles.goals}>
          {goals.map(g => (
            <TouchableOpacity key={g.id} style={[styles.goalButton, goal === g.id && styles.goalActive]} onPress={() => setGoal(g.id as any)}>
              <Text style={[styles.goalLabel, goal === g.id && styles.goalLabelActive]}>{g.label}</Text>
              <Text style={styles.goalDesc}>{g.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate('GymStore')}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', gap: 15 },
  field: { flex: 1, marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 8 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  small: { width: 60 },
  unit: { paddingHorizontal: 8, paddingVertical: 12 },
  button: { flex: 1, padding: 12, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  buttonText: { color: '#666' },
  active: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  activeText: { color: '#fff' },
  select: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  selectText: { color: '#333' },
  slider: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 8 },
  sliderDot: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e5e7eb' },
  sliderDotActive: { backgroundColor: '#2563eb' },
  sliderDotGreen: { backgroundColor: '#dcfce7' },
  sliderDotActiveGreen: { backgroundColor: '#22c55e' },
  goals: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  goalButton: { width: '48%', padding: 15, backgroundColor: '#fff', borderRadius: 8, borderWidth: 2, borderColor: '#e5e7eb' },
  goalActive: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  goalLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  goalLabelActive: { color: '#2563eb' },
  goalDesc: { fontSize: 12, color: '#999', marginTop: 4 },
  continue: { backgroundColor: '#2563eb', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  continueText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
