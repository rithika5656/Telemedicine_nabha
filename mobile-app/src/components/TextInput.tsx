/**
 * Large Text Input Component
 * Accessible for rural users
 */

import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  icon?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  icon,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <RNTextInput
        style={styles.input}
        placeholderTextColor={COLORS.border}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.paddingSmall,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.paddingSmall,
  },
  icon: {
    fontSize: SIZES.fontMedium,
    marginRight: SIZES.paddingSmall,
  },
  label: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.paddingMedium,
    fontSize: SIZES.fontMedium,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
});
