/**
 * FEAzTO Rider - Onboarding: Vehicle Documents (RC, Insurance, PUC)
 * Source of truth: FEAzTO Rider Master Prompt Section 14
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DocumentCard } from '../../src/components/common/DocumentCard';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { ProgressBar } from '../../src/components/common/ProgressBar';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useRiderStore } from '../../src/store/riderStore';
import { useUIStore } from '../../src/store/uiStore';

export default function DocumentsScreen() {
  const router = useRouter();
  const profile = useRiderStore((state) => state.profile);
  const updateProfile = useRiderStore((state) => state.updateProfile);
  const showToast = useUIStore((state) => state.showToast);

  const [rcUploaded, setRcUploaded] = useState(profile.documents.rcUploaded);
  const [insuranceUploaded, setInsuranceUploaded] = useState(profile.documents.insuranceUploaded);
  const [pucUploaded, setPucUploaded] = useState(profile.documents.pucUploaded);

  const handleNext = () => {
    updateProfile({
      documents: {
        rcUploaded,
        insuranceUploaded,
        pucUploaded,
      },
    });
    showToast('Compliance records attached', 'success');
    router.push('/(onboarding)/bank-upi');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Vehicle Documents (4/5)" showBack showStatusBadge={false} />
      <ProgressBar progress={4} total={5} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Vehicle Compliance Records</Text>
        <Text style={styles.subtitle}>
          Ensure valid Registration Certificate (RC), commercial vehicle insurance, and pollution fitness (PUC) are submitted for insurance liability coverage.
        </Text>

        <View style={styles.list}>
          {/* RC Document */}
          <DocumentCard
            title="Vehicle RC (Registration Card)"
            subtitle="Original smart card or DigiLocker / mParivahan verified PDF"
            isUploaded={rcUploaded}
            onToggleUpload={() => {
              setRcUploaded(!rcUploaded);
              showToast(!rcUploaded ? 'RC attached' : 'RC removed', 'info');
            }}
            documentNumber={profile.vehicleDetails.registrationNumber}
            required
          />

          {/* Insurance Policy */}
          <DocumentCard
            title="Active Vehicle Insurance Policy"
            subtitle="Comprehensive or Third Party cover (ICICI Lombard / Digit / HDFC ERGO)"
            isUploaded={insuranceUploaded}
            onToggleUpload={() => {
              setInsuranceUploaded(!insuranceUploaded);
              showToast(!insuranceUploaded ? 'Insurance attached' : 'Insurance removed', 'info');
            }}
            documentNumber="POL-890214-2026"
            required
          />

          {/* PUC Certificate */}
          <DocumentCard
            title="Pollution Under Control (PUC)"
            subtitle="Mandatory for petrol two-wheelers (Exempt for electric EV scooters)"
            isUploaded={pucUploaded}
            onToggleUpload={() => {
              setPucUploaded(!pucUploaded);
              showToast(!pucUploaded ? 'PUC certificate attached' : 'PUC removed', 'info');
            }}
            documentNumber="PUC-TN-2026-784"
            required={profile.vehicleDetails.vehicleType !== 'EV_SCOOTER'}
          />

          {/* Prototype note */}
          <View style={styles.noticeBox}>
            <Text style={styles.noticeTitle}>📋 Compliance Prototype Notice</Text>
            <Text style={styles.noticeText}>
              In development mode, document image verification is mocked with deterministic validation rules. You may toggle attachment states freely to test onboarding paths.
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <SecondaryButton
              title="← Back"
              onPress={() => router.back()}
              variant="outline"
              style={styles.backBtn}
            />
            <PrimaryButton
              title="Next: Bank & UPI →"
              onPress={handleNext}
              style={styles.nextBtn}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  list: {
    gap: spacing.sm,
  },
  noticeBox: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  noticeTitle: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
    marginBottom: 2,
  },
  noticeText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  backBtn: {
    flex: 1,
  },
  nextBtn: {
    flex: 2,
  },
});
