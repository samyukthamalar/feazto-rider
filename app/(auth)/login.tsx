/**
 * Screen 2: Login / Sign Up
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 2)
 * "Rider can login using phone number or sign up for a new account."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScooterRiderIllustration } from '../../src/components/brand/RiderIllustration';
import { InputField } from '../../src/components/common/InputField';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { WorkflowBar } from '../../src/components/common/WorkflowBar';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';
import { useUIStore } from '../../src/store/uiStore';

export default function LoginScreen() {
  const router = useRouter();
  const setPhone = useAuthStore((state) => state.setPhone);
  const showToast = useUIStore((state) => state.showToast);

  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('••••••••');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    if (!phoneNumber) {
      showToast('Please enter your phone number', 'warning');
      return;
    }
    setPhone(phoneNumber);
    showToast(isSignUp ? 'Account created! Proceeding to document verification.' : 'Welcome back! Please verify your documents.', 'success');
    router.push('/(auth)/document-auth' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.subtitle}>
              {isSignUp ? 'Register to start delivering with FEAzTO' : 'Log in to your rider account'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <InputField
              label="Phone Number"
              placeholder="Enter 10-digit phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              leftIcon={<Ionicons name="call-outline" size={18} color="#6B7280" />}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color="#6B7280" />}
            />

            <PrimaryButton
              title={isSignUp ? 'Sign Up' : 'Login'}
              onPress={handleLogin}
              style={styles.loginBtn}
            />

            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              style={styles.switchRow}
            >
              <Text style={styles.switchText}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text style={styles.switchLink}>{isSignUp ? 'Login' : 'Sign Up'}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Illustration at bottom matching reference diagram */}
          <View style={styles.illustrationWrapper}>
            <ScooterRiderIllustration size={130} />
            <Text style={styles.captionText}>
              Rider can login using phone number or sign up for a new account.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginVertical: 12,
  },
  title: {
    ...typography.h2,
    fontSize: 24,
    color: '#111827',
    fontWeight: '800',
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  loginBtn: {
    width: '100%',
    marginTop: 6,
  },
  switchRow: {
    alignItems: 'center',
    marginTop: 6,
    paddingVertical: 4,
  },
  switchText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontSize: 13,
  },
  switchLink: {
    color: '#B45309',
    fontWeight: '700',
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
});
