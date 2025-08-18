import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, FAB, Chip } from 'react-native-paper';
import { useTheme } from '../theme';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { SESSION_ICONS, DATA_ICONS, VEHICLE_ICONS } from '../components/IconConstants';
import Icon from '../components/Icon';

export default function HistoryScreen(): React.JSX.Element {
  const { theme } = useTheme();

  const handleStartSession = () => {
    // TODO: Implement start session functionality
    console.log('Start session');
  };

  const handleViewAnalytics = () => {
    // TODO: Implement analytics view
    console.log('View analytics');
  };

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
            Session History
          </Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            View and analyze your past tracking sessions
          </Text>
        </View>

        {/* Quick Stats */}
        <Card style={styles.statsCard}>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Quick Stats
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Icon
                name={SESSION_ICONS.timer.name}
                family={SESSION_ICONS.timer.family}
                size="lg"
                color={theme.colors.primary}
              />
              <Text variant="headlineSmall" style={[styles.statValue, { color: theme.colors.onSurface }]}>
                0
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Total Sessions
              </Text>
            </View>
            <View style={styles.statItem}>
              <Icon
                name={SESSION_ICONS.clock.name}
                family={SESSION_ICONS.clock.family}
                size="lg"
                color={theme.colors.primary}
              />
              <Text variant="headlineSmall" style={[styles.statValue, { color: theme.colors.onSurface }]}>
                0h
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Total Time
              </Text>
            </View>
            <View style={styles.statItem}>
              <Icon
                name={VEHICLE_ICONS.odometer.name}
                family={VEHICLE_ICONS.odometer.family}
                size="lg"
                color={theme.colors.primary}
              />
              <Text variant="headlineSmall" style={[styles.statValue, { color: theme.colors.onSurface }]}>
                0km
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Total Distance
              </Text>
            </View>
            <View style={styles.statItem}>
              <Icon
                name={VEHICLE_ICONS.speedometer.name}
                family={VEHICLE_ICONS.speedometer.family}
                size="lg"
                color={theme.colors.primary}
              />
              <Text variant="headlineSmall" style={[styles.statValue, { color: theme.colors.onSurface }]}>
                0
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Avg Speed
              </Text>
            </View>
          </View>
        </Card>

        {/* Session List */}
        <Card>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              Recent Sessions
            </Text>
            <Chip 
              icon={({ size, color }) => (
                <Icon
                  name={DATA_ICONS.analytics.name}
                  family={DATA_ICONS.analytics.family}
                  size={size}
                  color={color}
                />
              )}
              onPress={handleViewAnalytics}
              style={[styles.analyticsChip, { backgroundColor: theme.colors.primaryContainer }]}
              textStyle={{ color: theme.colors.onPrimaryContainer }}
            >
              Analytics
            </Chip>
          </View>
          <EmptyState
            icon="history"
            title="No sessions yet"
            message="Start your first tracking session to see your history and performance data."
            actionText="Start Session"
            onAction={handleStartSession}
            showAction={true}
          />
        </Card>

        {/* Filters */}
        <Card>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Filter Options
          </Text>
          <View style={styles.filters}>
            <Chip 
              icon="calendar"
              onPress={() => {}}
              style={[styles.filterChip, { backgroundColor: theme.colors.surfaceVariant }]}
              textStyle={{ color: theme.colors.onSurfaceVariant }}
            >
              Date Range
            </Chip>
            <Chip 
              icon="car"
              onPress={() => {}}
              style={[styles.filterChip, { backgroundColor: theme.colors.surfaceVariant }]}
              textStyle={{ color: theme.colors.onSurfaceVariant }}
            >
              Vehicle Type
            </Chip>
            <Chip 
              icon="map-marker"
              onPress={() => {}}
              style={[styles.filterChip, { backgroundColor: theme.colors.surfaceVariant }]}
              textStyle={{ color: theme.colors.onSurfaceVariant }}
            >
              Location
            </Chip>
          </View>
        </Card>

        {/* Export Options */}
        <Card>
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Export Data
          </Text>
          <View style={styles.exportOptions}>
            <View style={styles.exportOption}>
              <Icon
                name={DATA_ICONS.export.name}
                family={DATA_ICONS.export.family}
                size="md"
                color={theme.colors.primary}
              />
              <Text variant="bodyMedium" style={[styles.exportText, { color: theme.colors.onSurfaceVariant }]}>
                Export session data as CSV
              </Text>
            </View>
            <View style={styles.exportOption}>
              <Icon
                name={DATA_ICONS.chart.name}
                family={DATA_ICONS.chart.family}
                size="md"
                color={theme.colors.primary}
              />
              <Text variant="bodyMedium" style={[styles.exportText, { color: theme.colors.onSurfaceVariant }]}>
                Generate performance reports
              </Text>
            </View>
          </View>
        </Card>
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
  statsCard: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: 80,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontWeight: '600',
  },
  statLabel: {
    textAlign: 'center',
  },
  analyticsChip: {
    borderRadius: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    borderRadius: 16,
  },
  exportOptions: {
    gap: 16,
  },
  exportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exportText: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
