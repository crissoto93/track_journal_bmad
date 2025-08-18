import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useTheme } from '../theme';
import { STATUS_ICONS } from './IconConstants';
import Icon from './Icon';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  showIcon?: boolean;
}

export function LoadingState({ 
  message = 'Loading...', 
  size = 'large',
  showIcon = true 
}: LoadingStateProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {showIcon && (
        <Icon
          name={STATUS_ICONS.loading.name}
          family={STATUS_ICONS.loading.family}
          size="lg"
          color={theme.colors.primary}
          style={styles.icon}
        />
      )}
      <ActivityIndicator 
        size={size} 
        color={theme.colors.primary}
        style={styles.spinner}
      />
      <Text 
        variant="bodyMedium" 
        style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
      >
        {message}
      </Text>
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
  spinner: {
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
  },
});

export default LoadingState;
