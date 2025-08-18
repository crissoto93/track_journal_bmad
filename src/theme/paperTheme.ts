import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

// Enhanced React Native Paper themes with our design system
export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Primary colors
    primary: colors.primary[500],
    onPrimary: '#ffffff',
    primaryContainer: colors.primary[100],
    onPrimaryContainer: colors.primary[900],
    
    // Secondary colors
    secondary: colors.secondary[500],
    onSecondary: '#ffffff',
    secondaryContainer: colors.secondary[100],
    onSecondaryContainer: colors.secondary[900],
    
    // Tertiary colors (accent)
    tertiary: colors.accent[500],
    onTertiary: '#ffffff',
    tertiaryContainer: colors.accent[100],
    onTertiaryContainer: colors.accent[900],
    
    // Error colors
    error: colors.error[500],
    onError: '#ffffff',
    errorContainer: colors.error[100],
    onErrorContainer: colors.error[900],
    
    // Background colors
    background: colors.background.light,
    onBackground: colors.text.primary.light,
    surface: colors.background.surface.light,
    onSurface: colors.text.primary.light,
    surfaceVariant: colors.neutral[100],
    onSurfaceVariant: colors.text.secondary.light,
    
    // Outline colors
    outline: colors.neutral[300],
    outlineVariant: colors.neutral[200],
    
    // Shadow colors
    shadow: colors.neutral[900],
    scrim: colors.neutral[900],
    
    // Inverse colors
    inverseSurface: colors.neutral[800],
    inverseOnSurface: colors.neutral[50],
    inversePrimary: colors.primary[200],
    
    // Surface tint
    surfaceTint: colors.primary[500],
    
    // Custom colors for our app
    success: colors.success[500],
    warning: colors.warning[500],
    info: colors.primary[500],
  },
  fonts: {
    ...MD3LightTheme.fonts,
    // Override with our typography system
    displayLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.displayLarge.fontSize,
      fontWeight: typography.variants.displayLarge.fontWeight,
      lineHeight: typography.variants.displayLarge.lineHeight,
      letterSpacing: typography.variants.displayLarge.letterSpacing,
    },
    displayMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.displayMedium.fontSize,
      fontWeight: typography.variants.displayMedium.fontWeight,
      lineHeight: typography.variants.displayMedium.lineHeight,
      letterSpacing: typography.variants.displayMedium.letterSpacing,
    },
    displaySmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.displaySmall.fontSize,
      fontWeight: typography.variants.displaySmall.fontWeight,
      lineHeight: typography.variants.displaySmall.lineHeight,
      letterSpacing: typography.variants.displaySmall.letterSpacing,
    },
    headlineLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.headlineLarge.fontSize,
      fontWeight: typography.variants.headlineLarge.fontWeight,
      lineHeight: typography.variants.headlineLarge.lineHeight,
      letterSpacing: typography.variants.headlineLarge.letterSpacing,
    },
    headlineMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.headlineMedium.fontSize,
      fontWeight: typography.variants.headlineMedium.fontWeight,
      lineHeight: typography.variants.headlineMedium.lineHeight,
      letterSpacing: typography.variants.headlineMedium.letterSpacing,
    },
    headlineSmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.headlineSmall.fontSize,
      fontWeight: typography.variants.headlineSmall.fontWeight,
      lineHeight: typography.variants.headlineSmall.lineHeight,
      letterSpacing: typography.variants.headlineSmall.letterSpacing,
    },
    titleLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.titleLarge.fontSize,
      fontWeight: typography.variants.titleLarge.fontWeight,
      lineHeight: typography.variants.titleLarge.lineHeight,
      letterSpacing: typography.variants.titleLarge.letterSpacing,
    },
    titleMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.titleMedium.fontSize,
      fontWeight: typography.variants.titleMedium.fontWeight,
      lineHeight: typography.variants.titleMedium.lineHeight,
      letterSpacing: typography.variants.titleMedium.letterSpacing,
    },
    titleSmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.titleSmall.fontSize,
      fontWeight: typography.variants.titleSmall.fontWeight,
      lineHeight: typography.variants.titleSmall.lineHeight,
      letterSpacing: typography.variants.titleSmall.letterSpacing,
    },
    bodyLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.bodyLarge.fontSize,
      fontWeight: typography.variants.bodyLarge.fontWeight,
      lineHeight: typography.variants.bodyLarge.lineHeight,
      letterSpacing: typography.variants.bodyLarge.letterSpacing,
    },
    bodyMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.bodyMedium.fontSize,
      fontWeight: typography.variants.bodyMedium.fontWeight,
      lineHeight: typography.variants.bodyMedium.lineHeight,
      letterSpacing: typography.variants.bodyMedium.letterSpacing,
    },
    bodySmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.bodySmall.fontSize,
      fontWeight: typography.variants.bodySmall.fontWeight,
      lineHeight: typography.variants.bodySmall.lineHeight,
      letterSpacing: typography.variants.bodySmall.letterSpacing,
    },
    labelLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.labelLarge.fontSize,
      fontWeight: typography.variants.labelLarge.fontWeight,
      lineHeight: typography.variants.labelLarge.lineHeight,
      letterSpacing: typography.variants.labelLarge.letterSpacing,
    },
    labelMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.labelMedium.fontSize,
      fontWeight: typography.variants.labelMedium.fontWeight,
      lineHeight: typography.variants.labelMedium.lineHeight,
      letterSpacing: typography.variants.labelMedium.letterSpacing,
    },
    labelSmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.labelSmall.fontSize,
      fontWeight: typography.variants.labelSmall.fontWeight,
      lineHeight: typography.variants.labelSmall.lineHeight,
      letterSpacing: typography.variants.labelSmall.letterSpacing,
    },
  },
  // Custom spacing for components
  roundness: spacing.component.card.borderRadius,
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Primary colors
    primary: colors.primary[400],
    onPrimary: colors.primary[900],
    primaryContainer: colors.primary[900],
    onPrimaryContainer: colors.primary[100],
    
    // Secondary colors
    secondary: colors.secondary[400],
    onSecondary: colors.secondary[900],
    secondaryContainer: colors.secondary[900],
    onSecondaryContainer: colors.secondary[100],
    
    // Tertiary colors (accent)
    tertiary: colors.accent[400],
    onTertiary: colors.accent[900],
    tertiaryContainer: colors.accent[900],
    onTertiaryContainer: colors.accent[100],
    
    // Error colors
    error: colors.error[400],
    onError: colors.error[900],
    errorContainer: colors.error[900],
    onErrorContainer: colors.error[100],
    
    // Background colors
    background: colors.background.dark,
    onBackground: colors.text.primary.dark,
    surface: colors.background.surface.dark,
    onSurface: colors.text.primary.dark,
    surfaceVariant: colors.neutral[800],
    onSurfaceVariant: colors.text.secondary.dark,
    
    // Outline colors
    outline: colors.neutral[600],
    outlineVariant: colors.neutral[700],
    
    // Shadow colors
    shadow: colors.neutral[900],
    scrim: colors.neutral[900],
    
    // Inverse colors
    inverseSurface: colors.neutral[100],
    inverseOnSurface: colors.neutral[900],
    inversePrimary: colors.primary[800],
    
    // Surface tint
    surfaceTint: colors.primary[400],
    
    // Custom colors for our app
    success: colors.success[400],
    warning: colors.warning[400],
    info: colors.primary[400],
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    // Same typography as light theme
    displayLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.displayLarge.fontSize,
      fontWeight: typography.variants.displayLarge.fontWeight,
      lineHeight: typography.variants.displayLarge.lineHeight,
      letterSpacing: typography.variants.displayLarge.letterSpacing,
    },
    displayMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.displayMedium.fontSize,
      fontWeight: typography.variants.displayMedium.fontWeight,
      lineHeight: typography.variants.displayMedium.lineHeight,
      letterSpacing: typography.variants.displayMedium.letterSpacing,
    },
    displaySmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.displaySmall.fontSize,
      fontWeight: typography.variants.displaySmall.fontWeight,
      lineHeight: typography.variants.displaySmall.lineHeight,
      letterSpacing: typography.variants.displaySmall.letterSpacing,
    },
    headlineLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.headlineLarge.fontSize,
      fontWeight: typography.variants.headlineLarge.fontWeight,
      lineHeight: typography.variants.headlineLarge.lineHeight,
      letterSpacing: typography.variants.headlineLarge.letterSpacing,
    },
    headlineMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.headlineMedium.fontSize,
      fontWeight: typography.variants.headlineMedium.fontWeight,
      lineHeight: typography.variants.headlineMedium.lineHeight,
      letterSpacing: typography.variants.headlineMedium.letterSpacing,
    },
    headlineSmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.headlineSmall.fontSize,
      fontWeight: typography.variants.headlineSmall.fontWeight,
      lineHeight: typography.variants.headlineSmall.lineHeight,
      letterSpacing: typography.variants.headlineSmall.letterSpacing,
    },
    titleLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.titleLarge.fontSize,
      fontWeight: typography.variants.titleLarge.fontWeight,
      lineHeight: typography.variants.titleLarge.lineHeight,
      letterSpacing: typography.variants.titleLarge.letterSpacing,
    },
    titleMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.titleMedium.fontSize,
      fontWeight: typography.variants.titleMedium.fontWeight,
      lineHeight: typography.variants.titleMedium.lineHeight,
      letterSpacing: typography.variants.titleMedium.letterSpacing,
    },
    titleSmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.titleSmall.fontSize,
      fontWeight: typography.variants.titleSmall.fontWeight,
      lineHeight: typography.variants.titleSmall.lineHeight,
      letterSpacing: typography.variants.titleSmall.letterSpacing,
    },
    bodyLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.bodyLarge.fontSize,
      fontWeight: typography.variants.bodyLarge.fontWeight,
      lineHeight: typography.variants.bodyLarge.lineHeight,
      letterSpacing: typography.variants.bodyLarge.letterSpacing,
    },
    bodyMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.bodyMedium.fontSize,
      fontWeight: typography.variants.bodyMedium.fontWeight,
      lineHeight: typography.variants.bodyMedium.lineHeight,
      letterSpacing: typography.variants.bodyMedium.letterSpacing,
    },
    bodySmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.bodySmall.fontSize,
      fontWeight: typography.variants.bodySmall.fontWeight,
      lineHeight: typography.variants.bodySmall.lineHeight,
      letterSpacing: typography.variants.bodySmall.letterSpacing,
    },
    labelLarge: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.labelLarge.fontSize,
      fontWeight: typography.variants.labelLarge.fontWeight,
      lineHeight: typography.variants.labelLarge.lineHeight,
      letterSpacing: typography.variants.labelLarge.letterSpacing,
    },
    labelMedium: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.labelMedium.fontSize,
      fontWeight: typography.variants.labelMedium.fontWeight,
      lineHeight: typography.variants.labelMedium.lineHeight,
      letterSpacing: typography.variants.labelMedium.letterSpacing,
    },
    labelSmall: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.variants.labelSmall.fontSize,
      fontWeight: typography.variants.labelSmall.fontWeight,
      lineHeight: typography.variants.labelSmall.lineHeight,
      letterSpacing: typography.variants.labelSmall.letterSpacing,
    },
  },
  // Custom spacing for components
  roundness: spacing.component.card.borderRadius,
};

// Theme context type
export type AppTheme = typeof paperLightTheme;

// Theme utilities
export const themeUtils = {
  // Get theme based on dark mode preference
  getTheme: (isDark: boolean): AppTheme => {
    return isDark ? paperDarkTheme : paperLightTheme;
  },
  
  // Get color from theme
  getThemeColor: (theme: AppTheme, colorKey: string) => {
    return theme.colors[colorKey as keyof typeof theme.colors];
  },
  
  // Check if theme is dark
  isDarkTheme: (theme: AppTheme): boolean => {
    return theme === paperDarkTheme;
  },
};