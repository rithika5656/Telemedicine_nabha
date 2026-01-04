/**
 * Screen 4: Records View
 * Timeline view of past consultations
 * Doctor notes and prescriptions
 * All data cached locally
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Card } from '../components/Card';
import { NetworkStatusBar } from '../components/StatusBar';
import { useAppStore } from '../store/appStore';
import { useTranslation } from '../hooks/useTranslation';
import { COLORS, SIZES } from '../constants/theme';

export default function RecordsScreen() {
  const { t } = useTranslation();
  const records = useAppStore((state) => state.records);
  
  // Demo data for display
  const displayRecords = records.length > 0 ? records : [
    {
      id: '1',
      date: '2025-12-28',
      doctorName: 'Dr. Sharma',
      notes: 'Patient shows symptoms of common cold. Rest advised.',
      prescription: 'Paracetamol 500mg - 1 tablet twice daily\nCough syrup - 5ml thrice daily',
      type: 'consultation',
    },
    {
      id: '2',
      date: '2025-12-15',
      doctorName: 'Dr. Patel',
      notes: 'Follow-up visit. Patient recovering well.',
      prescription: 'Continue previous medication for 3 more days.',
      type: 'consultation',
    },
  ];
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <NetworkStatusBar />
      
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {displayRecords.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>{t('noRecords')}</Text>
          </View>
        ) : (
          displayRecords.map((record, index) => (
            <View key={record.id} style={styles.timelineItem}>
              {/* Timeline connector */}
              <View style={styles.timeline}>
                <View style={styles.dot} />
                {index < displayRecords.length - 1 && (
                  <View style={styles.line} />
                )}
              </View>
              
              {/* Record card */}
              <View style={styles.cardContainer}>
                <Card>
                  {/* Date & Doctor */}
                  <View style={styles.header}>
                    <Text style={styles.date}>📅 {formatDate(record.date)}</Text>
                    <Text style={styles.doctor}>👨‍⚕️ {record.doctorName}</Text>
                  </View>
                  
                  {/* Notes */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📝 {t('doctorNotes')}</Text>
                    <Text style={styles.sectionContent}>{record.notes}</Text>
                  </View>
                  
                  {/* Prescription */}
                  {record.prescription && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>💊 {t('prescription')}</Text>
                      <View style={styles.prescriptionBox}>
                        <Text style={styles.prescriptionText}>
                          {record.prescription}
                        </Text>
                      </View>
                    </View>
                  )}
                </Card>
              </View>
            </View>
          ))
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge * 4,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SIZES.paddingMedium,
  },
  emptyText: {
    fontSize: SIZES.fontLarge,
    color: COLORS.textSecondary,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timeline: {
    width: 30,
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    marginTop: 20,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.primary,
    opacity: 0.3,
  },
  cardContainer: {
    flex: 1,
    marginLeft: SIZES.paddingSmall,
  },
  header: {
    marginBottom: SIZES.paddingMedium,
  },
  date: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  doctor: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: SIZES.paddingMedium,
  },
  sectionTitle: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.paddingSmall,
  },
  sectionContent: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  prescriptionBox: {
    backgroundColor: '#FFF8E1',
    padding: SIZES.paddingMedium,
    borderRadius: SIZES.borderRadius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  prescriptionText: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
});
