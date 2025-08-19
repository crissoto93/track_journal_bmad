import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFirebase } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import EditVehicleScreen from '../screens/EditVehicleScreen';

export type RootStackParamList = {
  Main: undefined;
  EditVehicle: {
    vehicleId: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const firebase = await getFirebase();
        if (firebase) {
          const unsubscribe = onAuthStateChanged(firebase.auth, (authUser) => {
            setUser(authUser);
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

  if (!user) {
    return <AuthNavigator />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={AppNavigator} />
      <Stack.Screen 
        name="EditVehicle" 
        component={EditVehicleScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Edit Vehicle',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
