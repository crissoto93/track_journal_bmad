import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function GarageScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">My Garage</Text>
      <Text style={styles.spacer}>List of vehicles (coming soon).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    marginTop: 8,
  },
});
