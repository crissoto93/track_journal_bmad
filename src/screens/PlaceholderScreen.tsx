import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { getFirebase } from '../services/firebase';

function PlaceholderScreen(): JSX.Element {
  const [status, setStatus] = useState<'checking' | 'connected' | 'not-configured' | 'error'>('checking');

  useEffect(() => {
    let isMounted = true;
    getFirebase()
      .then(services => {
        if (!isMounted) return;
        if (services) {
          setStatus('connected');
        } else {
          setStatus('not-configured');
        }
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
      <Text variant="headlineMedium">Track Journal</Text>
      {status === 'checking' ? (
        <ActivityIndicator style={styles.spacer} />
      ) : (
        <Text style={styles.spacer}>Firebase status: {status}</Text>
      )}
    </View>
  );
}

export default PlaceholderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    marginTop: 12,
  },
});
