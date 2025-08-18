// Design System Spacing Scale

export const spacing = {
  // Base spacing scale (4px grid system)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  '5xl': 128,

  // Component-specific spacing
  component: {
    // Button spacing
    button: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginVertical: 8,
    },

    // Card spacing
    card: {
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
    },

    // Input spacing
    input: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginVertical: 8,
    },

    // List item spacing
    listItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 2,
    },

    // Section spacing
    section: {
      paddingVertical: 24,
      paddingHorizontal: 16,
    },

    // Screen spacing
    screen: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
  },

  // Layout spacing
  layout: {
    // Header spacing
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },

    // Tab bar spacing
    tabBar: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },

    // Content spacing
    content: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },

    // Footer spacing
    footer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
  },

  // Utility spacing classes
  utilities: {
    // Margin utilities
    margin: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
    },

    // Padding utilities
    padding: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
    },

    // Gap utilities (for flexbox)
    gap: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
    },
  },
};

// Spacing usage guidelines
export const spacingUsage = {
  xs: 'Use for minimal spacing between related elements',
  sm: 'Use for small spacing between elements in the same group',
  md: 'Use for standard spacing between sections and components',
  lg: 'Use for larger spacing between major sections',
  xl: 'Use for extra large spacing between major page sections',
  '2xl': 'Use for maximum spacing between completely separate areas',
  '3xl': 'Use for hero section spacing and large content areas',
  '4xl': 'Use for page-level spacing and major content separation',
  '5xl': 'Use for screen-level spacing and maximum content separation',
};

// Common spacing patterns
export const spacingPatterns = {
  // Stack patterns (vertical spacing)
  stack: {
    xs: { gap: spacing.xs },
    sm: { gap: spacing.sm },
    md: { gap: spacing.md },
    lg: { gap: spacing.lg },
    xl: { gap: spacing.xl },
  },

  // Inline patterns (horizontal spacing)
  inline: {
    xs: { gap: spacing.xs },
    sm: { gap: spacing.sm },
    md: { gap: spacing.md },
    lg: { gap: spacing.lg },
    xl: { gap: spacing.xl },
  },

  // Container patterns
  container: {
    tight: { padding: spacing.md },
    normal: { padding: spacing.lg },
    loose: { padding: spacing.xl },
  },
};

export default spacing;
