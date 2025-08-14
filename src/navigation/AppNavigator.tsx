import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import GarageScreen from '../screens/GarageScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootTabParamList = {
  Dashboard: undefined;
  Garage: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator(): JSX.Element {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Garage" component={GarageScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
