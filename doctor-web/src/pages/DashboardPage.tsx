/**
 * Dashboard Page - Patient queue sorted by priority
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePatientStore, Patient } from '../store/patientStore';

export default function DashboardPage() {
  const navigate = useNavigate();
  const doctor = useAuthStore((state) => state.doctor);
  const logout = useAuthStore((state) => state.logout);
  const patients = usePatientStore((state) => state.patients);
  const setSelectedPatient = usePatientStore((state) => state.setSelectedPatient);

  // Sort by priority (urgent first) and status
  const sortedPatients = [...patients].sort((a, b) => {
    if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
    if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
    if (a.status === 'waiting' && b.status !== 'waiting') return -1;
    return 0;
  });

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    navigate(`/patient/${patient.id}`);
  };

  const getStatusBadge = (status: Patient['status']) => {
    const styles: Record<string, React.CSSProperties> = {
      waiting: { backgroundColor: '#FFF3E0', color: '#F57C00' },
      'in-consultation': { backgroundColor: '#E3F2FD', color: '#1565C0' },
      completed: { backgroundColor: '#E8F5E9', color: '#2E7D32' },
    };
    const labels = {
      waiting: '⏳ Waiting',
      'in-consultation': '📞 In Call',
      completed: '✅ Done',
    };
    return (
      <span style={{ ...badgeStyle, ...styles[status] }}>
        {labels[status]}
      </span>
    );
  };

  const urgentCount = patients.filter((p) => p.priority === 'urgent').length;
  const waitingCount = patients.filter((p) => p.status === 'waiting').length;

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>🏥 Telemedicine Nabha</h1>
          <p style={styles.doctorName}>👨‍⚕️ {doctor?.name}</p>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </header>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={{ ...styles.statCard, borderLeftColor: '#F57C00' }}>
          <span style={styles.statNumber}>{waitingCount}</span>
          <span style={styles.statLabel}>⏳ Waiting</span>
        </div>
        <div style={{ ...styles.statCard, borderLeftColor: '#C62828' }}>
          <span style={styles.statNumber}>{urgentCount}</span>
          <span style={styles.statLabel}>🚨 Urgent</span>
        </div>
        <div style={{ ...styles.statCard, borderLeftColor: '#2E7D32' }}>
          <span style={styles.statNumber}>{patients.length}</span>
          <span style={styles.statLabel}>📋 Total Today</span>
        </div>
      </div>

      {/* Patient Queue */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📋 Patient Queue</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Village</th>
              <th>Symptoms</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <strong>{patient.name}</strong>
                  <br />
                  <small>{patient.age}y, {patient.gender}</small>
                </td>
                <td>{patient.village}</td>
                <td>
                  {patient.symptoms.slice(0, 3).map((s) => (
                    <span key={s} style={styles.symptomTag}>
                      {s}
                    </span>
                  ))}
                </td>
                <td>
                  <span
                    style={{
                      ...badgeStyle,
                      backgroundColor: patient.priority === 'urgent' ? '#FFEBEE' : '#E8F5E9',
                      color: patient.priority === 'urgent' ? '#C62828' : '#2E7D32',
                    }}
                  >
                    {patient.priority === 'urgent' ? '🚨 Urgent' : '✓ Normal'}
                  </span>
                </td>
                <td>{getStatusBadge(patient.status)}</td>
                <td>
                  <button
                    onClick={() => handleViewPatient(patient)}
                    style={styles.viewBtn}
                  >
                    👁️ View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 'bold',
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 24,
    maxWidth: 1400,
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    color: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    opacity: 0.9,
  },
  logoutBtn: {
    padding: '12px 24px',
    fontSize: 16,
    backgroundColor: 'white',
    color: '#2E7D32',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    borderLeft: '4px solid',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    display: 'block',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    border: '1px solid #BDBDBD',
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: '1px solid #BDBDBD',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  symptomTag: {
    display: 'inline-block',
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  viewBtn: {
    padding: '8px 16px',
    backgroundColor: '#1565C0',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
