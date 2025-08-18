import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  elevation?: number;
}

export function Card({ 
  children, 
  style, 
  padding = 'medium',
  margin = 'small',
  elevation = 2 
}: CardProps): React.JSX.Element {
  const { theme } = useTheme();

  const paddingMap = {
    none: 0,
    small: 12,
    medium: 16,
    large: 24,
  };

  const marginMap = {
    none: 0,
    small: 8,
    medium: 16,
    large: 24,
  };

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: paddingMap[padding],
    marginVertical: marginMap[margin],
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: 0.1,
    shadowRadius: elevation * 2,
    elevation: elevation,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  };

  return (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
}

export default Card;
