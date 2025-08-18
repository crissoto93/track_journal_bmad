// Design System Theme Exports

// Core design tokens
export { default as colors } from './colors';
export { default as typography } from './typography';
export { default as spacing } from './spacing';
export { default as designTokens } from './designTokens';

// Theme utilities
export { tokenUtils, getThemeTokens, tokenCombinations, tokenUsagePatterns } from './designTokens';

// React Native Paper themes
export { 
  paperLightTheme, 
  paperDarkTheme, 
  themeUtils,
  type AppTheme 
} from './paperTheme';

// Theme provider and context
export { 
  ThemeProvider, 
  useTheme,
  type ThemeContextType 
} from './ThemeProvider';

// Re-export everything for convenience
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './designTokens';
