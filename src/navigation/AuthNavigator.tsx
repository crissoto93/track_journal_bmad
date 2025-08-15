import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen';

export type AuthStackParamList = {
  SignUp: undefined;
  Login: undefined; // For future implementation
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
