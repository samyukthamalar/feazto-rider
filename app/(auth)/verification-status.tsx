/**
 * FEAzTO Rider - Verification Status Screen
 * Source of truth: FEAzTO Rider Master Prompt Section 13 & 14
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/common/Card';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { StatusBadge } from '../../src/components/common/StatusBadge';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { borderRadius, spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';
import { useRiderStore } from '../../src/store/riderStore';
import { useUIStore } from '../../src/store/uiStore';
import { VerificationStatus } from '../../src/types/rider';

export default function VerificationStatusScreen() {
  const router = useRouter();
  const status = useAuthStore((state) => state.verificationStatus);
  const correctionReason = useAuthStore((state) => state.correctionReason);
  const setVerificationStatus = useAuthStore((state) => state.setVerificationStatus);
  const setRiderVerification = useRiderStore((state) => state.setVerificationStatus);
  const verifiedDocs = useAuthStore((state) => state.verifiedDocuments);
  const showToast = useUIStore((state) => state.showToast);

  const isApproved = status === 'APPROVED';
  const isNeedsCorrection = status === 'NEEDS_CORRECTION';
  const isPending = status === 'PENDING';

  const handleSwitchStatus = (newStatus: VerificationStatus) => {
    setVerificationStatus(newStatus);
    setRiderVerification(newStatus);
    showToast(`Simulated status: ${newStatus}`, 'info');
  };

  const handleProceed = () => {
    if (isApproved) {
      router.replace('/(tabs)');
    } else if (isNeedsCorrection) {
      router.push('/(onboarding)/licence');
    } else {
      // In pending, allow instant simulation approval
      handleSwitchStatus('APPROVED');
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Credential Verification" showStatusBadge={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Interactive State Simulation Bar */}
        <View style={styles.simBar}>
          <Text style={styles.simLabel}>Demo State Switcher:</Text>
          <View style={styles.simPills}>
            <TouchableOpacity onPress={() => handleSwitchStatus('APPROVED')}>
              <Pill label="APPROVED" tone={isApproved ? 'green' : 'neutral'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSwitchStatus('PENDING')}>
              <Pill label="PENDING" tone={isPending ? 'yellow' : 'neutral'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSwitchStatus('NEEDS_CORRECTION')}>
              <Pill label="NEEDS CORRECTION" tone={isNeedsCorrection ? 'danger' : 'neutral'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Hero Card */}
        <Card
          style={styles.heroCard}
          variant={isApproved ? 'highlight' : isNeedsCorrection ? 'surface' : 'surface'}
        >
          <View style={styles.badgeWrapper}>
            <StatusBadge
              label={status.replace(/_/g, ' ')}
              variant={isApproved ? 'approved' : isNeedsCorrection ? 'needs_correction' : 'pending'}
              pulse={isApproved}
            />
          </View>

          <Text style={styles.statusTitle}>
            {isApproved
              ? 'Onboarding Approved & Cleared'
              : isNeedsCorrection
              ? 'Document Correction Required'
              : 'Credentials Under Hub Review'}
          </Text>

          <Text style={styles.statusDescription}>
            {isApproved
              ? 'All government driving credentials, commercial vehicle documents, and bank payout records are verified for active delivery dispatch.'
              : isNeedsCorrection
              ? correctionReason || 'One or more submitted documents require re-upload. Please review below.'
              : 'Our operations team is validating your documents against the regional RTO portal. Estimated turnaround: 2-4 hours.'}
          </Text>

          {/* Document Verification Breakdown */}
          <View style={styles.docsList}>
            <View style={styles.docItem}>
              <Text style={styles.checkIcon}>{verifiedDocs.identity ? '✓' : '⏳'}</Text>
              <View style={styles.docInfo}>
                <Text style={styles.docTitle}>Identity & Emergency Contact</Text>
                <Text style={styles.docSubtitle}>Aadhaar & next-of-kin contact verified</Text>
              </View>
              <Pill label={verifiedDocs.identity ? 'Cleared' : 'Pending'} tone={verifiedDocs.identity ? 'green' : 'neutral'} />
            </View>

            <View style={styles.docDivider} />

            <View style={styles.docItem}>
              <Text style={[styles.checkIcon, isNeedsCorrection && styles.checkError]}>
                {isNeedsCorrection ? '⚠️' : verifiedDocs.licence ? '✓' : '⏳'}
              </Text>
              <View style={styles.docInfo}>
                <Text style={styles.docTitle}>Driving Licence (MCWG)</Text>
                <Text style={[styles.docSubtitle, isNeedsCorrection && styles.errorSub]}>
                  {isNeedsCorrection ? 'Front photo blurry. Re-upload needed.' : 'Active validity until 2035'}
                </Text>
              </View>
              <Pill
                label={isNeedsCorrection ? 'Needs Action' : 'Cleared'}
                tone={isNeedsCorrection ? 'danger' : 'green'}
              />
            </View>

            <View style={styles.docDivider} />

            <View style={styles.docItem}>
              <Text style={styles.checkIcon}>{verifiedDocs.vehicle ? '✓' : '⏳'}</Text>
              <View style={styles.docInfo}>
                <Text style={styles.docTitle}>Vehicle Compliance (RC & PUC)</Text>
                <Text style={styles.docSubtitle}>Two-wheeler EV / Petrol fitness checked</Text>
              </View>
              <Pill label={verifiedDocs.vehicle ? 'Cleared' : 'Pending'} tone={verifiedDocs.vehicle ? 'green' : 'neutral'} />
            </View>

            <View style={styles.docDivider} />

            <View style={styles.docItem}>
              <Text style={styles.checkIcon}>{verifiedDocs.bank ? '✓' : '⏳'}</Text>
              <View style={styles.docInfo}>
                <Text style={styles.docTitle}>Payout Account (Bank / UPI)</Text>
                <Text style={styles.docSubtitle}>Direct daily deposit configuration active</Text>
              </View>
              <Pill label={verifiedDocs.bank ? 'Cleared' : 'Pending'} tone={verifiedDocs.bank ? 'green' : 'neutral'} />
            </View>
          </View>
        </Card>

        {/* Primary and secondary actions */}
        <View style={styles.actions}>
          {isApproved ? (
            <PrimaryButton
              title="Enter Rider Operations Hub →"
              onPress={handleProceed}
              style={styles.mainBtn}
            />
          ) : isNeedsCorrection ? (
            <PrimaryButton
              title="Re-Upload Driving Licence →"
              onPress={handleProceed}
              variant="yellow"
              style={styles.mainBtn}
            />
          ) : (
            <PrimaryButton
              title="Simulate Immediate Hub Approval →"
              onPress={() => {
                handleSwitchStatus('APPROVED');
                router.replace('/(tabs)');
              }}
              style={styles.mainBtn}
            />
          )}

          <SecondaryButton
            title="Review All Uploaded Documents"
            onPress={() => router.push('/(onboarding)/review')}
            variant="outline"
            style={styles.reviewBtn}
          />
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
  simBar: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  simLabel: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  simPills: {
    flexDirection: 'row',
    gap: spacing.xs + 2,
    flexWrap: 'wrap',
  },
  heroCard: {
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  badgeWrapper: {
    marginBottom: spacing.sm,
  },
  statusTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  statusDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs + 2,
    lineHeight: 20,
  },
  docsList: {
    width: '100%',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkIcon: {
    color: colors.success,
    fontSize: 16,
    fontWeight: '800',
  },
  checkError: {
    color: colors.danger,
  },
  docInfo: {
    flex: 1,
  },
  docTitle: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  docSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  errorSub: {
    color: colors.danger,
  },
  docDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  actions: {
    gap: spacing.sm,
  },
  mainBtn: {
    width: '100%',
  },
  reviewBtn: {
    width: '100%',
  },
});
