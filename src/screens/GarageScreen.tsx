import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { useTheme } from '../theme';
import { getFirebase } from '../services/firebase';
import { getAuth } from 'firebase/auth';
import { getVehicles, deleteVehicle } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import VehicleCard from '../components/VehicleCard';
import VehicleForm from '../components/VehicleForm';
import { VEHICLE_ICONS } from '../components/IconConstants';
import Icon from '../components/Icon';

interface GarageScreenProps {
  navigation: any;
}

export default function GarageScreen({ navigation }: GarageScreenProps): React.JSX.Element {
  const { theme } = useTheme();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadUserAndVehicles();
  }, []);

  const loadUserAndVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

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
      await loadVehicles(currentUser.uid);
    } catch (err: any) {
      setError(err.message || 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadVehicles = async (uid: string) => {
    try {
      const result = await getVehicles(uid);
      if (result.success) {
        setVehicles(result.vehicles || []);
      } else {
        setError(result.error?.message || 'Failed to load vehicles');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load vehicles');
    }
  };

  const handleAddVehicle = () => {
    setShowAddForm(true);
  };

  const handleVehicleAdded = (_vehicleId: string) => {
    setShowAddForm(false);
    if (userId) {
      loadVehicles(userId);
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    // Navigate to edit vehicle screen
    navigation.navigate('EditVehicle', { vehicleId: vehicle.id });
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    Alert.alert(
      'Delete Vehicle',
      `Are you sure you want to delete your ${vehicle.year} ${vehicle.make} ${vehicle.model}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await deleteVehicle(vehicle.id);
              if (result.success) {
                setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
              } else {
                Alert.alert('Error', result.error?.message || 'Failed to delete vehicle');
              }
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete vehicle');
            }
          }
        }
      ]
    );
  };



  // Show add vehicle form
  if (showAddForm && userId) {
    return (
      <VehicleForm
        userId={userId}
        mode="create"
        onSuccess={handleVehicleAdded}
        onCancel={handleCancelAdd}
      />
    );
  }

  // Show loading state
  if (loading) {
    return <LoadingState message="Loading your vehicles..." />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorState
        title="Error Loading Vehicles"
        message={error}
        onRetry={loadUserAndVehicles}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
            My Garage
          </Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Manage your vehicles and their details
          </Text>
        </View>

        {/* Vehicle List */}
        <Card>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Vehicles ({vehicles.length})
          </Text>
          
          {vehicles.length > 0 ? (
            <View style={styles.vehicleList}>
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onEdit={handleEditVehicle}
                  onDelete={handleDeleteVehicle}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              icon="garage-outline"
              title="No vehicles yet"
              message="Add your first vehicle to start tracking sessions and performance data."
              actionText="Add Vehicle"
              onAction={handleAddVehicle}
              showAction={true}
            />
          )}
        </Card>



        {/* Features Info */}
        <Card>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Track Performance
          </Text>
          <View style={styles.features}>
            <View style={styles.feature}>
              <Icon
                name={VEHICLE_ICONS.speedometer.name}
                family={VEHICLE_ICONS.speedometer.family}
                size="md"
                color={theme.colors.primary}
              />
              <Text variant="bodyMedium" style={[styles.featureText, { color: theme.colors.onSurfaceVariant }]}>
                Speed tracking
              </Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name={VEHICLE_ICONS.odometer.name}
                family={VEHICLE_ICONS.odometer.family}
                size="md"
                color={theme.colors.primary}
              />
              <Text variant="bodyMedium" style={[styles.featureText, { color: theme.colors.onSurfaceVariant }]}>
                Distance logging
              </Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name={VEHICLE_ICONS.engine.name}
                family={VEHICLE_ICONS.engine.family}
                size="md"
                color={theme.colors.primary}
              />
              <Text variant="bodyMedium" style={[styles.featureText, { color: theme.colors.onSurfaceVariant }]}>
                Engine data
              </Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name={VEHICLE_ICONS.fuel.name}
                family={VEHICLE_ICONS.fuel.family}
                size="md"
                color={theme.colors.primary}
              />
              <Text variant="bodyMedium" style={[styles.featureText, { color: theme.colors.onSurfaceVariant }]}>
                Fuel efficiency
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon={({ size, color }) => (
          <Icon
            name={VEHICLE_ICONS.car.name}
            family={VEHICLE_ICONS.car.family}
            size={size}
            color={color}
          />
        )}
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleAddVehicle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Space for FAB
  },
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
  },
  subtitle: {
    lineHeight: 20,
  },
  cardTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },

  features: {
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    flex: 1,
  },
  vehicleList: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
