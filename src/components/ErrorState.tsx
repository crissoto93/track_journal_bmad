import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTheme } from '../theme';
import { STATUS_ICONS, ACTION_ICONS } from './IconConstants';
import Icon from './Icon';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  retryText?: string;
}

export function ErrorState({ 
  title = 'Something went wrong',
  message = 'An error occurred while loading the content. Please try again.',
  onRetry,
  showRetry = true,
  retryText = 'Try Again'
}: ErrorStateProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Icon
        name={STATUS_ICONS.error.name}
        family={STATUS_ICONS.error.family}
        size="xl"
        color={theme.colors.error}
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
      
      {showRetry && onRetry && (
        <Button
          mode="contained"
          onPress={onRetry}
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.retryButtonContent}
          icon={({ size, color }) => (
            <Icon
              name={ACTION_ICONS.refresh.name}
              family={ACTION_ICONS.refresh.family}
              size={size}
              color={color}
            />
          )}
        >
          {retryText}
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
  retryButton: {
    borderRadius: 8,
  },
  retryButtonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default ErrorState;
