/**
 * FEAzTO Rider - Onboarding: Driving Licence
 * Source of truth: FEAzTO Rider Master Prompt Section 14
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/common/Card';
import { InputField } from '../../src/components/common/InputField';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { ProgressBar } from '../../src/components/common/ProgressBar';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { borderRadius, spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useRiderStore } from '../../src/store/riderStore';
import { useUIStore } from '../../src/store/uiStore';
import { LicenceType } from '../../src/types/rider';

export default function LicenceScreen() {
  const router = useRouter();
  const profile = useRiderStore((state) => state.profile);
  const updateProfile = useRiderStore((state) => state.updateProfile);
  const showToast = useUIStore((state) => state.showToast);

  const [licenceNumber, setLicenceNumber] = useState(profile.licenceDetails.licenceNumber);
  const [licenceType, setLicenceType] = useState<LicenceType>(profile.licenceDetails.licenceType);
  const [expiryDate, setExpiryDate] = useState(profile.licenceDetails.expiryDate);
  const [frontUploaded, setFrontUploaded] = useState(profile.licenceDetails.frontUploaded);
  const [backUploaded, setBackUploaded] = useState(profile.licenceDetails.backUploaded);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!licenceNumber.trim()) {
      setError('Driving licence number is required.');
      return;
    }
    if (!frontUploaded || !backUploaded) {
      setError('Both front and back licence copies must be attached.');
      return;
    }
    setError('');

    updateProfile({
      licenceDetails: {
        licenceNumber,
        licenceType,
        expiryDate,
        frontUploaded,
        backUploaded,
      },
    });
    showToast('Driving licence saved', 'success');
    router.push('/(onboarding)/vehicle');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Driving Licence (2/5)" showBack showStatusBadge={false} />
      <ProgressBar progress={2} total={5} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Driving Licence Validation</Text>
        <Text style={styles.subtitle}>
          A valid Indian commercial or transport/private two-wheeler driving licence is required for delivery operations.
        </Text>

        <View style={styles.form}>
          <InputField
            label="DL Registration Number"
            value={licenceNumber}
            onChangeText={(text) => {
              setLicenceNumber(text);
              if (error) setError('');
            }}
            placeholder="TN-05-2018-0098412"
            autoCapitalize="characters"
            helper="16-character Parivahan DL format"
          />

          <Text style={styles.fieldLabel}>Licence Category</Text>
          <View style={styles.chipsRow}>
            {[
              { type: 'MCWG' as LicenceType, desc: 'Motorcycle with Gear' },
              { type: 'LMV' as LicenceType, desc: 'Light Motor Vehicle' },
              { type: 'MCWOG' as LicenceType, desc: 'Without Gear (Scooter)' },
            ].map((item) => (
              <TouchableOpacity
                key={item.type}
                style={[styles.chip, licenceType === item.type && styles.chipActive]}
                onPress={() => setLicenceType(item.type)}
              >
                <Text style={[styles.chipText, licenceType === item.type && styles.chipTextActive]}>
                  {item.type}
                </Text>
                <Text style={[styles.chipSub, licenceType === item.type && styles.chipSubActive]}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputField
            label="Licence Validity Expiry Date"
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="YYYY-MM-DD"
            helper="Must have at least 6 months validity remaining"
          />

          <Text style={styles.fieldLabel}>Required Document Photos (Simulated Upload)</Text>

          {/* Front Side Upload Card */}
          <Card style={styles.uploadCard} variant={frontUploaded ? 'highlight' : 'surface'}>
            <View style={styles.uploadRow}>
              <View style={styles.docIconBox}>
                <Text style={styles.docIcon}>{frontUploaded ? '🪪' : '📷'}</Text>
              </View>

              <View style={styles.uploadInfo}>
                <Text style={styles.uploadTitle}>Front Side of Driving Licence</Text>
                <Text style={styles.uploadSubtitle}>
                  {frontUploaded
                    ? 'dl_front_scan_TN05.jpg (1.4 MB) • Clear & verified'
                    : 'Photo showing full name, DL #, and portrait photo'}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setFrontUploaded(!frontUploaded);
                  showToast(!frontUploaded ? 'Front licence attached' : 'Front copy detached', 'info');
                }}
              >
                <Pill
                  label={frontUploaded ? 'Attached ✓' : 'Upload +'}
                  tone={frontUploaded ? 'green' : 'yellow'}
                />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Back Side Upload Card */}
          <Card style={styles.uploadCard} variant={backUploaded ? 'highlight' : 'surface'}>
            <View style={styles.uploadRow}>
              <View style={styles.docIconBox}>
                <Text style={styles.docIcon}>{backUploaded ? '🪪' : '📷'}</Text>
              </View>

              <View style={styles.uploadInfo}>
                <Text style={styles.uploadTitle}>Back Side of Driving Licence</Text>
                <Text style={styles.uploadSubtitle}>
                  {backUploaded
                    ? 'dl_back_scan_TN05.jpg (1.2 MB) • Clear & verified'
                    : 'Photo showing vehicle authorization badges & address'}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setBackUploaded(!backUploaded);
                  showToast(!backUploaded ? 'Back licence attached' : 'Back copy detached', 'info');
                }}
              >
                <Pill
                  label={backUploaded ? 'Attached ✓' : 'Upload +'}
                  tone={backUploaded ? 'green' : 'yellow'}
                />
              </TouchableOpacity>
            </View>
          </Card>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          {/* Prototype realism notice */}
          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              ℹ️ Prototype Mode: Government Parivahan verification API is mocked for rapid development. Tap pills above to simulate file selection.
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
              title="Next: Vehicle →"
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
  form: {
    width: '100%',
  },
  fieldLabel: {
    ...typography.subtitle2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  chipsRow: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
  },
  chipText: {
    ...typography.subtitle2,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.brandYellow,
  },
  chipSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 10,
  },
  chipSubActive: {
    color: colors.textPrimary,
  },
  uploadCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  docIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.secondarySurface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docIcon: {
    fontSize: 20,
  },
  uploadInfo: {
    flex: 1,
  },
  uploadTitle: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  uploadSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    fontSize: 11,
  },
  errorBox: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '600',
  },
  noticeBox: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.sm + 2,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  noticeText: {
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
