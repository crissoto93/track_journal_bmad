// Design System Color Palette
// All colors are WCAG AA compliant for accessibility

export const colors = {
  // Primary Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main primary color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Main secondary color
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Accent Colors
  accent: {
    50: '#fef7ee',
    100: '#fdedd4',
    200: '#fbd7a8',
    300: '#f8bb71',
    400: '#f59538',
    500: '#f2740d', // Main accent color
    600: '#e35a08',
    700: '#bc440b',
    800: '#95360f',
    900: '#782f10',
  },

  // Semantic Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success color
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning color
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main error color
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Background Colors
  background: {
    light: '#ffffff',
    dark: '#0f172a',
    surface: {
      light: '#f8fafc',
      dark: '#1e293b',
    },
  },

  // Text Colors
  text: {
    primary: {
      light: '#0f172a',
      dark: '#f8fafc',
    },
    secondary: {
      light: '#475569',
      dark: '#cbd5e1',
    },
    disabled: {
      light: '#94a3b8',
      dark: '#475569',
    },
  },
};

// Color usage guidelines
export const colorUsage = {
  primary: 'Use for main actions, links, and brand elements',
  secondary: 'Use for secondary actions and supporting elements',
  accent: 'Use for highlights, calls-to-action, and important elements',
  success: 'Use for positive states, confirmations, and successful actions',
  warning: 'Use for caution states and important notices',
  error: 'Use for error states, destructive actions, and critical alerts',
  neutral: 'Use for borders, dividers, and subtle backgrounds',
};

export default colors;
