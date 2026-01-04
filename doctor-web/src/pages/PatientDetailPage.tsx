/**
 * Patient Detail Page - Full patient info with call button
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatientStore } from '../store/patientStore';

export default function PatientDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const patients = usePatientStore((state) => state.patients);
  const updatePatientStatus = usePatientStore((state) => state.updatePatientStatus);
  
  const patient = patients.find((p) => p.id === id);
  const [callStarted, setCallStarted] = useState(false);

  if (!patient) {
    return (
      <div style={styles.page}>
        <p>Patient not found</p>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const handleStartCall = () => {
    updatePatientStatus(patient.id, 'in-consultation');
    setCallStarted(true);
    // In real app, would open video call
    window.open(`https://meet.telemedicine.in/room-${patient.id}`, '_blank');
  };

  const handleEndCall = () => {
    updatePatientStatus(patient.id, 'completed');
    setCallStarted(false);
  };

  const handleWritePrescription = () => {
    navigate(`/prescription/${patient.id}`);
  };

  // Demo past records
  const pastRecords = [
    { date: '2025-12-20', notes: 'Regular checkup, BP normal', prescription: 'Continue current medication' },
    { date: '2025-11-15', notes: 'Cold and cough', prescription: 'Paracetamol, Cough syrup' },
  ];

  return (
    <div style={styles.page}>
      {/* Back button */}
      <button onClick={() => navigate('/')} style={styles.backBtn}>
        ← Back to Queue
      </button>

      {/* Patient Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>👤 {patient.name}</h1>
          <p style={styles.meta}>
            {patient.age} years • {patient.gender} • 📍 {patient.village}
          </p>
          <p style={styles.phone}>📞 {patient.phone}</p>
        </div>
        <span
          style={{
            ...styles.priorityBadge,
            backgroundColor: patient.priority === 'urgent' ? '#FFEBEE' : '#E8F5E9',
            color: patient.priority === 'urgent' ? '#C62828' : '#2E7D32',
          }}
        >
          {patient.priority === 'urgent' ? '🚨 URGENT' : '✓ Normal'}
        </span>
      </div>

      <div style={styles.grid}>
        {/* Left Column - Current Visit */}
        <div>
          {/* Symptoms Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🩺 Current Symptoms</h2>
            <div style={styles.symptoms}>
              {patient.symptoms.map((symptom) => (
                <span key={symptom} style={styles.symptomChip}>
                  {symptom}
                </span>
              ))}
            </div>
            <div style={styles.notes}>
              <strong>📝 Patient Notes:</strong>
              <p>{patient.notes}</p>
            </div>
          </div>

          {/* Call Actions */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📞 Consultation</h2>
            {!callStarted ? (
              <div style={styles.callActions}>
                <button onClick={handleStartCall} style={styles.callBtn}>
                  📹 Start Video Call
                </button>
                <button onClick={handleStartCall} style={styles.audioBtn}>
                  📞 Audio Call Only
                </button>
              </div>
            ) : (
              <div style={styles.callActive}>
                <p style={styles.callStatus}>🔴 Call in Progress</p>
                <button onClick={handleEndCall} style={styles.endCallBtn}>
                  ⏹️ End Call
                </button>
              </div>
            )}
          </div>

          {/* Prescription Button */}
          <button onClick={handleWritePrescription} style={styles.prescriptionBtn}>
            📝 Write Prescription
          </button>
        </div>

        {/* Right Column - History */}
        <div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📋 Past Records</h2>
            {pastRecords.map((record, idx) => (
              <div key={idx} style={styles.record}>
                <p style={styles.recordDate}>📅 {record.date}</p>
                <p style={styles.recordNotes}>{record.notes}</p>
                <p style={styles.recordRx}>💊 {record.prescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 24,
    maxWidth: 1200,
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    marginBottom: 24,
    border: '1px solid #BDBDBD',
  },
  name: {
    fontSize: 28,
    marginBottom: 8,
  },
  meta: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#1565C0',
  },
  priorityBadge: {
    padding: '8px 16px',
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
  },
  card: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    marginBottom: 16,
    border: '1px solid #BDBDBD',
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid #BDBDBD',
  },
  symptoms: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  symptomChip: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
    padding: '8px 16px',
    borderRadius: 20,
    fontWeight: 'bold',
  },
  notes: {
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 8,
    borderLeft: '4px solid #F57C00',
  },
  callActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  callBtn: {
    padding: 20,
    fontSize: 18,
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  audioBtn: {
    padding: 20,
    fontSize: 18,
    backgroundColor: '#1565C0',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  callActive: {
    textAlign: 'center',
  },
  callStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 16,
  },
  endCallBtn: {
    padding: 20,
    fontSize: 18,
    backgroundColor: '#C62828',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
  prescriptionBtn: {
    width: '100%',
    padding: 20,
    fontSize: 18,
    backgroundColor: '#F57C00',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  record: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
  },
  recordDate: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recordNotes: {
    marginBottom: 8,
  },
  recordRx: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
};
