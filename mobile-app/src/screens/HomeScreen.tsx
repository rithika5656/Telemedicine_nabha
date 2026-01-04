/**
 * Screen 2: Home Dashboard
 * Main screen with 4 action buttons
 * Shows patient name and last consultation
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { NetworkStatusBar } from '../components/StatusBar';
import { Card } from '../components/Card';
import { useAppStore } from '../store/appStore';
import { useTranslation } from '../hooks/useTranslation';
import { COLORS, SIZES } from '../constants/theme';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  
  const patient = useAppStore((state) => state.patient);
  const consultation = useAppStore((state) => state.consultation);
  const pendingSyncCount = useAppStore((state) => state.pendingSyncCount);
  
  // Demo patient for display
  const displayName = patient?.name || 'Patient';
  
  return (
    <SafeAreaView style={styles.container}>
      <NetworkStatusBar />
      
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Welcome Card */}
        <Card icon="👋" title={t('welcome')}>
          <Text style={styles.patientName}>{displayName}</Text>
          {consultation && (
            <Text style={styles.lastConsultation}>
              {t('lastConsultation')}: {new Date(consultation.scheduledTime).toLocaleDateString()}
            </Text>
          )}
        </Card>
        
        {/* Pending Sync Indicator */}
        {pendingSyncCount > 0 && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>
              📤 {pendingSyncCount} {t('willSync')}
            </Text>
          </View>
        )}
        
        {/* Main Action Buttons */}
        <View style={styles.buttons}>
          <Button
            title={t('addSymptoms')}
            icon="🩺"
            onPress={() => navigation.navigate('AddSymptoms')}
            style={styles.button}
          />
          
          <Button
            title={t('viewRecords')}
            icon="📄"
            onPress={() => navigation.navigate('Records')}
            variant="secondary"
            style={styles.button}
          />
          
          <Button
            title={t('upcomingCall')}
            icon="📞"
            onPress={() => navigation.navigate('Consultation')}
            style={styles.button}
          />
          
          <Button
            title={t('medicineInfo')}
            icon="💊"
            onPress={() => navigation.navigate('Medicine')}
            variant="secondary"
            style={styles.button}
          />
        </View>
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
  patientName: {
    fontSize: SIZES.fontXLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  lastConsultation: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    marginTop: SIZES.paddingSmall,
  },
  pendingBadge: {
    backgroundColor: COLORS.warning,
    padding: SIZES.paddingMedium,
    borderRadius: SIZES.borderRadius,
    marginVertical: SIZES.paddingSmall,
  },
  pendingText: {
    color: COLORS.textLight,
    fontSize: SIZES.fontSmall,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    marginTop: SIZES.paddingMedium,
  },
  button: {
    width: '100%',
  },
});
