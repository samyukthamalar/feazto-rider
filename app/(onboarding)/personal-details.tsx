/**
 * FEAzTO Rider - Onboarding: Personal Details
 * Source of truth: FEAzTO Rider Master Prompt Section 14
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
import { InputField } from '../../src/components/common/InputField';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { ProgressBar } from '../../src/components/common/ProgressBar';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { borderRadius, spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useRiderStore } from '../../src/store/riderStore';
import { useUIStore } from '../../src/store/uiStore';

const relationships = ['Spouse', 'Parent', 'Sibling', 'Other'];

export default function PersonalDetailsScreen() {
  const router = useRouter();
  const profile = useRiderStore((state) => state.profile);
  const updateProfile = useRiderStore((state) => state.updateProfile);
  const showToast = useUIStore((state) => state.showToast);

  const [fullName, setFullName] = useState(profile.personalDetails.fullName);
  const [dob, setDob] = useState(profile.personalDetails.dateOfBirth);
  const [address, setAddress] = useState(profile.personalDetails.address);
  const [city, setCity] = useState(profile.personalDetails.city);
  const [hasPhoto, setHasPhoto] = useState(true);
  const [emergencyName, setEmergencyName] = useState(profile.personalDetails.emergencyContact.name);
  const [emergencyRelation, setEmergencyRelation] = useState(profile.personalDetails.emergencyContact.relationship || 'Spouse');
  const [emergencyPhone, setEmergencyPhone] = useState(profile.personalDetails.emergencyContact.phone);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!dob.trim()) errs.dob = 'Date of birth is required';
    if (!address.trim()) errs.address = 'Residential address is required';
    if (!emergencyName.trim()) errs.emergencyName = 'Emergency contact name is required';
    if (emergencyPhone.replace(/\D/g, '').length < 10) {
      errs.emergencyPhone = '10-digit emergency phone required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) {
      showToast('Please complete required personal details.', 'warning');
      return;
    }

    updateProfile({
      personalDetails: {
        fullName,
        phone: profile.personalDetails.phone,
        dateOfBirth: dob,
        address,
        city,
        emergencyContact: {
          name: emergencyName,
          relationship: emergencyRelation,
          phone: emergencyPhone,
        },
      },
    });
    router.push('/(onboarding)/licence');
  };

  const handleTogglePhoto = () => {
    setHasPhoto(!hasPhoto);
    showToast(!hasPhoto ? 'Profile photo attached' : 'Photo removed', 'info');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Personal Details (1/5)" showBack showStatusBadge={false} />
      <ProgressBar progress={1} total={5} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Rider Identity & Contact</Text>
          <Text style={styles.subtitle}>
            Please provide your legal name, selfie profile photo, and emergency contact details for shift safety coverage.
          </Text>

          {/* Profile Photo Placeholder (Section 14 requirement) */}
          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={handleTogglePhoto} style={styles.photoCircle}>
              {hasPhoto ? (
                <View style={styles.photoFilled}>
                  <Text style={styles.photoInitials}>
                    {fullName ? fullName.slice(0, 2).toUpperCase() : 'KR'}
                  </Text>
                  <View style={styles.photoEditBadge}>
                    <Text style={styles.editIcon}>📷</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.cameraIcon}>📷</Text>
                  <Text style={styles.photoHint}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.photoInfo}>
              <Text style={styles.photoHeading}>Driver Partner Profile Picture</Text>
              <Text style={styles.photoNotice}>
                Clear front-facing photo without sunglasses or cap. Visible to kitchens and customers during active deliveries.
              </Text>
              <Pill label={hasPhoto ? 'Photo Ready ✓' : 'Upload Required'} tone={hasPhoto ? 'green' : 'yellow'} />
            </View>
          </View>

          <View style={styles.form}>
            <InputField
              label="Full Legal Name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              placeholder="e.g. Karthik Ramanathan"
              error={errors.fullName}
              helper="Must match PAN / Driving Licence"
            />

            <InputField
              label="Date of Birth"
              value={dob}
              onChangeText={(text) => {
                setDob(text);
                if (errors.dob) setErrors({ ...errors, dob: '' });
              }}
              placeholder="1996-08-14"
              error={errors.dob}
              helper="Minimum age requirement: 18 years"
            />

            <InputField
              label="Residential Address"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              placeholder="14/B, 2nd Main, Anna Nagar"
              error={errors.address}
            />

            <InputField
              label="City / Hub Operations Zone"
              value={city}
              onChangeText={setCity}
              placeholder="Chennai"
            />

            {/* Mandatory Emergency Contact Section */}
            <View style={styles.emergencyHeader}>
              <Text style={styles.emergencyTitle}>🚨 Emergency Contact (Mandatory Safety Rule)</Text>
              <Text style={styles.emergencySubtitle}>
                Dialed automatically if an SOS trigger or roadside incident occurs during an active delivery shift.
              </Text>
            </View>

            <InputField
              label="Contact Person's Name"
              value={emergencyName}
              onChangeText={(text) => {
                setEmergencyName(text);
                if (errors.emergencyName) setErrors({ ...errors, emergencyName: '' });
              }}
              placeholder="e.g. Priya Ramanathan"
              error={errors.emergencyName}
            />

            <Text style={styles.relationLabel}>Relationship</Text>
            <View style={styles.relationRow}>
              {relationships.map((rel) => (
                <TouchableOpacity
                  key={rel}
                  style={[styles.relChip, emergencyRelation === rel && styles.relChipActive]}
                  onPress={() => setEmergencyRelation(rel)}
                >
                  <Text style={[styles.relText, emergencyRelation === rel && styles.relTextActive]}>
                    {rel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <InputField
              label="Emergency Phone Number"
              value={emergencyPhone}
              onChangeText={(text) => {
                setEmergencyPhone(text);
                if (errors.emergencyPhone) setErrors({ ...errors, emergencyPhone: '' });
              }}
              placeholder="+91 98765 11223"
              keyboardType="phone-pad"
              maxLength={14}
              error={errors.emergencyPhone}
            />

            <PrimaryButton
              title="Next: Driving Licence →"
              onPress={handleNext}
              style={styles.nextBtn}
            />
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
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  photoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.secondarySurface,
    borderColor: colors.brandYellow,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  photoFilled: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
    backgroundColor: colors.brandYellowSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoInitials: {
    ...typography.h2,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  photoEditBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 12,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 24,
  },
  photoHint: {
    ...typography.caption,
    color: colors.brandYellow,
    fontSize: 9,
    marginTop: 2,
  },
  photoInfo: {
    flex: 1,
    gap: 4,
  },
  photoHeading: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  photoNotice: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  form: {
    width: '100%',
  },
  emergencyHeader: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: borderRadius.md,
  },
  emergencyTitle: {
    ...typography.subtitle2,
    color: colors.danger,
    fontWeight: '700',
  },
  emergencySubtitle: {
    ...typography.caption,
    color: colors.textPrimary,
    marginTop: 2,
    lineHeight: 16,
  },
  relationLabel: {
    ...typography.subtitle2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  relationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  relChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  relChipActive: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
  },
  relText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  relTextActive: {
    color: colors.brandYellow,
    fontWeight: '700',
  },
  nextBtn: {
    marginTop: spacing.lg,
  },
});
