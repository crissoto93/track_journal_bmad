import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTheme } from '../theme';
import { ACTION_ICONS } from './IconConstants';
import Icon from './Icon';

interface EmptyStateProps {
  icon?: string;
  iconFamily?: string;
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  showAction?: boolean;
}

export function EmptyState({ 
  icon = 'inbox-outline',
  iconFamily = 'MaterialCommunityIcons',
  title = 'No items found',
  message = 'There are no items to display at the moment.',
  actionText = 'Add Item',
  onAction,
  showAction = false
}: EmptyStateProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Icon
        name={icon}
        family={iconFamily as any}
        size="xl"
        color={theme.colors.onSurfaceVariant}
        style={styles.icon}
      />
      
      <Text 
        variant="titleMedium" 
        style={[styles.title, { color: theme.colors.onSurface }]}
      >
        {title}
      </Text>
      
      <Text 
        variant="bodyMedium" 
        style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
      >
        {message}
      </Text>
      
      {showAction && onAction && (
        <Button
          mode="contained"
          onPress={onAction}
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.actionButtonContent}
          icon={({ size, color }) => (
            <Icon
              name={ACTION_ICONS.add.name}
              family={ACTION_ICONS.add.family}
              size={size}
              color={color}
            />
          )}
        >
          {actionText}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  actionButton: {
    borderRadius: 8,
  },
  actionButtonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default EmptyState;
