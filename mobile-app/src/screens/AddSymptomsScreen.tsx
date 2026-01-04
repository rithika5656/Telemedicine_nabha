/**
 * Screen 3: Add Symptoms (Offline-capable)
 * - Checkbox list of symptoms
 * - Free text notes
 * - Photo upload
 * - Voice note
 * Saves locally first, syncs when online
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { TextInput } from '../components/TextInput';
import { Card } from '../components/Card';
import { NetworkStatusBar } from '../components/StatusBar';
import { useAppStore } from '../store/appStore';
import { useTranslation } from '../hooks/useTranslation';
import { saveSymptomLocal } from '../services/database';
import { COLORS, SIZES } from '../constants/theme';

const audioRecorderPlayer = new AudioRecorderPlayer();

// Symptom list
const SYMPTOM_KEYS = [
  'fever',
  'cough',
  'headache',
  'bodyPain',
  'cold',
  'stomach',
  'vomiting',
  'diarrhea',
  'breathing',
  'other',
];

export default function AddSymptomsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const patient = useAppStore((state) => state.patient);
  const addSymptom = useAppStore((state) => state.addSymptom);
  const isOnline = useAppStore((state) => state.isOnline);
  
  // Form state
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const [voicePath, setVoicePath] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Toggle symptom selection
  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };
  
  // Take photo
  const handleAddPhoto = async () => {
    Alert.alert(
      t('addPhoto'),
      '',
      [
        {
          text: '📷 Camera',
          onPress: async () => {
            const result = await launchCamera({
              mediaType: 'photo',
              quality: 0.5, // Compress for low bandwidth
              maxWidth: 800,
              maxHeight: 800,
            });
            if (result.assets?.[0]?.uri) {
              setPhotoPath(result.assets[0].uri);
            }
          },
        },
        {
          text: '🖼️ Gallery',
          onPress: async () => {
            const result = await launchImageLibrary({
              mediaType: 'photo',
              quality: 0.5,
              maxWidth: 800,
              maxHeight: 800,
            });
            if (result.assets?.[0]?.uri) {
              setPhotoPath(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };
  
  // Record voice note
  const handleVoiceNote = async () => {
    if (isRecording) {
      // Stop recording
      const result = await audioRecorderPlayer.stopRecorder();
      setVoicePath(result);
      setIsRecording(false);
    } else {
      // Start recording
      await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
    }
  };
  
  // Submit form
  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert('', t('selectSymptoms'));
      return;
    }
    
    setIsSaving(true);
    
    try {
      const symptomData = {
        symptoms: selectedSymptoms,
        notes,
        photoPath: photoPath || undefined,
        voicePath: voicePath || undefined,
      };
      
      // Save to store (which saves to AsyncStorage)
      await addSymptom(symptomData);
      
      // Also save to SQLite for sync queue
      await saveSymptomLocal({
        id: Date.now().toString(),
        patientId: patient?.id || 'demo',
        ...symptomData,
      });
      
      setSaved(true);
      
      // Show success message
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      Alert.alert('', t('tryLater'));
    } finally {
      setIsSaving(false);
    }
  };
  
  if (saved) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>{t('saved')}</Text>
          <Text style={styles.successMessage}>
            {isOnline ? t('syncComplete') : t('willSync')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <NetworkStatusBar />
      
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Symptoms Checklist */}
        <Card icon="📋" title={t('selectSymptoms')}>
          {SYMPTOM_KEYS.map((key) => (
            <Checkbox
              key={key}
              label={t(key)}
              checked={selectedSymptoms.includes(key)}
              onChange={() => toggleSymptom(key)}
            />
          ))}
        </Card>
        
        {/* Additional Notes */}
        <Card icon="📝" title={t('additionalNotes')}>
          <TextInput
            placeholder={t('additionalNotes')}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={styles.notesInput}
          />
        </Card>
        
        {/* Attachments */}
        <Card icon="📎" title="Attachments">
          <View style={styles.attachments}>
            <TouchableOpacity
              style={[styles.attachButton, photoPath && styles.attachButtonActive]}
              onPress={handleAddPhoto}
            >
              <Text style={styles.attachIcon}>📷</Text>
              <Text style={styles.attachText}>
                {photoPath ? '✓ Photo Added' : t('addPhoto')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.attachButton,
                isRecording && styles.attachButtonRecording,
                voicePath && styles.attachButtonActive,
              ]}
              onPress={handleVoiceNote}
            >
              <Text style={styles.attachIcon}>{isRecording ? '⏹️' : '🎤'}</Text>
              <Text style={styles.attachText}>
                {isRecording
                  ? 'Recording...'
                  : voicePath
                  ? '✓ Voice Added'
                  : t('addVoice')}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
        
        {/* Submit Button */}
        <Button
          title={t('submit')}
          icon="✓"
          onPress={handleSubmit}
          disabled={isSaving || selectedSymptoms.length === 0}
          style={styles.submitButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: SIZES.paddingMedium,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  attachments: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attachButton: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.paddingMedium,
    marginHorizontal: SIZES.paddingSmall,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    borderStyle: 'dashed',
  },
  attachButtonActive: {
    borderColor: COLORS.success,
    backgroundColor: '#E8F5E9',
  },
  attachButtonRecording: {
    borderColor: COLORS.error,
    backgroundColor: '#FFEBEE',
  },
  attachIcon: {
    fontSize: 32,
    marginBottom: SIZES.paddingSmall,
  },
  attachText: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: SIZES.paddingLarge,
    marginBottom: SIZES.paddingLarge * 2,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.paddingLarge,
  },
  successIcon: {
    fontSize: 80,
    marginBottom: SIZES.paddingLarge,
  },
  successTitle: {
    fontSize: SIZES.fontXLarge,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: SIZES.paddingMedium,
  },
  successMessage: {
    fontSize: SIZES.fontMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
