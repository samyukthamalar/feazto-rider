/**
 * FEAzTO Rider - Onboarding: Review & Submission
 * Source of truth: FEAzTO Rider Master Prompt Section 14
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/common/Card';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';
import { useRiderStore } from '../../src/store/riderStore';
import { useUIStore } from '../../src/store/uiStore';

export default function ReviewScreen() {
  const router = useRouter();
  const profile = useRiderStore((state) => state.profile);
  const setRiderVerification = useRiderStore((state) => state.setVerificationStatus);
  const setAuthVerification = useAuthStore((state) => state.setVerificationStatus);
  const setIsOnboarded = useAuthStore((state) => state.setIsOnboarded);
  const showToast = useUIStore((state) => state.showToast);

  const handleSubmitApproved = () => {
    setRiderVerification('APPROVED');
    setAuthVerification('APPROVED');
    setIsOnboarded(true);
    showToast('Onboarding approved! Welcome to FEAzTO Rider.', 'success');
    router.replace('/(tabs)');
  };

  const handleSubmitPending = () => {
    setRiderVerification('PENDING');
    setAuthVerification('PENDING');
    setIsOnboarded(true);
    showToast('Application submitted for operations hub review.', 'info');
    router.replace('/(auth)/verification-status');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Final Profile Review" showBack showStatusBadge={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Audit Your Credentials</Text>
        <Text style={styles.subtitle}>
          Ensure all submitted identity, driving licence, vehicle fitness, and payout bank records are accurate before final clearance.
        </Text>

        {/* 1. Personal Identity */}
        <Card style={styles.reviewCard}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWithPill}>
              <Text style={styles.cardTitle}>1. Personal Identity</Text>
              <Pill label="Ready" tone="green" />
            </View>
            <TouchableOpacity onPress={() => router.push('/(onboarding)/personal-details')}>
              <Text style={styles.editLink}>Edit ✎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.val}>{profile.personalDetails.fullName}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.val}>{profile.personalDetails.dateOfBirth}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Residential Address:</Text>
            <Text style={styles.val}>{profile.personalDetails.address}, {profile.personalDetails.city}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Emergency Contact:</Text>
            <Text style={styles.val}>
              {profile.personalDetails.emergencyContact.name} ({profile.personalDetails.emergencyContact.relationship}) • {profile.personalDetails.emergencyContact.phone}
            </Text>
          </View>
        </Card>

        {/* 2. Driving Licence */}
        <Card style={styles.reviewCard}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWithPill}>
              <Text style={styles.cardTitle}>2. Driving Licence</Text>
              <Pill label="Attached" tone="green" />
            </View>
            <TouchableOpacity onPress={() => router.push('/(onboarding)/licence')}>
              <Text style={styles.editLink}>Edit ✎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>DL Number:</Text>
            <Text style={styles.val}>{profile.licenceDetails.licenceNumber}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.val}>{profile.licenceDetails.licenceType} (Commercial Two-Wheeler)</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Validity:</Text>
            <Text style={styles.val}>{profile.licenceDetails.expiryDate}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Attached Copies:</Text>
            <Text style={styles.val}>Front Scan ✓ & Back Scan ✓</Text>
          </View>
        </Card>

        {/* 3. Vehicle Information */}
        <Card style={styles.reviewCard}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWithPill}>
              <Text style={styles.cardTitle}>3. Delivery Vehicle</Text>
              <Pill label="EV Green" tone="green" />
            </View>
            <TouchableOpacity onPress={() => router.push('/(onboarding)/vehicle')}>
              <Text style={styles.editLink}>Edit ✎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Vehicle Type:</Text>
            <Text style={styles.val}>{profile.vehicleDetails.vehicleType}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.val}>{profile.vehicleDetails.model}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Number Plate:</Text>
            <Text style={styles.val}>{profile.vehicleDetails.registrationNumber}</Text>
          </View>
        </Card>

        {/* 4. Compliance Documents */}
        <Card style={styles.reviewCard}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWithPill}>
              <Text style={styles.cardTitle}>4. Vehicle Compliance</Text>
              <Pill label="3 of 3 Docs" tone="green" />
            </View>
            <TouchableOpacity onPress={() => router.push('/(onboarding)/documents')}>
              <Text style={styles.editLink}>Edit ✎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Registration Certificate (RC):</Text>
            <Text style={styles.val}>{profile.documents.rcUploaded ? 'Attached ✓' : 'Pending'}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Commercial Insurance:</Text>
            <Text style={styles.val}>{profile.documents.insuranceUploaded ? 'Active Policy Attached ✓' : 'Pending'}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Pollution (PUC):</Text>
            <Text style={styles.val}>{profile.documents.pucUploaded ? 'Valid Certificate Attached ✓' : 'Exempt (EV)'}</Text>
          </View>
        </Card>

        {/* 5. Bank & UPI Payout */}
        <Card style={styles.reviewCard}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWithPill}>
              <Text style={styles.cardTitle}>5. Settlement Account</Text>
              <Pill label="Direct Deposit" tone="green" />
            </View>
            <TouchableOpacity onPress={() => router.push('/(onboarding)/bank-upi')}>
              <Text style={styles.editLink}>Edit ✎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Account Holder:</Text>
            <Text style={styles.val}>{profile.bankDetails.accountHolderName}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.val}>{profile.bankDetails.accountNumber}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>IFSC Code:</Text>
            <Text style={styles.val}>{profile.bankDetails.ifscCode}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Instant UPI Handle:</Text>
            <Text style={styles.val}>{profile.bankDetails.upiId}</Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <PrimaryButton
            title="Complete & Launch Operations (Instant Demo Approval)"
            onPress={handleSubmitApproved}
            style={styles.mainBtn}
          />

          <SecondaryButton
            title="Submit for Standard Hub Review (Simulate Pending)"
            onPress={handleSubmitPending}
            variant="surface"
            style={styles.secondaryBtn}
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
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  reviewCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleWithPill: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    flex: 1,
    marginRight: spacing.sm,
  },
  cardTitle: {
    ...typography.subtitle1,
    color: colors.brandYellow,
  },
  editLink: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  val: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  actionContainer: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  mainBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
});
