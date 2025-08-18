import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperLightTheme, paperDarkTheme, AppTheme } from './paperTheme';

// Theme context interface
interface ThemeContextType {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme provider component
export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  // Update theme when system color scheme changes
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  // Get current theme
  const theme = isDark ? paperDarkTheme : paperLightTheme;

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Set theme function
  const setTheme = (dark: boolean) => {
    setIsDark(dark);
  };

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Export theme provider as default
export default ThemeProvider;
