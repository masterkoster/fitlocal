import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/ProfileScreen';
import GymStoreScreen from './src/screens/GymStoreScreen';
import ResultsScreen from './src/screens/ResultsScreen';

export type RootStackParamList = {
  Profile: undefined;
  GymStore: undefined;
  Results: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'FitLocal' }} />
        <Stack.Screen name="GymStore" component={GymStoreScreen} options={{ title: 'Select Gym & Store' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Your Plan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
