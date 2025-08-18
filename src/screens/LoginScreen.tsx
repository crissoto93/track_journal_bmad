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
import { signIn } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
import SocialAuthButtons from '../components/SocialAuthButtons';

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const loginResult = await signIn(email, password);
      
      if (!loginResult.success || !loginResult.user) {
        setSnackbarMessage(loginResult.error?.message || 'Login failed');
        setSnackbarVisible(true);
        return;
      }

      // Login successful - navigation will be handled by RootNavigator auth state
      setSnackbarMessage('Login successful!');
      setSnackbarVisible(true);

    } catch (error) {
      setSnackbarMessage('An unexpected error occurred');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp' as never);
  };

  const handleSocialAuthSuccess = (_user: { uid: string; email: string | null; displayName?: string | null }) => {
    setSnackbarMessage('Login successful!');
    setSnackbarVisible(true);
  };

  const handleSocialAuthError = (error: { code: string; message: string }) => {
    setSnackbarMessage(error.message);
    setSnackbarVisible(true);
  };

  const isFormValid = email.trim() && password.length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome Back
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

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={!isFormValid || loading}
            style={styles.button}
          >
            Log In
          </Button>

          <Button
            mode="text"
            onPress={handleForgotPassword}
            disabled={loading}
            style={styles.forgotButton}
          >
            Forgot Password?
          </Button>

                     <Button
             mode="text"
             onPress={handleSignUp}
             disabled={loading}
             style={styles.signUpButton}
           >
             Don't have an account? Sign Up
           </Button>

           <SocialAuthButtons
             onSuccess={handleSocialAuthSuccess}
             onError={handleSocialAuthError}
             disabled={loading}
           />
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
  forgotButton: {
    marginTop: 8,
  },
  signUpButton: {
    marginTop: 16,
  },
});
