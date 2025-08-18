import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../theme';

// Icon family types
export type IconFamily = 
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Ionicons'
  | 'FontAwesome'
  | 'FontAwesome5';

// Icon size types
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Icon component props
interface IconProps {
  name: string;
  family?: IconFamily;
  size?: IconSize | number;
  color?: string;
  style?: any;
}

// Icon size mapping
const iconSizes: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

// Icon family component mapping
const iconFamilies = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
};

export function Icon({ 
  name, 
  family = 'MaterialCommunityIcons', 
  size = 'md', 
  color,
  style 
}: IconProps): React.JSX.Element {
  const { theme } = useTheme();
  
  // Get icon size
  const iconSize = typeof size === 'number' ? size : iconSizes[size];
  
  // Get icon color (default to theme's onSurface color)
  const iconColor = color || theme.colors.onSurface;
  
  // Get the appropriate icon component
  const IconComponent = iconFamilies[family];
  
  return (
    <IconComponent
      name={name}
      size={iconSize}
      color={iconColor}
      style={[styles.icon, style]}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    // Base icon styles
  },
});

export default Icon;
