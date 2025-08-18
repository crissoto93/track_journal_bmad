import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { signInWithGoogle } from '../services/socialAuth';
import { SOCIAL_ICONS } from './IconConstants';
import Icon from './Icon';

interface SocialAuthButtonsProps {
  onSuccess?: (user: { uid: string; email: string | null; displayName?: string | null }) => void;
  onError?: (error: { code: string; message: string }) => void;
  disabled?: boolean;
}

export default function SocialAuthButtons({ 
  onSuccess, 
  onError, 
  disabled = false 
}: SocialAuthButtonsProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading || disabled) return;
    
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      
      if (result.success && result.user) {
        onSuccess?.(result.user);
      } else if (result.error) {
        onError?.(result.error);
      }
    } catch (error) {
      onError?.({
        code: 'unknown-error',
        message: 'An unexpected error occurred during Google Sign-In'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={styles.orText}>
        Or continue with
      </Text>
      
      <View style={styles.buttonContainer}>
        {/* Google Sign-In Button */}
        <Button
          mode="outlined"
          onPress={handleGoogleSignIn}
          disabled={loading || disabled}
          loading={loading}
          style={[styles.socialButton, styles.googleButton]}
          icon={({ size, color }) => (
            <Icon
              name={SOCIAL_ICONS.google.name}
              family={SOCIAL_ICONS.google.family}
              size={size}
              color={color}
            />
          )}
          contentStyle={styles.buttonContent}
        >
          Continue with Google
        </Button>

        {/* Apple Sign-In Button (iOS only) - Temporarily disabled */}
        {/* {Platform.OS === 'ios' && (
          <Button
            mode="outlined"
            onPress={handleAppleSignIn}
            disabled={loading || disabled}
            loading={loading}
            style={[styles.socialButton, styles.appleButton]}
            icon="apple"
            contentStyle={styles.buttonContent}
          >
            Continue with Apple
          </Button>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  orText: {
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.7,
  },
  buttonContainer: {
    gap: 12,
  },
  socialButton: {
    borderRadius: 8,
    borderWidth: 1,
  },
  googleButton: {
    borderColor: '#4285F4',
  },
  appleButton: {
    borderColor: '#000000',
  },
  buttonContent: {
    height: 48,
  },
});
