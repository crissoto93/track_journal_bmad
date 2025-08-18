import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Snackbar,
  Surface,
} from 'react-native-paper';
import { sendPasswordResetEmail } from '../services/auth';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendResetEmail = async () => {
    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await sendPasswordResetEmail(email);
      
      if (result.success) {
        setSnackbarMessage('Password reset email sent! Check your inbox.');
        setSnackbarVisible(true);
        // Clear email field on success
        setEmail('');
      } else {
        setSnackbarMessage(result.error?.message || 'Failed to send reset email');
        setSnackbarVisible(true);
      }
    } catch (resetError) {
      setSnackbarMessage('An unexpected error occurred');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  const isFormValid = email.trim() && /\S+@\S+\.\S+/.test(email);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Reset Password
          </Text>
          
          <Text variant="bodyMedium" style={styles.description}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            error={!!error}
          />
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>

          <Button
            mode="contained"
            onPress={handleSendResetEmail}
            loading={loading}
            disabled={!isFormValid || loading}
            style={styles.button}
          >
            Send Reset Email
          </Button>

          <Button
            mode="text"
            onPress={handleBackToLogin}
            disabled={loading}
            style={styles.backButton}
          >
            Back to Login
          </Button>
        </Surface>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={5000}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  surface: {
    padding: 24,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
  },
  backButton: {
    marginTop: 8,
  },
});
