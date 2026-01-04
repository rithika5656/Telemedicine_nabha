/**
 * Background Sync Service
 * Handles offline-first data synchronization
 */

import NetInfo from '@react-native-community/netinfo';
import { useAppStore } from '../store/appStore';
import {
  getUnsyncedSymptoms,
  markSymptomSynced,
  getSyncQueue,
  removeFromSyncQueue,
  cacheRecords,
  cacheMedicines,
} from './database';
import { api } from './api';

let syncInProgress = false;

/**
 * Start background sync listener
 * Monitors network changes and syncs when online
 */
export const startBackgroundSync = (): void => {
  // Listen for network state changes
  NetInfo.addEventListener((state) => {
    const isOnline = state.isConnected && state.isInternetReachable;
    useAppStore.getState().setOnline(!!isOnline);
    
    if (isOnline) {
      performSync();
    }
  });
  
  // Check initial state
  NetInfo.fetch().then((state) => {
    const isOnline = state.isConnected && state.isInternetReachable;
    useAppStore.getState().setOnline(!!isOnline);
    
    if (isOnline) {
      performSync();
    }
  });
};

/**
 * Perform sync operation
 * Uploads pending data and downloads fresh cache
 */
export const performSync = async (): Promise<void> => {
  if (syncInProgress) return;
  
  syncInProgress = true;
  
  try {
    // 1. Upload pending symptoms
    await syncSymptoms();
    
    // 2. Process sync queue
    await processSyncQueue();
    
    // 3. Download fresh data
    await downloadFreshData();
    
    console.log('Sync completed successfully');
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    syncInProgress = false;
  }
};

/**
 * Sync pending symptoms to server
 */
const syncSymptoms = async (): Promise<void> => {
  const unsyncedSymptoms = await getUnsyncedSymptoms();
  
  for (const symptom of unsyncedSymptoms) {
    try {
      await api.submitSymptoms({
        patientId: symptom.patient_id,
        symptoms: symptom.symptoms,
        notes: symptom.notes,
        photoPath: symptom.photo_path,
        voicePath: symptom.voice_path,
        createdAt: symptom.created_at,
      });
      
      await markSymptomSynced(symptom.id);
      useAppStore.getState().markSymptomSynced(symptom.id);
    } catch (error) {
      console.error('Failed to sync symptom:', symptom.id);
    }
  }
};

/**
 * Process items in sync queue
 */
const processSyncQueue = async (): Promise<void> => {
  const queue = await getSyncQueue();
  
  for (const item of queue) {
    try {
      switch (item.type) {
        case 'symptom':
          await api.submitSymptoms(item.data);
          break;
        case 'feedback':
          await api.submitFeedback(item.data);
          break;
        default:
          console.warn('Unknown sync type:', item.type);
      }
      
      await removeFromSyncQueue(item.id);
    } catch (error) {
      console.error('Failed to process sync item:', item.id);
    }
  }
};

/**
 * Download and cache fresh data from server
 */
const downloadFreshData = async (): Promise<void> => {
  const patient = useAppStore.getState().patient;
  if (!patient) return;
  
  try {
    // Fetch records
    const records = await api.getRecords(patient.id);
    await cacheRecords(patient.id, records);
    useAppStore.getState().setRecords(records);
    
    // Fetch consultation
    const consultation = await api.getUpcomingConsultation(patient.id);
    useAppStore.getState().setConsultation(consultation);
    
    // Fetch medicines
    const medicines = await api.getMedicines(patient.id);
    await cacheMedicines(medicines);
    useAppStore.getState().setMedicines(medicines);
  } catch (error) {
    console.error('Failed to download fresh data:', error);
  }
};

/**
 * Manual sync trigger
 * Can be called from UI
 */
export const triggerManualSync = async (): Promise<boolean> => {
  const isOnline = useAppStore.getState().isOnline;
  
  if (!isOnline) {
    return false;
  }
  
  await performSync();
  return true;
};
