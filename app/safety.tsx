/**
 * FEAzTO Rider - Safety & Welfare Management Screen
 * Source of truth: FEAzTO Rider Master Prompt Section 17 & 18
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '../src/components/common/BottomSheetModal';
import { Card } from '../src/components/common/Card';
import { Pill } from '../src/components/common/Pill';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { SectionHeader } from '../src/components/common/SectionHeader';
import { Header } from '../src/components/navigation/Header';
import { colors } from '../src/constants/colors';
import { borderRadius, spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useRiderStore } from '../src/store/riderStore';
import { useUIStore } from '../src/store/uiStore';

export default function SafetyScreen() {
  const safety = useRiderStore((state) => state.safety);
  const shift = useRiderStore((state) => state.shift);
  const status = useRiderStore((state) => state.status);
  const profile = useRiderStore((state) => state.profile);
  const setHelmetConfirmed = useRiderStore((state) => state.setHelmetConfirmed);
  const setRaincoatAvailable = useRiderStore((state) => state.setRaincoatAvailable);
  const setVehicleReady = useRiderStore((state) => state.setVehicleReady);
  const takeBreak = useRiderStore((state) => state.takeBreak);
  const returnOnlineFromBreak = useRiderStore((state) => state.returnOnlineFromBreak);
  const showToast = useUIStore((state) => state.showToast);

  const [showSosModal, setShowSosModal] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  const isOnBreak = status === 'ON_BREAK';

  const handleToggleHelmet = () => {
    const next = !safety.helmetConfirmed;
    setHelmetConfirmed(next);
    showToast(next ? 'Helmet verified ✓' : 'Helmet unverified', next ? 'success' : 'warning');
  };

  const handleToggleBreak = () => {
    if (isOnBreak) {
      returnOnlineFromBreak();
      showToast('Welcome back! Rider status returned to ONLINE.', 'success');
    } else {
      takeBreak(15);
      showToast('15-minute rest break activated. Stay hydrated!', 'info');
    }
  };

  const handleTriggerSos = () => {
    setSosTriggered(true);
    showToast('Simulated SOS coordinates sent to Ops & Emergency Contact', 'warning');
    setTimeout(() => {
      setShowSosModal(false);
      setSosTriggered(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Safety & Rider Welfare" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Wellbeing & Rest Break Card (Section 17) */}
        <SectionHeader
          title="Rider Health & Rest Breaks"
          subtitle="FEAzTO policy: Rider welfare is essential for road safety"
        />

        <Card style={styles.breakCard} variant={isOnBreak ? 'highlight' : 'surface'}>
          <View style={styles.breakRow}>
            <View style={styles.breakInfo}>
              <Text style={styles.breakTitle}>
                {isOnBreak ? '☕ Currently on Rest Break' : 'Active Duty Shift Tracker'}
              </Text>
              <Text style={styles.breakSub}>
                {isOnBreak
                  ? 'Your dispatch queue is paused. Hydrate and relax without any penalty or acceptance drop.'
                  : `Total active shift time today: ${shift.shiftDurationMinutes} minutes.`}
              </Text>
            </View>
            <Pill
              label={isOnBreak ? 'RESTING' : 'ON DUTY'}
              tone={isOnBreak ? 'yellow' : 'green'}
            />
          </View>

          <View style={styles.breakActions}>
            <PrimaryButton
              title={isOnBreak ? 'End Rest Break & Return Online' : 'Take 15-Minute Rest Break'}
              onPress={handleToggleBreak}
              variant={isOnBreak ? 'green' : 'yellow'}
              style={styles.breakBtn}
            />
          </View>
        </Card>

        {/* Mandatory Pre-Trip Safety Checklist (Section 18) */}
        <SectionHeader
          title="Pre-Shift Safety Checklist"
          subtitle="Must be validated prior to active dispatch"
        />

        <View style={styles.checklist}>
          {/* Helmet */}
          <Card style={styles.checkCard} variant={safety.helmetConfirmed ? 'highlight' : 'surface'}>
            <View style={styles.checkRow}>
              <Text style={styles.checkEmoji}>🪖</Text>
              <View style={styles.checkInfo}>
                <Text style={styles.checkTitle}>ISI / DOT Approved Helmet</Text>
                <Text style={styles.checkSub}>Chin strap secured and visor clear</Text>
              </View>
              <TouchableOpacity onPress={handleToggleHelmet}>
                <Pill
                  label={safety.helmetConfirmed ? 'Verified ✓' : 'Verify'}
                  tone={safety.helmetConfirmed ? 'green' : 'danger'}
                />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Raincoat */}
          <Card style={styles.checkCard} variant={safety.raincoatAvailable ? 'highlight' : 'surface'}>
            <View style={styles.checkRow}>
              <Text style={styles.checkEmoji}>🦺</Text>
              <View style={styles.checkInfo}>
                <Text style={styles.checkTitle}>High-Vis Raincoat & Poncho</Text>
                <Text style={styles.checkSub}>Available in cargo waterproof kit</Text>
              </View>
              <TouchableOpacity onPress={() => setRaincoatAvailable(!safety.raincoatAvailable)}>
                <Pill
                  label={safety.raincoatAvailable ? 'Ready ✓' : 'Missing'}
                  tone={safety.raincoatAvailable ? 'green' : 'neutral'}
                />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Vehicle Readiness */}
          <Card style={styles.checkCard} variant={safety.vehicleReady ? 'highlight' : 'surface'}>
            <View style={styles.checkRow}>
              <Text style={styles.checkEmoji}>🛵</Text>
              <View style={styles.checkInfo}>
                <Text style={styles.checkTitle}>Vehicle Brakes & Headlight</Text>
                <Text style={styles.checkSub}>Tyre pressure and battery/fuel checked</Text>
              </View>
              <TouchableOpacity onPress={() => setVehicleReady(!safety.vehicleReady)}>
                <Pill
                  label={safety.vehicleReady ? 'Ready ✓' : 'Inspect'}
                  tone={safety.vehicleReady ? 'green' : 'neutral'}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Emergency Contact Card */}
        <SectionHeader
          title="Emergency Contact On File"
          subtitle="Designated safety contact"
        />

        <Card style={styles.contactCard}>
          <View style={styles.contactRow}>
            <View style={styles.contactAvatar}>
              <Text style={styles.contactAvatarText}>🚨</Text>
            </View>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>{profile.personalDetails.emergencyContact.name}</Text>
              <Text style={styles.contactRelation}>
                {profile.personalDetails.emergencyContact.relationship || 'Spouse'} • {profile.personalDetails.emergencyContact.phone}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => showToast(`Simulating call to ${profile.personalDetails.emergencyContact.name}`, 'info')}
            >
              <Text style={styles.callBtnText}>Call 📞</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Protected Emergency SOS Banner (Section 18) */}
        <SectionHeader
          title="Roadside Emergency SOS"
          subtitle="Protected against accidental activation"
        />

        <Card style={styles.sosCard}>
          <Text style={styles.sosTitle}>🚨 24/7 FEAzTO Roadside SOS</Text>
          <Text style={styles.sosNotice}>
            Pressing SOS initiates an incident alert to the central operations safety dispatch. (Two-step confirmation required).
          </Text>
          <PrimaryButton
            title="Initiate Emergency SOS"
            onPress={() => setShowSosModal(true)}
            variant="danger"
            style={styles.sosBtn}
          />
        </Card>
      </ScrollView>

      {/* Accidental Activation Protection Modal (Section 18) */}
      <BottomSheetModal
        visible={showSosModal}
        onClose={() => setShowSosModal(false)}
        title="⚠️ Confirm Emergency SOS Broadcast"
      >
        <View style={styles.sosModalContent}>
          <Text style={styles.sosModalWarning}>
            Are you experiencing an active roadside emergency, accident, or physical threat?
          </Text>
          <Text style={styles.sosModalSub}>
            PROTOTYPE NOTICE: Real emergency services (112) will NOT be dispatched. This triggers simulated incident telemetry for operations review.
          </Text>

          <PrimaryButton
            title={sosTriggered ? 'Broadcasting Alert...' : 'Yes, Broadcast Emergency SOS'}
            onPress={handleTriggerSos}
            variant="danger"
            loading={sosTriggered}
            style={styles.confirmSosBtn}
          />

          <SecondaryButton
            title="Cancel / False Alarm"
            onPress={() => setShowSosModal(false)}
            variant="outline"
          />
        </View>
      </BottomSheetModal>
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
  breakCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  breakRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  breakInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  breakTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  breakSub: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: 4,
    fontSize: 12,
  },
  breakActions: {
    marginTop: spacing.md,
  },
  breakBtn: {
    width: '100%',
  },
  checklist: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  checkCard: {
    padding: spacing.md,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkEmoji: {
    fontSize: 22,
  },
  checkInfo: {
    flex: 1,
  },
  checkTitle: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  checkSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  contactCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  contactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.secondarySurface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactAvatarText: {
    fontSize: 18,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  contactRelation: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  callBtn: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
  },
  callBtnText: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
  },
  sosCard: {
    padding: spacing.md,
    borderColor: colors.danger,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  sosTitle: {
    ...typography.subtitle1,
    color: colors.danger,
    fontWeight: '800',
  },
  sosNotice: {
    ...typography.caption,
    color: colors.textSecondary,
    marginVertical: spacing.xs + 2,
    lineHeight: 16,
  },
  sosBtn: {
    marginTop: spacing.sm,
  },
  sosModalContent: {
    gap: spacing.md,
  },
  sosModalWarning: {
    ...typography.subtitle1,
    color: colors.danger,
    lineHeight: 22,
  },
  sosModalSub: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  confirmSosBtn: {
    marginTop: spacing.sm,
  },
});
