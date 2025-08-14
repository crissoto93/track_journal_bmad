import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { getFirebase } from '../services/firebase';

export default function DashboardScreen(): JSX.Element {
  const [status, setStatus] = useState<'checking' | 'connected' | 'not-configured' | 'error'>('checking');

  useEffect(() => {
    let isMounted = true;
    getFirebase()
      .then(svc => {
        if (!isMounted) return;
        setStatus(svc ? 'connected' : 'not-configured');
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus('error');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Dashboard</Text>
      <Text style={styles.spacer}>Start a new session from here (coming soon).</Text>
      {status === 'checking' ? (
        <ActivityIndicator style={styles.spacer} />
      ) : (
        <Text style={styles.spacer}>Firebase status: {status}</Text>
      )}
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
