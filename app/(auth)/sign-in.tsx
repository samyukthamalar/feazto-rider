/**
 * FEAzTO Rider - Sign In Screen
 * Source of truth: FEAzTO Rider Master Prompt Section 13
 */

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
import { FEAztoLogo } from '../../src/components/brand/FEAztoLogo';
import { Card } from '../../src/components/common/Card';
import { InputField } from '../../src/components/common/InputField';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';
import { useUIStore } from '../../src/store/uiStore';

export default function SignInScreen() {
  const router = useRouter();
  const phone = useAuthStore((state) => state.phone);
  const setPhone = useAuthStore((state) => state.setPhone);
  const sendOtp = useAuthStore((state) => state.sendOtp);
  const isVerifying = useAuthStore((state) => state.isVerifying);
  const showToast = useUIStore((state) => state.showToast);

  const [inputPhone, setInputPhone] = useState(phone || '9876543210');
  const [error, setError] = useState('');

  const handleContinue = async () => {
    const cleanNumber = inputPhone.replace(/\D/g, '');
    if (cleanNumber.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    setPhone(cleanNumber);
    await sendOtp(cleanNumber);
    showToast('Prototype: 4-digit code dispatched to screen', 'info');
    router.push('/(auth)/otp');
  };

  const handleQuickDemoFill = (number: string) => {
    setInputPhone(number);
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Brand */}
          <View style={styles.header}>
            <FEAztoLogo size="lg" showRiderBadge />
            <Text style={styles.title}>Rider Partner Portal</Text>
            <Text style={styles.subtitle}>
              Sign in with your registered mobile number to access active delivery slots, routes, and earnings.
            </Text>
          </View>

          {/* Form */}
          <Card style={styles.card} variant="surface">
            <InputField
              label="Registered Mobile Number"
              placeholder="98765 43210"
              keyboardType="phone-pad"
              maxLength={10}
              value={inputPhone}
              onChangeText={(text) => {
                setInputPhone(text);
                if (error) setError('');
              }}
              error={error}
              clearable
              onClear={() => setInputPhone('')}
              leftIcon={<Text style={styles.countryCode}>🇮🇳 +91</Text>}
              helper="A 4-digit verification code will be simulated"
            />

            {/* Demo quick fill chips */}
            <View style={styles.quickFillRow}>
              <Text style={styles.quickFillLabel}>Demo Numbers:</Text>
              <TouchableOpacity onPress={() => handleQuickDemoFill('9876543210')}>
                <Pill label="98765 43210 (Karthik)" tone="yellow" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleQuickDemoFill('9840198765')}>
                <Pill label="98401 98765" tone="neutral" />
              </TouchableOpacity>
            </View>

            <PrimaryButton
              title="Get Verification Code →"
              onPress={handleContinue}
              loading={isVerifying}
              style={styles.submitBtn}
            />
          </Card>

          {/* Realistic prototype disclaimer banner as required in Section 13 */}
          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerTitle}>🔒 Prototype Operational Notice</Text>
            <Text style={styles.disclaimerText}>
              In prototype mode, real SMS delivery is not faked. The service abstraction uses deterministic mock verification (PIN: 1234) ready for future backend integration.
            </Text>
          </View>

          {/* Fast Bypass for quick review */}
          <SecondaryButton
            title="Skip to Operations Hub (Demo)"
            onPress={() => router.replace('/(tabs)')}
            variant="ghost"
            style={styles.skipBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    maxWidth: 320,
    lineHeight: 20,
  },
  card: {
    padding: spacing.lg,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brandYellow,
    marginRight: 6,
  },
  quickFillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  quickFillLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
  },
  submitBtn: {
    marginTop: spacing.xs,
  },
  disclaimerBox: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  disclaimerTitle: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
    marginBottom: 4,
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  skipBtn: {
    marginTop: spacing.md,
  },
});
