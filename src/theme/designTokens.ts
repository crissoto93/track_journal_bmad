// Design System Tokens
// Centralized design tokens for consistent theming across the app

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const designTokens = {
  colors,
  typography,
  spacing,
};

// Theme-aware token getters
export const getThemeTokens = (isDark: boolean = false) => ({
  colors: {
    ...colors,
    background: isDark ? colors.background.dark : colors.background.light,
    surface: isDark ? colors.background.surface.dark : colors.background.surface.light,
    text: {
      primary: isDark ? colors.text.primary.dark : colors.text.primary.light,
      secondary: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      disabled: isDark ? colors.text.disabled.dark : colors.text.disabled.light,
    },
  },
  typography,
  spacing,
});

// Utility functions for accessing design tokens
export const tokenUtils = {
  // Color utilities
  getColor: (colorPath: string, isDark: boolean = false) => {
    const tokens = getThemeTokens(isDark);
    return colorPath.split('.').reduce((obj, key) => obj?.[key], tokens.colors);
  },

  // Typography utilities
  getTypography: (variant: string) => {
    return typography.variants[variant as keyof typeof typography.variants];
  },

  // Spacing utilities
  getSpacing: (size: keyof typeof spacing) => {
    return spacing[size];
  },

  // Component spacing utilities
  getComponentSpacing: (component: string, property: string) => {
    return spacing.component[component as keyof typeof spacing.component]?.[property];
  },
};

// Common token combinations
export const tokenCombinations = {
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary[500],
      textColor: '#ffffff',
      paddingHorizontal: spacing.component.button.paddingHorizontal,
      paddingVertical: spacing.component.button.paddingVertical,
      borderRadius: 8,
      fontSize: typography.variants.labelLarge.fontSize,
      fontWeight: typography.variants.labelLarge.fontWeight,
    },
    secondary: {
      backgroundColor: colors.secondary[100],
      textColor: colors.secondary[700],
      paddingHorizontal: spacing.component.button.paddingHorizontal,
      paddingVertical: spacing.component.button.paddingVertical,
      borderRadius: 8,
      fontSize: typography.variants.labelLarge.fontSize,
      fontWeight: typography.variants.labelLarge.fontWeight,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: colors.primary[500],
      borderColor: colors.primary[500],
      borderWidth: 1,
      paddingHorizontal: spacing.component.button.paddingHorizontal,
      paddingVertical: spacing.component.button.paddingVertical,
      borderRadius: 8,
      fontSize: typography.variants.labelLarge.fontSize,
      fontWeight: typography.variants.labelLarge.fontWeight,
    },
  },

  // Card styles
  card: {
    default: {
      backgroundColor: colors.background.light,
      padding: spacing.component.card.padding,
      marginVertical: spacing.component.card.marginVertical,
      borderRadius: spacing.component.card.borderRadius,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    dark: {
      backgroundColor: colors.background.dark,
      padding: spacing.component.card.padding,
      marginVertical: spacing.component.card.marginVertical,
      borderRadius: spacing.component.card.borderRadius,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
  },

  // Input styles
  input: {
    default: {
      backgroundColor: colors.background.light,
      borderColor: colors.neutral[300],
      borderWidth: 1,
      paddingHorizontal: spacing.component.input.paddingHorizontal,
      paddingVertical: spacing.component.input.paddingVertical,
      borderRadius: 8,
      fontSize: typography.variants.bodyMedium.fontSize,
      color: colors.text.primary.light,
    },
    dark: {
      backgroundColor: colors.background.dark,
      borderColor: colors.neutral[600],
      borderWidth: 1,
      paddingHorizontal: spacing.component.input.paddingHorizontal,
      paddingVertical: spacing.component.input.paddingVertical,
      borderRadius: 8,
      fontSize: typography.variants.bodyMedium.fontSize,
      color: colors.text.primary.dark,
    },
  },

  // List item styles
  listItem: {
    default: {
      paddingVertical: spacing.component.listItem.paddingVertical,
      paddingHorizontal: spacing.component.listItem.paddingHorizontal,
      marginVertical: spacing.component.listItem.marginVertical,
      backgroundColor: colors.background.light,
      borderBottomColor: colors.neutral[200],
      borderBottomWidth: 1,
    },
    dark: {
      paddingVertical: spacing.component.listItem.paddingVertical,
      paddingHorizontal: spacing.component.listItem.paddingHorizontal,
      marginVertical: spacing.component.listItem.marginVertical,
      backgroundColor: colors.background.dark,
      borderBottomColor: colors.neutral[700],
      borderBottomWidth: 1,
    },
  },
};

// Token usage patterns documentation
export const tokenUsagePatterns = {
  // When to use specific tokens
  colors: {
    primary: 'Use for main actions, links, and brand elements',
    secondary: 'Use for secondary actions and supporting elements',
    accent: 'Use for highlights and calls-to-action',
    semantic: 'Use success/warning/error for appropriate states',
    neutral: 'Use for borders, dividers, and subtle backgrounds',
  },
  typography: {
    display: 'Use for hero sections and main page titles',
    headline: 'Use for section headers and important titles',
    title: 'Use for card titles and important text',
    body: 'Use for main content and descriptions',
    label: 'Use for form labels and interactive elements',
  },
  spacing: {
    xs: 'Minimal spacing between related elements',
    sm: 'Small spacing between elements in same group',
    md: 'Standard spacing between sections',
    lg: 'Larger spacing between major sections',
    xl: 'Extra large spacing between page sections',
  },
};

export default designTokens;
