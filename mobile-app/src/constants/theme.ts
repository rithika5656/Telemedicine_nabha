/**
 * Theme Constants
 * High contrast, accessible colors
 * Large touch targets for rural users
 */

export const COLORS = {
  // Primary colors - High contrast
  primary: '#2E7D32',       // Green - main action
  primaryDark: '#1B5E20',
  secondary: '#1565C0',     // Blue - info
  
  // Status colors
  success: '#2E7D32',
  warning: '#F57C00',
  error: '#C62828',
  
  // Background
  background: '#FFFFFF',
  surface: '#F5F5F5',
  
  // Text - High contrast
  textPrimary: '#212121',
  textSecondary: '#424242',
  textLight: '#FFFFFF',
  
  // Border
  border: '#BDBDBD',
  
  // Offline indicator
  offline: '#FF5722',
  online: '#4CAF50',
};

export const SIZES = {
  // Font sizes - Larger for readability
  fontSmall: 16,
  fontMedium: 20,
  fontLarge: 24,
  fontXLarge: 28,
  
  // Button sizes - Large touch targets (min 48dp)
  buttonHeight: 60,
  buttonMinWidth: 200,
  
  // Spacing
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 24,
  
  // Border radius
  borderRadius: 8,
  
  // Icon sizes
  iconSmall: 24,
  iconMedium: 32,
  iconLarge: 48,
};

export const FONTS = {
  regular: {
    fontSize: SIZES.fontMedium,
    color: COLORS.textPrimary,
  },
  large: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold' as const,
    color: COLORS.textPrimary,
  },
  button: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold' as const,
    color: COLORS.textLight,
  },
};
