/**
 * Screen 5: Consultation
 * Shows upcoming call details
 * Join button only when online
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { NetworkStatusBar } from '../components/StatusBar';
import { useAppStore } from '../store/appStore';
import { useTranslation } from '../hooks/useTranslation';
import { COLORS, SIZES } from '../constants/theme';

export default function ConsultationScreen() {
  const { t } = useTranslation();
  const consultation = useAppStore((state) => state.consultation);
  const isOnline = useAppStore((state) => state.isOnline);
  
  // Demo data
  const displayConsultation = consultation || {
    id: 'demo',
    scheduledTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    callType: 'video' as const,
    doctorName: 'Dr. Sharma',
    meetingUrl: 'https://meet.telemedicine.in/room123',
  };
  
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
      time: date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };
  
  const handleJoinCall = () => {
    if (!isOnline) {
      Alert.alert('', t('onlineRequired'));
      return;
    }
    
    if (displayConsultation.meetingUrl) {
      Linking.openURL(displayConsultation.meetingUrl);
    }
  };
  
  const { date, time } = formatDateTime(displayConsultation.scheduledTime);
  const isVideoCall = displayConsultation.callType === 'video';
  
  return (
    <SafeAreaView style={styles.container}>
      <NetworkStatusBar />
      
      <View style={styles.content}>
        {!consultation && !displayConsultation ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyText}>{t('noUpcoming')}</Text>
          </View>
        ) : (
          <>
            <Card icon="📞" title={t('scheduledCall')}>
              {/* Doctor Info */}
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorIcon}>👨‍⚕️</Text>
                <Text style={styles.doctorName}>
                  {displayConsultation.doctorName}
                </Text>
              </View>
              
              {/* Call Details */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📅 {t('callTime')}</Text>
                  <Text style={styles.detailValue}>{date}</Text>
                  <Text style={styles.timeValue}>{time}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📱 {t('callType')}</Text>
                  <View style={styles.callTypeBadge}>
                    <Text style={styles.callTypeIcon}>
                      {isVideoCall ? '📹' : '📞'}
                    </Text>
                    <Text style={styles.callTypeText}>
                      {isVideoCall ? t('videoCall') : t('audioCall')}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
            
            {/* Join Button */}
            <View style={styles.buttonContainer}>
              {isOnline ? (
                <Button
                  title={t('joinCall')}
                  icon="📞"
                  onPress={handleJoinCall}
                  style={styles.joinButton}
                />
              ) : (
                <View style={styles.offlineNotice}>
                  <Text style={styles.offlineIcon}>📴</Text>
                  <Text style={styles.offlineText}>{t('onlineRequired')}</Text>
                </View>
              )}
            </View>
            
            {/* Instructions */}
            <Card icon="ℹ️" title="Instructions">
              <View style={styles.instructions}>
                <Text style={styles.instructionItem}>
                  ✓ Find a quiet place with good lighting
                </Text>
                <Text style={styles.instructionItem}>
                  ✓ Keep your reports ready
                </Text>
                <Text style={styles.instructionItem}>
                  ✓ Ensure stable internet connection
                </Text>
                <Text style={styles.instructionItem}>
                  ✓ Join 5 minutes before scheduled time
                </Text>
              </View>
            </Card>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    flex: 1,
    padding: SIZES.paddingMedium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SIZES.paddingMedium,
  },
  emptyText: {
    fontSize: SIZES.fontLarge,
    color: COLORS.textSecondary,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.paddingMedium,
    paddingBottom: SIZES.paddingMedium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  doctorIcon: {
    fontSize: 48,
    marginRight: SIZES.paddingMedium,
  },
  doctorName: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  detailsContainer: {
    marginTop: SIZES.paddingSmall,
  },
  detailRow: {
    marginBottom: SIZES.paddingMedium,
  },
  detailLabel: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.paddingSmall,
  },
  detailValue: {
    fontSize: SIZES.fontMedium,
    color: COLORS.textSecondary,
  },
  timeValue: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  callTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: SIZES.paddingSmall,
    paddingHorizontal: SIZES.paddingMedium,
    borderRadius: SIZES.borderRadius,
    alignSelf: 'flex-start',
  },
  callTypeIcon: {
    fontSize: 24,
    marginRight: SIZES.paddingSmall,
  },
  callTypeText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.textPrimary,
  },
  buttonContainer: {
    marginVertical: SIZES.paddingLarge,
  },
  joinButton: {
    width: '100%',
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.offline,
    padding: SIZES.paddingMedium,
    borderRadius: SIZES.borderRadius,
  },
  offlineIcon: {
    fontSize: 24,
    marginRight: SIZES.paddingSmall,
  },
  offlineText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  instructions: {
    marginTop: SIZES.paddingSmall,
  },
  instructionItem: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    lineHeight: 28,
  },
});
