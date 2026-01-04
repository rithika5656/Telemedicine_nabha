/**
 * Global App Store using Zustand
 * Simple state management for offline-first app
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../constants/translations';

interface Patient {
  id: string;
  name: string;
  phone: string;
  village: string;
}

interface Symptom {
  id: string;
  symptoms: string[];
  notes: string;
  photoPath?: string;
  voicePath?: string;
  createdAt: string;
  synced: boolean;
}

interface Record {
  id: string;
  date: string;
  doctorName: string;
  notes: string;
  prescription: string;
  type: 'consultation' | 'prescription';
}

interface Consultation {
  id: string;
  scheduledTime: string;
  callType: 'video' | 'audio';
  doctorName: string;
  meetingUrl?: string;
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  pharmacy: string;
  available: boolean;
  lastUpdated: string;
}

interface AppState {
  // User preferences
  language: Language | null;
  setLanguage: (lang: Language) => void;
  
  // Network status
  isOnline: boolean;
  setOnline: (status: boolean) => void;
  
  // Patient data
  patient: Patient | null;
  setPatient: (patient: Patient) => void;
  
  // Symptoms (offline-first)
  symptoms: Symptom[];
  addSymptom: (symptom: Omit<Symptom, 'id' | 'createdAt' | 'synced'>) => void;
  markSymptomSynced: (id: string) => void;
  
  // Records (cached)
  records: Record[];
  setRecords: (records: Record[]) => void;
  
  // Upcoming consultation
  consultation: Consultation | null;
  setConsultation: (consultation: Consultation | null) => void;
  
  // Medicines (cached)
  medicines: Medicine[];
  setMedicines: (medicines: Medicine[]) => void;
  
  // Pending sync count
  pendingSyncCount: number;
  
  // Initialize from local storage
  hydrate: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  language: null,
  isOnline: false,
  patient: null,
  symptoms: [],
  records: [],
  consultation: null,
  medicines: [],
  pendingSyncCount: 0,
  
  setLanguage: async (lang) => {
    set({ language: lang });
    await AsyncStorage.setItem('language', lang);
  },
  
  setOnline: (status) => {
    set({ isOnline: status });
  },
  
  setPatient: async (patient) => {
    set({ patient });
    await AsyncStorage.setItem('patient', JSON.stringify(patient));
  },
  
  addSymptom: async (symptomData) => {
    const newSymptom: Symptom = {
      ...symptomData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      synced: false,
    };
    
    const symptoms = [...get().symptoms, newSymptom];
    const pendingSyncCount = symptoms.filter(s => !s.synced).length;
    
    set({ symptoms, pendingSyncCount });
    await AsyncStorage.setItem('symptoms', JSON.stringify(symptoms));
  },
  
  markSymptomSynced: async (id) => {
    const symptoms = get().symptoms.map(s =>
      s.id === id ? { ...s, synced: true } : s
    );
    const pendingSyncCount = symptoms.filter(s => !s.synced).length;
    
    set({ symptoms, pendingSyncCount });
    await AsyncStorage.setItem('symptoms', JSON.stringify(symptoms));
  },
  
  setRecords: async (records) => {
    set({ records });
    await AsyncStorage.setItem('records', JSON.stringify(records));
  },
  
  setConsultation: async (consultation) => {
    set({ consultation });
    await AsyncStorage.setItem('consultation', JSON.stringify(consultation));
  },
  
  setMedicines: async (medicines) => {
    set({ medicines });
    await AsyncStorage.setItem('medicines', JSON.stringify(medicines));
  },
  
  hydrate: async () => {
    try {
      const [language, patient, symptoms, records, consultation, medicines] =
        await Promise.all([
          AsyncStorage.getItem('language'),
          AsyncStorage.getItem('patient'),
          AsyncStorage.getItem('symptoms'),
          AsyncStorage.getItem('records'),
          AsyncStorage.getItem('consultation'),
          AsyncStorage.getItem('medicines'),
        ]);
      
      const parsedSymptoms = symptoms ? JSON.parse(symptoms) : [];
      
      set({
        language: language as Language | null,
        patient: patient ? JSON.parse(patient) : null,
        symptoms: parsedSymptoms,
        records: records ? JSON.parse(records) : [],
        consultation: consultation ? JSON.parse(consultation) : null,
        medicines: medicines ? JSON.parse(medicines) : [],
        pendingSyncCount: parsedSymptoms.filter((s: Symptom) => !s.synced).length,
      });
    } catch (error) {
      console.error('Failed to hydrate store:', error);
    }
  },
}));
