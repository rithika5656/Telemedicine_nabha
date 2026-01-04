/**
 * SQLite Database Service
 * Local storage for offline-first functionality
 */

import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase;

export const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabase({
      name: 'telemedicine.db',
      location: 'default',
    });
    
    await createTables();
    console.log('Database initialized');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

const createTables = async (): Promise<void> => {
  // Symptoms table - stores offline symptom submissions
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS symptoms (
      id TEXT PRIMARY KEY,
      patient_id TEXT NOT NULL,
      symptoms TEXT NOT NULL,
      notes TEXT,
      photo_path TEXT,
      voice_path TEXT,
      created_at TEXT NOT NULL,
      synced INTEGER DEFAULT 0
    )
  `);
  
  // Records table - cached consultation records
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS records (
      id TEXT PRIMARY KEY,
      patient_id TEXT NOT NULL,
      date TEXT NOT NULL,
      doctor_name TEXT,
      notes TEXT,
      prescription TEXT,
      type TEXT NOT NULL,
      cached_at TEXT NOT NULL
    )
  `);
  
  // Medicines table - cached medicine availability
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS medicines (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      dosage TEXT,
      pharmacy TEXT,
      available INTEGER DEFAULT 1,
      last_updated TEXT NOT NULL
    )
  `);
  
  // Sync queue - tracks pending sync items
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS sync_queue (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL,
      attempts INTEGER DEFAULT 0
    )
  `);
};

// Symptoms CRUD
export const saveSymptomLocal = async (symptom: {
  id: string;
  patientId: string;
  symptoms: string[];
  notes: string;
  photoPath?: string;
  voicePath?: string;
}): Promise<void> => {
  await db.executeSql(
    `INSERT OR REPLACE INTO symptoms 
     (id, patient_id, symptoms, notes, photo_path, voice_path, created_at, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
    [
      symptom.id,
      symptom.patientId,
      JSON.stringify(symptom.symptoms),
      symptom.notes,
      symptom.photoPath || null,
      symptom.voicePath || null,
      new Date().toISOString(),
    ]
  );
};

export const getUnsyncedSymptoms = async (): Promise<any[]> => {
  const [results] = await db.executeSql(
    'SELECT * FROM symptoms WHERE synced = 0'
  );
  
  const symptoms = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    symptoms.push({
      ...row,
      symptoms: JSON.parse(row.symptoms),
    });
  }
  return symptoms;
};

export const markSymptomSynced = async (id: string): Promise<void> => {
  await db.executeSql('UPDATE symptoms SET synced = 1 WHERE id = ?', [id]);
};

// Records CRUD
export const cacheRecords = async (
  patientId: string,
  records: any[]
): Promise<void> => {
  const cachedAt = new Date().toISOString();
  
  for (const record of records) {
    await db.executeSql(
      `INSERT OR REPLACE INTO records 
       (id, patient_id, date, doctor_name, notes, prescription, type, cached_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        patientId,
        record.date,
        record.doctorName,
        record.notes,
        record.prescription,
        record.type,
        cachedAt,
      ]
    );
  }
};

export const getCachedRecords = async (patientId: string): Promise<any[]> => {
  const [results] = await db.executeSql(
    'SELECT * FROM records WHERE patient_id = ? ORDER BY date DESC',
    [patientId]
  );
  
  const records = [];
  for (let i = 0; i < results.rows.length; i++) {
    records.push(results.rows.item(i));
  }
  return records;
};

// Medicines CRUD
export const cacheMedicines = async (medicines: any[]): Promise<void> => {
  const lastUpdated = new Date().toISOString();
  
  for (const med of medicines) {
    await db.executeSql(
      `INSERT OR REPLACE INTO medicines 
       (id, name, dosage, pharmacy, available, last_updated)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [med.id, med.name, med.dosage, med.pharmacy, med.available ? 1 : 0, lastUpdated]
    );
  }
};

export const getCachedMedicines = async (): Promise<any[]> => {
  const [results] = await db.executeSql('SELECT * FROM medicines');
  
  const medicines = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    medicines.push({
      ...row,
      available: row.available === 1,
    });
  }
  return medicines;
};

// Sync queue
export const addToSyncQueue = async (
  type: string,
  data: any
): Promise<void> => {
  const id = Date.now().toString();
  await db.executeSql(
    `INSERT INTO sync_queue (id, type, data, created_at) VALUES (?, ?, ?, ?)`,
    [id, type, JSON.stringify(data), new Date().toISOString()]
  );
};

export const getSyncQueue = async (): Promise<any[]> => {
  const [results] = await db.executeSql(
    'SELECT * FROM sync_queue ORDER BY created_at ASC'
  );
  
  const items = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    items.push({
      ...row,
      data: JSON.parse(row.data),
    });
  }
  return items;
};

export const removeFromSyncQueue = async (id: string): Promise<void> => {
  await db.executeSql('DELETE FROM sync_queue WHERE id = ?', [id]);
};
