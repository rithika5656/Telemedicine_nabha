/**
 * Patient Store - Patient queue and data management
 */

import { create } from 'zustand';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  village: string;
  priority: 'urgent' | 'normal';
  symptoms: string[];
  notes: string;
  lastVisit: string;
  status: 'waiting' | 'in-consultation' | 'completed';
}

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  updatePatientStatus: (id: string, status: Patient['status']) => void;
  fetchPatients: () => Promise<void>;
}

// Demo data
const DEMO_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    phone: '9876543210',
    village: 'Nabha',
    priority: 'urgent',
    symptoms: ['fever', 'cough', 'breathing'],
    notes: 'High fever for 3 days, difficulty breathing',
    lastVisit: '2025-12-20',
    status: 'waiting',
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    age: 62,
    gender: 'Female',
    phone: '9876543211',
    village: 'Kharkhoda',
    priority: 'normal',
    symptoms: ['bodyPain', 'headache'],
    notes: 'Joint pain, regular checkup',
    lastVisit: '2025-12-18',
    status: 'waiting',
  },
  {
    id: '3',
    name: 'Suresh Singh',
    age: 35,
    gender: 'Male',
    phone: '9876543212',
    village: 'Nabha',
    priority: 'normal',
    symptoms: ['stomach', 'vomiting'],
    notes: 'Stomach pain since morning',
    lastVisit: '2025-12-28',
    status: 'waiting',
  },
  {
    id: '4',
    name: 'Kamla Bai',
    age: 55,
    gender: 'Female',
    phone: '9876543213',
    village: 'Patiala',
    priority: 'urgent',
    symptoms: ['fever', 'diarrhea'],
    notes: 'Severe diarrhea, dehydration symptoms',
    lastVisit: '2025-12-29',
    status: 'waiting',
  },
];

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: DEMO_PATIENTS,
  selectedPatient: null,

  setSelectedPatient: (patient) => {
    set({ selectedPatient: patient });
  },

  updatePatientStatus: (id, status) => {
    set({
      patients: get().patients.map((p) =>
        p.id === id ? { ...p, status } : p
      ),
    });
  },

  fetchPatients: async () => {
    // Replace with actual API call
    set({ patients: DEMO_PATIENTS });
  },
}));
