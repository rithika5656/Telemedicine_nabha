/**
 * Screen 1: Language Selection
 * First screen - No API call, saved locally
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { useAppStore } from '../store/appStore';
import { COLORS, SIZES } from '../constants/theme';
import { Language } from '../constants/translations';

export default function LanguageSelectScreen() {
  const navigation = useNavigation<any>();
  const setLanguage = useAppStore((state) => state.setLanguage);
  
  const handleSelectLanguage = async (lang: Language) => {
    await setLanguage(lang);
    navigation.replace('Home');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.icon}>🏥</Text>
        <Text style={styles.title}>Telemedicine</Text>
        <Text style={styles.subtitle}>Nabha</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.selectText}>Select Language</Text>
        <Text style={styles.selectText}>மொழியைத் தேர்ந்தெடுக்கவும்</Text>
        <Text style={styles.selectText}>भाषा चुनें</Text>
      </View>
      
      <View style={styles.buttons}>
        <Button
          title="English"
          icon="🇬🇧"
          onPress={() => handleSelectLanguage('en')}
          style={styles.button}
        />
        
        <Button
          title="தமிழ் (Tamil)"
          icon="🇮🇳"
          onPress={() => handleSelectLanguage('ta')}
          style={styles.button}
        />
        
        <Button
          title="हिन्दी (Hindi)"
          icon="🇮🇳"
          onPress={() => handleSelectLanguage('hi')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge * 2,
    backgroundColor: COLORS.primary,
  },
  icon: {
    fontSize: 64,
    marginBottom: SIZES.paddingMedium,
  },
  title: {
    fontSize: SIZES.fontXLarge,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  subtitle: {
    fontSize: SIZES.fontLarge,
    color: COLORS.textLight,
    opacity: 0.9,
  },
  content: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge * 2,
  },
  selectText: {
    fontSize: SIZES.fontLarge,
    color: COLORS.textPrimary,
    marginVertical: SIZES.paddingSmall,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.paddingLarge,
  },
  button: {
    width: '100%',
  },
});
