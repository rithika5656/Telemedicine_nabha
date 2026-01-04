/**
 * Screen 6: Medicine Availability
 * Shows prescribed medicines
 * Nearest pharmacy info
 * Cached data shown offline
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

export default function MedicineScreen() {
  const { t } = useTranslation();
  const medicines = useAppStore((state) => state.medicines);
  
  // Demo data
  const displayMedicines = medicines.length > 0 ? medicines : [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      dosage: '1 tablet twice daily',
      pharmacy: 'PHC Nabha',
      available: true,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Cough Syrup',
      dosage: '5ml thrice daily',
      pharmacy: 'PHC Nabha',
      available: true,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Vitamin C',
      dosage: '1 tablet daily',
      pharmacy: 'Jan Aushadhi Store',
      available: false,
      lastUpdated: new Date().toISOString(),
    },
  ];
  
  const formatLastUpdated = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <NetworkStatusBar />
      
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Card icon="💊" title={t('medicines')}>
          {displayMedicines.map((medicine) => (
            <View key={medicine.id} style={styles.medicineItem}>
              {/* Medicine Name & Dosage */}
              <View style={styles.medicineHeader}>
                <Text style={styles.medicineName}>{medicine.name}</Text>
                <View
                  style={[
                    styles.availabilityBadge,
                    medicine.available
                      ? styles.availableBadge
                      : styles.unavailableBadge,
                  ]}
                >
                  <Text style={styles.availabilityText}>
                    {medicine.available ? '✓ ' + t('available') : '✗ ' + t('notAvailable')}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.dosage}>📋 {medicine.dosage}</Text>
              
              {/* Pharmacy Info */}
              <View style={styles.pharmacyInfo}>
                <Text style={styles.pharmacyIcon}>🏪</Text>
                <View>
                  <Text style={styles.pharmacyLabel}>{t('nearestPharmacy')}</Text>
                  <Text style={styles.pharmacyName}>{medicine.pharmacy}</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
        
        {/* Last Updated Info */}
        {displayMedicines.length > 0 && (
          <View style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedText}>
              ⏰ {t('lastUpdated')}: {formatLastUpdated(displayMedicines[0].lastUpdated)}
            </Text>
          </View>
        )}
        
        {/* Pharmacy Locations */}
        <Card icon="📍" title={t('nearestPharmacy')}>
          <View style={styles.pharmacyCard}>
            <Text style={styles.pharmacyCardName}>PHC Nabha</Text>
            <Text style={styles.pharmacyCardAddress}>
              Primary Health Center, Main Road, Nabha
            </Text>
            <Text style={styles.pharmacyCardTiming}>
              ⏰ Open: 9:00 AM - 5:00 PM
            </Text>
          </View>
          
          <View style={styles.pharmacyCard}>
            <Text style={styles.pharmacyCardName}>Jan Aushadhi Store</Text>
            <Text style={styles.pharmacyCardAddress}>
              Near Bus Stand, Nabha
            </Text>
            <Text style={styles.pharmacyCardTiming}>
              ⏰ Open: 8:00 AM - 8:00 PM
            </Text>
          </View>
        </Card>
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
  medicineItem: {
    paddingVertical: SIZES.paddingMedium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.paddingSmall,
  },
  medicineName: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SIZES.paddingSmall,
  },
  availabilityBadge: {
    paddingHorizontal: SIZES.paddingSmall,
    paddingVertical: 4,
    borderRadius: 4,
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
  },
  unavailableBadge: {
    backgroundColor: '#FFEBEE',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dosage: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    marginBottom: SIZES.paddingSmall,
  },
  pharmacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.paddingSmall,
    borderRadius: SIZES.borderRadius,
    marginTop: SIZES.paddingSmall,
  },
  pharmacyIcon: {
    fontSize: 24,
    marginRight: SIZES.paddingSmall,
  },
  pharmacyLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  pharmacyName: {
    fontSize: SIZES.fontSmall,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  lastUpdated: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingMedium,
  },
  lastUpdatedText: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
  },
  pharmacyCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.paddingMedium,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.paddingSmall,
  },
  pharmacyCardName: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  pharmacyCardAddress: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  pharmacyCardTiming: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
  },
});
