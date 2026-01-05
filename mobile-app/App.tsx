import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LanguageSelectScreen from './src/screens/LanguageSelectScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddSymptomsScreen from './src/screens/AddSymptomsScreen';
import RecordsScreen from './src/screens/RecordsScreen';
import ConsultationScreen from './src/screens/ConsultationScreen';
import MedicineScreen from './src/screens/MedicineScreen';

import { initDatabase } from './src/services/database';
import { startBackgroundSync } from './src/services/sync';
import { useAppStore } from './src/store/appStore';

const Stack = createNativeStackNavigator();

export default function App() {
  const language = useAppStore((state) => state.language);

  useEffect(() => {
    
    const init = async () => {
      await initDatabase();
      startBackgroundSync();
    };
    init();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={language ? 'Home' : 'LanguageSelect'}
          screenOptions={{
            headerStyle: { backgroundColor: '#2E7D32' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        >
          <Stack.Screen
            name="LanguageSelect"
            component={LanguageSelectScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="AddSymptoms"
            component={AddSymptomsScreen}
            options={{ title: 'Add Symptoms' }}
          />
          <Stack.Screen
            name="Records"
            component={RecordsScreen}
            options={{ title: 'My Records' }}
          />
          <Stack.Screen
            name="Consultation"
            component={ConsultationScreen}
            options={{ title: 'Consultation' }}
          />
          <Stack.Screen
            name="Medicine"
            component={MedicineScreen}
            options={{ title: 'Medicine Info' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
