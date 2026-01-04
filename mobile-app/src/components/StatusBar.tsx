/**
 * Network Status Bar Component
 * Shows online/offline status
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../store/appStore';
import { useTranslation } from '../hooks/useTranslation';
import { COLORS, SIZES } from '../constants/theme';

export const NetworkStatusBar: React.FC = () => {
  const isOnline = useAppStore((state) => state.isOnline);
  const pendingSyncCount = useAppStore((state) => state.pendingSyncCount);
  const { t } = useTranslation();
  
  if (isOnline && pendingSyncCount === 0) {
    return null; // Don't show when everything is fine
  }
  
  return (
    <View style={[styles.container, isOnline ? styles.online : styles.offline]}>
      <Text style={styles.icon}>{isOnline ? '🔄' : '📴'}</Text>
      <Text style={styles.text}>
        {isOnline
          ? `${t('syncing')} (${pendingSyncCount})`
          : t('offline')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.paddingSmall,
    paddingHorizontal: SIZES.paddingMedium,
  },
  online: {
    backgroundColor: COLORS.warning,
  },
  offline: {
    backgroundColor: COLORS.offline,
  },
  icon: {
    fontSize: SIZES.fontMedium,
    marginRight: SIZES.paddingSmall,
  },
  text: {
    color: COLORS.textLight,
    fontSize: SIZES.fontSmall,
    fontWeight: 'bold',
  },
});
