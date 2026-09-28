/**
 * FEAzTO Rider - Onboarding: Vehicle Details
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
import { VehicleType } from '../../src/types/rider';

export default function VehicleScreen() {
  const router = useRouter();
  const profile = useRiderStore((state) => state.profile);
  const updateProfile = useRiderStore((state) => state.updateProfile);
  const showToast = useUIStore((state) => state.showToast);

  const [vehicleType, setVehicleType] = useState<VehicleType>(profile.vehicleDetails.vehicleType);
  const [model, setModel] = useState(profile.vehicleDetails.model);
  const [registrationNumber, setRegistrationNumber] = useState(profile.vehicleDetails.registrationNumber);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!model.trim()) {
      setError('Please provide your vehicle make and model.');
      return;
    }
    if (vehicleType !== 'BICYCLE' && !registrationNumber.trim()) {
      setError('Vehicle registration number is required for motorized vehicles.');
      return;
    }
    setError('');

    updateProfile({
      vehicleDetails: {
        vehicleType,
        model,
        registrationNumber: vehicleType === 'BICYCLE' ? 'N/A (Bicycle)' : registrationNumber,
      },
    });
    showToast('Vehicle details saved', 'success');
    router.push('/(onboarding)/documents');
  };

  const handleQuickSelect = (type: VehicleType, mod: string, reg: string) => {
    setVehicleType(type);
    setModel(mod);
    setRegistrationNumber(reg);
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Vehicle Info (3/5)" showBack showStatusBadge={false} />
      <ProgressBar progress={3} total={5} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Delivery Vehicle Selection</Text>
        <Text style={styles.subtitle}>
          Choose your delivery conveyance. Electric 2-wheelers qualify for FEAzTO Clean Green delivery surge bonuses.
        </Text>

        <View style={styles.form}>
          <Text style={styles.fieldLabel}>Vehicle Category</Text>
          <View style={styles.chipsRow}>
            {[
              {
                id: 'EV_SCOOTER' as VehicleType,
                title: '⚡ EV Scooter (Ather, Ola, TVS iQube)',
                desc: 'Eligible for +₹5/order FEAzTO Green Surge bonus',
                badge: 'Recommended',
              },
              {
                id: 'PETROL_BIKE' as VehicleType,
                title: '🛵 Petrol Motorcycle / Scooter',
                desc: 'Standard commercial & private two-wheelers',
              },
              {
                id: 'BICYCLE' as VehicleType,
                title: '🚲 Bicycle / E-Cycle',
                desc: 'Zero fuel, short-distance hub radius (<3 km)',
              },
            ].map((v) => (
              <TouchableOpacity
                key={v.id}
                style={[styles.chip, vehicleType === v.id && styles.chipActive]}
                onPress={() => setVehicleType(v.id)}
              >
                <View style={styles.chipHeader}>
                  <Text style={[styles.chipTitle, vehicleType === v.id && styles.chipTitleActive]}>
                    {v.title}
                  </Text>
                  {v.badge && <Pill label={v.badge} tone="green" />}
                </View>
                <Text style={styles.chipDesc}>{v.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick presets for rapid review */}
          <View style={styles.presetBox}>
            <Text style={styles.presetLabel}>Quick Presets:</Text>
            <TouchableOpacity onPress={() => handleQuickSelect('EV_SCOOTER', 'Ather 450X', 'TN 05 AX 7824')}>
              <Pill label="Ather 450X (EV)" tone="yellow" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleQuickSelect('PETROL_BIKE', 'Hero Splendor Plus', 'TN 09 BK 4102')}>
              <Pill label="Hero Splendor" tone="neutral" />
            </TouchableOpacity>
          </View>

          <InputField
            label="Make & Model"
            value={model}
            onChangeText={(text) => {
              setModel(text);
              if (error) setError('');
            }}
            placeholder="e.g. Ather 450X / Honda Activa"
          />

          {vehicleType !== 'BICYCLE' && (
            <InputField
              label="Registration Number (Number Plate)"
              value={registrationNumber}
              onChangeText={(text) => {
                setRegistrationNumber(text);
                if (error) setError('');
              }}
              placeholder="TN 05 AX 7824"
              autoCapitalize="characters"
              helper="Must match Vehicle RC document"
            />
          )}

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          <View style={styles.actionsRow}>
            <SecondaryButton
              title="← Back"
              onPress={() => router.back()}
              variant="outline"
              style={styles.backBtn}
            />
            <PrimaryButton
              title="Next: Documents →"
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
  },
  chipsRow: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  chip: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
  },
  chipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  chipTitle: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  chipTitleActive: {
    color: colors.brandYellow,
    fontWeight: '700',
  },
  chipDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  presetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  presetLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
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
