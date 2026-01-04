/**
 * Prescription Page - Write and submit prescription
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatientStore } from '../store/patientStore';

interface Medicine {
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export default function PrescriptionPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const patients = usePatientStore((state) => state.patients);
  
  const patient = patients.find((p) => p.id === patientId);
  
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: '', dosage: '', duration: '', instructions: '' },
  ]);
  const [followUp, setFollowUp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '', instructions: '' }]);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In real app, would send to API
    console.log({
      patientId,
      diagnosis,
      notes,
      medicines,
      followUp,
    });
    
    setSubmitted(true);
    
    // Go back after 2 seconds
    setTimeout(() => {
      navigate(`/patient/${patientId}`);
    }, 2000);
  };

  if (!patient) {
    return <p>Patient not found</p>;
  }

  if (submitted) {
    return (
      <div style={styles.successPage}>
        <span style={styles.successIcon}>✅</span>
        <h2 style={styles.successTitle}>Prescription Saved</h2>
        <p>Patient will receive the prescription</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <h1 style={styles.title}>📝 Write Prescription</h1>
      <p style={styles.patientInfo}>
        Patient: <strong>{patient.name}</strong> | {patient.age}y, {patient.gender}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Diagnosis */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🩺 Diagnosis</h2>
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis"
            required
            style={styles.input}
          />
        </div>

        {/* Medicines */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>💊 Medicines</h2>
          {medicines.map((med, index) => (
            <div key={index} style={styles.medicineRow}>
              <div style={styles.medicineGrid}>
                <input
                  type="text"
                  value={med.name}
                  onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                  placeholder="Medicine name"
                  required
                  style={styles.input}
                />
                <input
                  type="text"
                  value={med.dosage}
                  onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                  placeholder="Dosage (e.g., 500mg)"
                  style={styles.input}
                />
                <input
                  type="text"
                  value={med.duration}
                  onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                  placeholder="Duration (e.g., 5 days)"
                  style={styles.input}
                />
                <input
                  type="text"
                  value={med.instructions}
                  onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                  placeholder="Instructions (e.g., After food)"
                  style={styles.input}
                />
              </div>
              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMedicine(index)}
                  style={styles.removeBtn}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addMedicine} style={styles.addBtn}>
            ➕ Add Medicine
          </button>
        </div>

        {/* Notes */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📋 Additional Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional instructions for the patient"
            rows={4}
            style={{ ...styles.input, minHeight: 100 }}
          />
        </div>

        {/* Follow Up */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📅 Follow Up</h2>
          <select
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            style={styles.input}
          >
            <option value="">No follow up required</option>
            <option value="3">After 3 days</option>
            <option value="5">After 5 days</option>
            <option value="7">After 1 week</option>
            <option value="14">After 2 weeks</option>
            <option value="30">After 1 month</option>
          </select>
        </div>

        {/* Submit */}
        <button type="submit" style={styles.submitBtn}>
          ✓ Save Prescription
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 24,
    maxWidth: 800,
    margin: '0 auto',
  },
  backBtn: {
    padding: '12px 24px',
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#1565C0',
    border: '2px solid #1565C0',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  patientInfo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    marginBottom: 16,
    border: '1px solid #BDBDBD',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#2E7D32',
  },
  input: {
    width: '100%',
    padding: 16,
    fontSize: 16,
    border: '2px solid #BDBDBD',
    borderRadius: 8,
    marginBottom: 8,
  },
  medicineRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottom: '1px solid #BDBDBD',
  },
  medicineGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
  },
  removeBtn: {
    padding: 12,
    backgroundColor: '#FFEBEE',
    color: '#C62828',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  addBtn: {
    padding: '12px 24px',
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    padding: 20,
    fontSize: 20,
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  successPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    color: '#2E7D32',
    marginBottom: 8,
  },
};
