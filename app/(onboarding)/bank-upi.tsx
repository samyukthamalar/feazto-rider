/**
 * FEAzTO Rider - Onboarding: Bank & UPI Payout Details
 * Source of truth: FEAzTO Rider Master Prompt Section 14 & 28
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
import { Card } from '../../src/components/common/Card';
import { InputField } from '../../src/components/common/InputField';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { ProgressBar } from '../../src/components/common/ProgressBar';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useRiderStore } from '../../src/store/riderStore';
import { useUIStore } from '../../src/store/uiStore';

export default function BankUpiScreen() {
  const router = useRouter();
  const profile = useRiderStore((state) => state.profile);
  const updateProfile = useRiderStore((state) => state.updateProfile);
  const showToast = useUIStore((state) => state.showToast);

  const [holderName, setHolderName] = useState(profile.bankDetails.accountHolderName);
  const [accountNumber, setAccountNumber] = useState(profile.bankDetails.accountNumber.replace(/[^0-9]/g, '') || '501004829104');
  const [ifsc, setIfsc] = useState(profile.bankDetails.ifscCode || 'HDFC0001842');
  const [upiId, setUpiId] = useState(profile.bankDetails.upiId || 'karthik@okhdfcbank');
  const [error, setError] = useState('');

  const getBranchName = (code: string) => {
    if (code.toUpperCase().startsWith('HDFC')) return 'HDFC Bank — Anna Nagar Roundtana Branch';
    if (code.toUpperCase().startsWith('SBIN')) return 'State Bank of India — Chennai Main Branch';
    if (code.toUpperCase().startsWith('ICIC')) return 'ICICI Bank — Shenoy Nagar Branch';
    return 'Nationalized Bank Node Verified ✓';
  };

  const handleNext = () => {
    if (!holderName.trim()) {
      setError('Account holder name is required.');
      return;
    }
    if (accountNumber.length < 9) {
      setError('Please enter a valid bank account number.');
      return;
    }
    if (ifsc.length < 11) {
      setError('11-character IFSC code required (e.g. HDFC0001842).');
      return;
    }
    if (!upiId.includes('@')) {
      setError('Please provide a valid UPI handle (e.g. name@bank).');
      return;
    }
    setError('');

    updateProfile({
      bankDetails: {
        accountHolderName: holderName,
        accountNumber: `••••••••${accountNumber.slice(-4)}`,
        ifscCode: ifsc.toUpperCase(),
        upiId: upiId.toLowerCase(),
      },
    });
    showToast('Payout account configured', 'success');
    router.push('/(onboarding)/review');
  };

  const handleQuickDemoBank = () => {
    setHolderName('Karthik Ramanathan');
    setAccountNumber('501004829104');
    setIfsc('HDFC0001842');
    setUpiId('karthik@okhdfcbank');
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Bank & UPI (5/5)" showBack showStatusBadge={false} />
      <ProgressBar progress={5} total={5} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Earnings Settlement Account</Text>
          <Text style={styles.subtitle}>
            Direct deposits for delivery fees, rain bonuses, peak surge earnings, and festival incentives will be transferred here.
          </Text>

          {/* Quick Preset Chip */}
          <View style={styles.presetRow}>
            <Text style={styles.presetLabel}>Demo Data:</Text>
            <TouchableOpacity onPress={handleQuickDemoBank}>
              <Pill label="Use Verified HDFC + UPI Account" tone="yellow" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <InputField
              label="Account Holder Name"
              value={holderName}
              onChangeText={(text) => {
                setHolderName(text);
                if (error) setError('');
              }}
              placeholder="Name matching bank passbook"
              helper="Must match PAN / KYC identity"
            />

            <InputField
              label="Bank Account Number"
              value={accountNumber}
              onChangeText={(text) => {
                setAccountNumber(text);
                if (error) setError('');
              }}
              placeholder="501004829104"
              keyboardType="number-pad"
            />

            <InputField
              label="IFSC Code"
              value={ifsc}
              onChangeText={(text) => {
                setIfsc(text);
                if (error) setError('');
              }}
              placeholder="HDFC0001842"
              autoCapitalize="characters"
              maxLength={11}
              helper={ifsc.length >= 4 ? getBranchName(ifsc) : '11-character code on bank cheque'}
            />

            <InputField
              label="Primary UPI ID (for instant shift cashout)"
              value={upiId}
              onChangeText={(text) => {
                setUpiId(text);
                if (error) setError('');
              }}
              placeholder="karthik@okhdfcbank"
              autoCapitalize="none"
              helper="Enables instant transfer to your phone upon shift completion"
            />

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : null}

            {/* Direct deposit terms */}
            <Card style={styles.securityCard}>
              <Text style={styles.secTitle}>🔒 Direct Deposit Terms & Payout Rule</Text>
              <Text style={styles.secText}>
                FEAzTO settlements execute daily at 23:59. Instant cashout is available at zero fee after delivering 3 consecutive completed orders.
              </Text>
            </Card>

            <View style={styles.actionsRow}>
              <SecondaryButton
                title="← Back"
                onPress={() => router.back()}
                variant="outline"
                style={styles.backBtn}
              />
              <PrimaryButton
                title="Review Profile →"
                onPress={handleNext}
                style={styles.nextBtn}
              />
            </View>
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
    padding: spacing.lg,
    paddingBottom: spacing.massive,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  presetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  presetLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  errorBox: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '600',
  },
  securityCard: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  secTitle: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
    marginBottom: 4,
  },
  secText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  backBtn: {
    flex: 1,
  },
  nextBtn: {
    flex: 2,
  },
});
