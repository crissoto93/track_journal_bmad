import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { useTheme } from '../theme';
import { Vehicle, VEHICLE_TYPES } from '../types/vehicle';
import { VEHICLE_ICONS, ACTION_ICONS } from './IconConstants';
import Icon from './Icon';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
  showActions?: boolean;
}

export function VehicleCard({ 
  vehicle, 
  onPress, 
  onEdit, 
  onDelete, 
  showActions = true 
}: VehicleCardProps): React.JSX.Element {
  const { theme } = useTheme();
  
  const vehicleType = VEHICLE_TYPES.find(type => type.value === vehicle.type);
  const vehicleIcon = vehicleType ? VEHICLE_ICONS[vehicleType.icon as keyof typeof VEHICLE_ICONS] : VEHICLE_ICONS.car;

  const handlePress = () => {
    if (onPress) {
      onPress(vehicle);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(vehicle);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(vehicle);
    }
  };

  return (
    <Card 
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={handlePress}
    >
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.vehicleInfo}>
            <Icon
              name={vehicleIcon.name}
              family={vehicleIcon.family}
              size="lg"
              color={theme.colors.primary}
              style={styles.vehicleIcon}
            />
            <View style={styles.vehicleDetails}>
              <Text 
                variant="titleMedium" 
                style={[styles.vehicleName, { color: theme.colors.onSurface }]}
              >
                {vehicle.year} {vehicle.make} {vehicle.model}
              </Text>
              <Text 
                variant="bodyMedium" 
                style={[styles.vehicleType, { color: theme.colors.onSurfaceVariant }]}
              >
                {vehicleType?.label}
              </Text>
            </View>
          </View>
          
          {showActions && (
            <View style={styles.actions}>
              {onEdit && (
                <IconButton
                  icon={({ size, color }) => (
                    <Icon
                      name={ACTION_ICONS.edit.name}
                      family={ACTION_ICONS.edit.family}
                      size={size}
                      color={color}
                    />
                  )}
                  size={20}
                  onPress={handleEdit}
                  style={styles.actionButton}
                />
              )}
              {onDelete && (
                <IconButton
                  icon={({ size, color }) => (
                    <Icon
                      name={ACTION_ICONS.delete.name}
                      family={ACTION_ICONS.delete.family}
                      size={size}
                      color={theme.colors.error}
                    />
                  )}
                  size={20}
                  onPress={handleDelete}
                  style={styles.actionButton}
                />
              )}
            </View>
          )}
        </View>

        <View style={styles.details}>
          {vehicle.color && (
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                Color:
              </Text>
              <Text variant="bodySmall" style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                {vehicle.color}
              </Text>
            </View>
          )}
          
          {vehicle.engine && (
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                Engine:
              </Text>
              <Text variant="bodySmall" style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                {vehicle.engine}
              </Text>
            </View>
          )}
          
          {vehicle.transmission && (
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                Transmission:
              </Text>
              <Text variant="bodySmall" style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                {vehicle.transmission}
              </Text>
            </View>
          )}
          
          {vehicle.licensePlate && (
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                License:
              </Text>
              <Text variant="bodySmall" style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                {vehicle.licensePlate}
              </Text>
            </View>
          )}
        </View>

        {vehicle.notes && (
          <View style={styles.notes}>
            <Text variant="bodySmall" style={[styles.notesText, { color: theme.colors.onSurfaceVariant }]}>
              {vehicle.notes}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIcon: {
    marginRight: 12,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  vehicleType: {
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    margin: 0,
    marginLeft: 4,
  },
  details: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: '500',
    marginRight: 8,
    minWidth: 80,
  },
  detailValue: {
    flex: 1,
  },
  notes: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  notesText: {
    fontStyle: 'italic',
  },
});

export default VehicleCard;
