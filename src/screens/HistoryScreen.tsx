import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function HistoryScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Session History</Text>
      <Text style={styles.spacer}>Past sessions (coming soon).</Text>
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
