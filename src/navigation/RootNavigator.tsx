import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { getFirebase } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

export function RootNavigator(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const firebase = await getFirebase();
        if (firebase) {
          const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
            setUser(user);
            setLoading(false);
          });
          return unsubscribe;
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
