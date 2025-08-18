// Design System Typography Scale

export const typography = {
  // Font Families
  fontFamily: {
    primary: 'System', // iOS: San Francisco, Android: Roboto
    secondary: 'System',
    monospace: 'Courier New',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },

  // Typography Variants
  variants: {
    // Display styles
    displayLarge: {
      fontSize: 57,
      fontWeight: '400',
      lineHeight: 64,
      letterSpacing: -0.25,
    },
    displayMedium: {
      fontSize: 45,
      fontWeight: '400',
      lineHeight: 52,
      letterSpacing: 0,
    },
    displaySmall: {
      fontSize: 36,
      fontWeight: '400',
      lineHeight: 44,
      letterSpacing: 0,
    },

    // Headline styles
    headlineLarge: {
      fontSize: 32,
      fontWeight: '400',
      lineHeight: 40,
      letterSpacing: 0,
    },
    headlineMedium: {
      fontSize: 28,
      fontWeight: '400',
      lineHeight: 36,
      letterSpacing: 0,
    },
    headlineSmall: {
      fontSize: 24,
      fontWeight: '400',
      lineHeight: 32,
      letterSpacing: 0,
    },

    // Title styles
    titleLarge: {
      fontSize: 22,
      fontWeight: '400',
      lineHeight: 28,
      letterSpacing: 0,
    },
    titleMedium: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    titleSmall: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      letterSpacing: 0.1,
    },

    // Body styles
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      letterSpacing: 0.4,
    },

    // Label styles
    labelLarge: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      letterSpacing: 0.1,
    },
    labelMedium: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 0.5,
    },
    labelSmall: {
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 0.5,
    },
  },
};

// Typography usage guidelines
export const typographyUsage = {
  displayLarge: 'Use for hero sections and main page titles',
  displayMedium: 'Use for section headers and important titles',
  displaySmall: 'Use for subsection headers',
  headlineLarge: 'Use for page titles and major headings',
  headlineMedium: 'Use for section titles',
  headlineSmall: 'Use for subsection titles',
  titleLarge: 'Use for card titles and important text',
  titleMedium: 'Use for button text and navigation labels',
  titleSmall: 'Use for small labels and captions',
  bodyLarge: 'Use for main content text',
  bodyMedium: 'Use for secondary content and descriptions',
  bodySmall: 'Use for fine print and metadata',
  labelLarge: 'Use for form labels and interactive elements',
  labelMedium: 'Use for small labels and badges',
  labelSmall: 'Use for the smallest labels and indicators',
};

export default typography;
