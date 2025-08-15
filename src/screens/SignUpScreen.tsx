import React, { useState } from 'react';
import {
  View,
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
import { signUp } from '../services/auth';
import { createUserProfile } from '../services/data';
import { useNavigation } from '@react-navigation/native';

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function SignUpScreen(): JSX.Element {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (password !== confirmPassword) {
      newErrors.password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Step 1: Create user in Firebase Auth
      const signUpResult = await signUp(email, password);
      
      if (!signUpResult.success || !signUpResult.user) {
        setSnackbarMessage(signUpResult.error?.message || 'Sign up failed');
        setSnackbarVisible(true);
        return;
      }

      // Step 2: Create user profile in Firestore
      const profileResult = await createUserProfile(
        signUpResult.user.uid,
        signUpResult.user.email || email
      );

      if (!profileResult.success) {
        setSnackbarMessage(profileResult.error?.message || 'Failed to create user profile');
        setSnackbarVisible(true);
        return;
      }

      // Step 3: Navigate to Dashboard on success
      setSnackbarMessage('Account created successfully!');
      setSnackbarVisible(true);
      
      // Navigate to Dashboard after a brief delay
      setTimeout(() => {
        navigation.navigate('Dashboard' as never);
      }, 1500);

    } catch (error) {
      setSnackbarMessage('An unexpected error occurred');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() && password.length >= 6 && password === confirmPassword;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Create Account
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
            error={!!errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            error={!!errors.password}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            error={!!errors.password}
          />

          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            disabled={!isFormValid || loading}
            style={styles.button}
          >
            Sign Up
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.goBack()}
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
        duration={3000}
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
    marginBottom: 24,
    fontWeight: 'bold',
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
