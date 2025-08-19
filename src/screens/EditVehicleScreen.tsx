import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { Vehicle } from '../types/vehicle';
import { getVehicle } from '../services/vehicles';
import VehicleForm from '../components/VehicleForm';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { getFirebase } from '../services/firebase';
import { getAuth } from 'firebase/auth';

interface EditVehicleScreenProps {
  route: {
    params: {
      vehicleId: string;
    };
  };
  navigation: any;
}

export default function EditVehicleScreen({ route, navigation }: EditVehicleScreenProps): React.JSX.Element {
  const { theme } = useTheme();
  const { vehicleId } = route.params;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadVehicleAndUser();
  }, [vehicleId]);

  const loadVehicleAndUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const firebase = await getFirebase();
      if (!firebase) {
        setError('Firebase is not properly initialized');
        return;
      }

      const auth = getAuth(firebase.app);
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        setError('User not authenticated');
        return;
      }

      setUserId(currentUser.uid);

      // Load vehicle data
      const result = await getVehicle(vehicleId);
      if (result.success && result.vehicle) {
        setVehicle(result.vehicle);
      } else {
        setError(result.error?.message || 'Failed to load vehicle');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (updatedVehicleId: string) => {
    // Navigate back to garage screen
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // Show loading state
  if (loading) {
    return <LoadingState message="Loading vehicle details..." />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorState
        title="Error Loading Vehicle"
        message={error}
        onRetry={loadVehicleAndUser}
      />
    );
  }

  // Show form when vehicle is loaded
  if (vehicle && userId) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <VehicleForm
          userId={userId}
          mode="edit"
          vehicle={vehicle}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </View>
    );
  }

  // Fallback error state
  return (
    <ErrorState
      title="Vehicle Not Found"
      message="The vehicle you're trying to edit could not be found."
      onRetry={loadVehicleAndUser}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
