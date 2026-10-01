/**
 * FEAzTO Rider - OTP Verification Screen
 * Source of truth: FEAzTO Rider Master Prompt Section 13
 */

import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/common/Card';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { borderRadius, spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';
import { useUIStore } from '../../src/store/uiStore';
import { registrationService } from '../../services/registrationService';


export default function OtpScreen() {
  const router = useRouter();
  const phone = useAuthStore((state) => state.phone);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const resendOtp = useAuthStore((state) => state.resendOtp);
  const isVerifying = useAuthStore((state) => state.isVerifying);
  const showToast = useUIStore((state) => state.showToast);

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRef = useRef<TextInput>(null);

  // Resend countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (codeToVerify?: string) => {
    const code = codeToVerify || otp;
    if (code.length < 4) {
      setError('Please enter the full 4-digit verification code.');
      return;
    }
    setError('');

    const result = await verifyOtp(code);
    if (result.success) {
      await registrationService.markOtpVerified();
      showToast('Mobile number verified ✓ Proceeding to Document Authentication.', 'success');
      router.replace('/(auth)/document-auth' as any);
    } else {
      setError(result.error || 'Verification failed. Try entering 1234 for demo.');
    }
  };


  const handleResend = async () => {
    if (timer > 0) return;
    await resendOtp();
    setTimer(30);
    showToast('New verification code simulated.', 'info');
  };

  const handleQuickFill = (code: string) => {
    setOtp(code);
    setError('');
    handleVerify(code);
  };

  // Digits array for visual pin representation
  const digits = [0, 1, 2, 3].map((index) => otp[index] || '');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Identity Verification" showBack showStatusBadge={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Enter 4-Digit PIN</Text>
            <Text style={styles.subtitle}>
              Code dispatched to +91 {phone || '98765 43210'}
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.changeNumberText}>Edit Phone Number</Text>
            </TouchableOpacity>
          </View>

          {/* Hidden real input, overlaid with styled pin boxes */}
          <Card style={styles.pinCard} variant="surface">
            <Pressable
              style={styles.boxesRow}
              onPress={() => inputRef.current?.focus()}
            >
              {digits.map((digit, i) => {
                const isCurrent = i === otp.length;
                return (
                  <View
                    key={i}
                    style={[
                      styles.digitBox,
                      digit ? styles.digitBoxFilled : null,
                      isCurrent && styles.digitBoxActive,
                      Boolean(error) && styles.digitBoxError,
                    ]}
                  >
                    <Text style={styles.digitText}>{digit}</Text>
                  </View>
                );
              })}
            </Pressable>

            <TextInput
              ref={inputRef}
              value={otp}
              onChangeText={(text) => {
                const clean = text.replace(/\D/g, '').slice(0, 4);
                setOtp(clean);
                if (error) setError('');
                if (clean.length === 4) {
                  handleVerify(clean);
                }
              }}
              keyboardType="number-pad"
              maxLength={4}
              style={styles.hiddenInput}
              autoFocus
            />

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : null}

            {/* Quick test pills */}
            <View style={styles.testPillsRow}>
              <Text style={styles.testPillsLabel}>Quick Test:</Text>
              <TouchableOpacity onPress={() => handleQuickFill('1234')}>
                <Pill label="PIN: 1234 (Valid)" tone="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleQuickFill('9999')}>
                <Pill label="PIN: 9999 (Valid)" tone="yellow" />
              </TouchableOpacity>
            </View>

            {/* Verify CTA */}
            <PrimaryButton
              title="Verify & Enter Account →"
              onPress={() => handleVerify()}
              loading={isVerifying}
              style={styles.verifyBtn}
            />

            {/* Resend timer */}
            <View style={styles.resendRow}>
              {timer > 0 ? (
                <Text style={styles.timerText}>
                  Resend code in <Text style={styles.timerHighlight}>{timer}s</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={styles.resendActionText}>Resend Verification Code</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>

          {/* Prototype note */}
          <View style={styles.protoNote}>
            <Text style={styles.protoText}>
              ℹ️ Prototype Mode: Deterministic verification service in place. No real SMS telecom gateway is invoked.
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
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  changeNumberText: {
    ...typography.caption,
    color: colors.brandYellow,
    marginTop: spacing.xs,
    fontWeight: '700',
  },
  pinCard: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  boxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.md,
    maxWidth: '100%',
  },
  digitBox: {
    width: 52,
    minWidth: 44,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondarySurface,
    borderColor: colors.border,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitBoxFilled: {
    borderColor: colors.brandYellow,
    backgroundColor: colors.brandYellowSoft,
  },
  digitBoxActive: {
    borderColor: colors.brandYellow,
  },
  digitBoxError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  digitText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  errorBox: {
    marginTop: spacing.sm,
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '600',
  },
  testPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  testPillsLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  verifyBtn: {
    width: '100%',
    marginTop: spacing.md,
  },
  resendRow: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  timerText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  timerHighlight: {
    color: colors.brandYellow,
    fontWeight: '700',
  },
  resendActionText: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
  },
  protoNote: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: 8,
  },
  protoText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
