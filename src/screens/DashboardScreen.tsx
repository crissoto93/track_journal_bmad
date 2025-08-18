import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, FAB } from 'react-native-paper';
import { useTheme } from '../theme';
import { getFirebase } from '../services/firebase';
import { signOut } from 'firebase/auth';
import Card from '../components/Card';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { SESSION_ICONS, VEHICLE_ICONS, USER_ICONS } from '../components/IconConstants';
import Icon from '../components/Icon';

export default function DashboardScreen(): React.JSX.Element {
  const { theme } = useTheme();
  const [status, setStatus] = useState<'checking' | 'connected' | 'not-configured' | 'error'>('checking');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getFirebase()
      .then(svc => {
        if (!isMounted) return;
        setStatus(svc ? 'connected' : 'not-configured');
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus('error');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const firebase = await getFirebase();
      if (firebase) {
        await signOut(firebase.auth);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = () => {
    // TODO: Implement start session functionality
    console.log('Start session');
  };

  const handleAddVehicle = () => {
    // TODO: Implement add vehicle functionality
    console.log('Add vehicle');
  };

  if (status === 'checking') {
    return <LoadingState message="Checking connection..." />;
  }

  if (status === 'error') {
    return (
      <ErrorState
        title="Connection Error"
        message="Unable to connect to the service. Please check your internet connection and try again."
        onRetry={() => {
          // For React Native, we'll just reload the component
          setStatus('checking');
        }}
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
            Dashboard
          </Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Track your vehicle sessions and performance
          </Text>
        </View>

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            <Button
              mode="contained"
              onPress={handleStartSession}
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              contentStyle={styles.actionButtonContent}
              icon={({ size, color }) => (
                <Icon
                  name={SESSION_ICONS.play.name}
                  family={SESSION_ICONS.play.family}
                  size={size}
                  color={color}
                />
              )}
            >
              Start Session
            </Button>
            <Button
              mode="outlined"
              onPress={handleAddVehicle}
              style={[styles.actionButton, { borderColor: theme.colors.outline }]}
              contentStyle={styles.actionButtonContent}
              icon={({ size, color }) => (
                <Icon
                  name={VEHICLE_ICONS.car.name}
                  family={VEHICLE_ICONS.car.family}
                  size={size}
                  color={color}
                />
              )}
            >
              Add Vehicle
            </Button>
          </View>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Recent Sessions
          </Text>
          <EmptyState
            icon="timer-outline"
            title="No recent sessions"
            message="Start your first tracking session to see your data here."
            actionText="Start Session"
            onAction={handleStartSession}
            showAction={true}
          />
        </Card>

        {/* Vehicle Summary */}
        <Card>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Vehicle Summary
          </Text>
          <EmptyState
            icon="garage-outline"
            title="No vehicles added"
            message="Add your first vehicle to start tracking sessions."
            actionText="Add Vehicle"
            onAction={handleAddVehicle}
            showAction={true}
          />
        </Card>

        {/* Status Section */}
        <Card style={styles.statusCard}>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            System Status
          </Text>
          <View style={styles.statusItem}>
            <Icon
              name={status === 'connected' ? 'check-circle' : 'alert-circle'}
              family="MaterialCommunityIcons"
              size="sm"
              color={status === 'connected' ? theme.colors.success : theme.colors.error}
            />
            <Text variant="bodyMedium" style={[styles.statusText, { color: theme.colors.onSurfaceVariant }]}>
              Firebase: {status === 'connected' ? 'Connected' : 'Not Connected'}
            </Text>
          </View>
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          loading={loading}
          style={[styles.logoutButton, { borderColor: theme.colors.outline }]}
          contentStyle={styles.logoutButtonContent}
          icon={({ size, color }) => (
            <Icon
              name={USER_ICONS.logout.name}
              family={USER_ICONS.logout.family}
              size={size}
              color={color}
            />
          )}
        >
          Logout
        </Button>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon={({ size, color }) => (
          <Icon
            name={SESSION_ICONS.play.name}
            family={SESSION_ICONS.play.family}
            size={size}
            color={color}
          />
        )}
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleStartSession}
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
  quickActionsCard: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  quickActions: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
  actionButtonContent: {
    paddingVertical: 8,
  },
  statusCard: {
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusText: {
    flex: 1,
  },
  logoutButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
