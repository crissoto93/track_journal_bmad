import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import { NAVIGATION_ICONS } from '../components/IconConstants';
import Icon from '../components/Icon';
import DashboardScreen from '../screens/DashboardScreen';
import GarageScreen from '../screens/GarageScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootTabParamList = {
  Dashboard: undefined;
  Garage: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon 
              name={NAVIGATION_ICONS.dashboard.name}
              family={NAVIGATION_ICONS.dashboard.family}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Garage" 
        component={GarageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon 
              name={NAVIGATION_ICONS.garage.name}
              family={NAVIGATION_ICONS.garage.family}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon 
              name={NAVIGATION_ICONS.history.name}
              family={NAVIGATION_ICONS.history.family}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
