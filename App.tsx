import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/theme';
import { RootNavigator } from './src/navigation/RootNavigator';
import { initializeGoogleSignIn } from './src/services/socialAuth';

function AppContent(): React.JSX.Element {
  const { isDark } = useTheme();

  useEffect(() => {
    // Initialize Google Sign-In
    initializeGoogleSignIn();
  }, []);

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={isDark ? NavDarkTheme : NavDefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
