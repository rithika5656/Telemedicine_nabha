/**
 * Large Checkbox Component
 * Easy to tap for rural users
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.paddingMedium,
    paddingHorizontal: SIZES.paddingSmall,
    marginVertical: 4,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.paddingMedium,
  },
  checked: {
    backgroundColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.textLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: SIZES.fontMedium,
    color: COLORS.textPrimary,
    flex: 1,
  },
});
