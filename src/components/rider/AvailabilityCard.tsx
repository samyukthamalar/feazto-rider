/**
 * FEAzTO Rider - Availability Toggle Card
 * Source of truth: FEAzTO Rider Master Prompt Section 15 & 18
 */

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useRiderStore } from '../../store/riderStore';
import { useUIStore } from '../../store/uiStore';
import { BottomSheetModal } from '../common/BottomSheetModal';
import { Card } from '../common/Card';
import { Pill } from '../common/Pill';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';
import { StatusBadge } from '../common/StatusBadge';

export const AvailabilityCard: React.FC = () => {
  const status = useRiderStore((state) => state.status);
  const goOnline = useRiderStore((state) => state.goOnline);
  const goOffline = useRiderStore((state) => state.goOffline);
  const takeBreak = useRiderStore((state) => state.takeBreak);
  const returnOnlineFromBreak = useRiderStore((state) => state.returnOnlineFromBreak);
  const safety = useRiderStore((state) => state.safety);
  const setHelmetConfirmed = useRiderStore((state) => state.setHelmetConfirmed);
  const shift = useRiderStore((state) => state.shift);
  const showToast = useUIStore((state) => state.showToast);

  const [showHelmetModal, setShowHelmetModal] = useState(false);

  const isOnline = status === 'ONLINE' || status === 'ON_DELIVERY';
  const isOnBreak = status === 'ON_BREAK';

  const handleToggleOnline = () => {
    if (isOnline) {
      goOffline();
      showToast('You are now OFFLINE. No new delivery offers will be sent.', 'info');
    } else if (isOnBreak) {
      returnOnlineFromBreak();
      showToast('Welcome back! Duty status returned to ONLINE.', 'success');
    } else {
      // Check helmet requirement as mandated in Section 18
      if (!safety.helmetConfirmed) {
        setShowHelmetModal(true);
        return;
      }
      const res = goOnline();
      if (res.success) {
        showToast('You are now ONLINE and ready for dispatches.', 'success');
      } else {
        showToast(res.reason || 'Could not go online', 'warning');
      }
    }
  };

  const handleConfirmHelmetAndGoOnline = () => {
    setHelmetConfirmed(true);
    setShowHelmetModal(false);
    goOnline();
    showToast('Helmet confirmed ✓ You are now ONLINE!', 'success');
  };

  return (
    <>
      <Card style={styles.card} variant={isOnline ? 'surface' : isOnBreak ? 'highlight' : 'surface'}>
        <View style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.label}>Rider Operational Duty</Text>
            <View style={styles.badgeRow}>
              <StatusBadge
                label={status.replace(/_/g, ' ')}
                variant={isOnline ? 'online' : isOnBreak ? 'on_break' : 'offline'}
                pulse={isOnline}
              />
              {isOnline && (
                <Pill label={`${shift.shiftDurationMinutes}m on duty`} tone="neutral" />
              )}
            </View>
          </View>

          <View style={styles.actionContainer}>
            {isOnline ? (
              <SecondaryButton
                title="Go Offline"
                onPress={handleToggleOnline}
                variant="outline"
                tone="default"
                style={styles.toggleButton}
              />
            ) : isOnBreak ? (
              <PrimaryButton
                title="Resume Online"
                onPress={handleToggleOnline}
                variant="green"
                style={styles.toggleButton}
              />
            ) : (
              <PrimaryButton
                title="Go Online"
                onPress={handleToggleOnline}
                variant="green"
                style={styles.toggleButton}
              />
            )}
          </View>
        </View>

        {/* Status Sub-bars */}
        {isOnline && status !== 'ON_DELIVERY' && (
          <View style={styles.onlineSubBar}>
            <Text style={styles.onlineSubText}>
              🟢 Looking for nearby kitchen pickups in Anna Nagar...
            </Text>
            <TouchableOpacity onPress={() => takeBreak(15)}>
              <Text style={styles.breakLink}>Take Break ☕</Text>
            </TouchableOpacity>
          </View>
        )}

        {isOnBreak && (
          <View style={styles.breakSubBar}>
            <Text style={styles.breakSubText}>
              ☕ Rest break active. Dispatch pause without acceptance penalty.
            </Text>
          </View>
        )}

        {!safety.helmetConfirmed && !isOnline && !isOnBreak && (
          <TouchableOpacity
            style={styles.warningBanner}
            onPress={() => setShowHelmetModal(true)}
          >
            <Text style={styles.warningText}>
              ⚠️ Mandatory: Confirm helmet check to enable Going Online. Tap here →
            </Text>
          </TouchableOpacity>
        )}
      </Card>

      {/* Mandatory Helmet Verification Bottom Sheet (Section 18) */}
      <BottomSheetModal
        visible={showHelmetModal}
        onClose={() => setShowHelmetModal(false)}
        title="🪖 Safety Helmet Check"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>Rider Safety Policy (Mandatory)</Text>
          <Text style={styles.modalBody}>
            Under FEAzTO Rider Welfare & Road Safety regulations, all delivery partners must wear an ISI or DOT certified helmet with chin strap fastened before accepting orders.
          </Text>

          <View style={styles.checkCard}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkDesc}>
              I confirm that my helmet is securely fastened and visor is clean for night/monsoon visibility.
            </Text>
          </View>

          <PrimaryButton
            title="I am Wearing My Helmet • Go Online"
            onPress={handleConfirmHelmetAndGoOnline}
            variant="green"
            style={styles.modalBtn}
          />

          <SecondaryButton
            title="Cancel"
            onPress={() => setShowHelmetModal(false)}
            variant="ghost"
            style={styles.cancelBtn}
          />
        </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: 2,
  },
  actionContainer: {
    minWidth: 120,
    justifyContent: 'center',
  },
  toggleButton: {
    height: 44,
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  onlineSubBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  onlineSubText: {
    ...typography.caption,
    color: colors.success,
    fontSize: 11,
    flex: 1,
  },
  breakLink: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  breakSubBar: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  breakSubText: {
    ...typography.caption,
    color: colors.info,
    fontSize: 11,
  },
  warningBanner: {
    marginTop: spacing.md,
    backgroundColor: colors.warningSoft,
    borderColor: colors.warning,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
  },
  warningText: {
    ...typography.caption,
    color: colors.warning,
    fontWeight: '600',
    fontSize: 11,
  },
  modalContent: {
    gap: spacing.md,
  },
  modalHeading: {
    ...typography.subtitle1,
    color: colors.brandYellow,
  },
  modalBody: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  checkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  checkIcon: {
    color: colors.success,
    fontSize: 18,
    fontWeight: '800',
  },
  checkDesc: {
    ...typography.caption,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 16,
  },
  modalBtn: {
    width: '100%',
    marginTop: spacing.sm,
  },
  cancelBtn: {
    width: '100%',
  },
});
