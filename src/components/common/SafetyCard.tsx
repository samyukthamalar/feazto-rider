/**
 * FEAzTO Rider Design System - SafetyCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 10, 17, 18
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Card } from './Card';
import { Pill } from './Pill';

interface SafetyCardProps {
  helmetConfirmed: boolean;
  onToggleHelmet?: () => void;
  raincoatAvailable: boolean;
  onToggleRaincoat?: () => void;
  vehicleReady: boolean;
  onToggleVehicleReady?: () => void;
  shiftDurationMinutes: number;
  onTakeBreak?: () => void;
  isOnBreak?: boolean;
}

export const SafetyCard: React.FC<SafetyCardProps> = ({
  helmetConfirmed,
  onToggleHelmet,
  raincoatAvailable,
  onToggleRaincoat,
  vehicleReady,
  onToggleVehicleReady,
  shiftDurationMinutes,
  onTakeBreak,
  isOnBreak = false,
}) => {
  return (
    <Card style={styles.card} variant="surface">
      <View style={styles.header}>
        <Text style={styles.title}>Safety & Wellbeing Checklist</Text>
        <Pill
          label={helmetConfirmed && vehicleReady ? 'Shift Compliant' : 'Verification Needed'}
          tone={helmetConfirmed && vehicleReady ? 'green' : 'danger'}
        />
      </View>

      <View style={styles.itemsList}>
        {/* Helmet Item */}
        <View style={styles.itemRow}>
          <Text style={styles.itemEmoji}>🪖</Text>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>ISI Helmet Strapped</Text>
            <Text style={styles.itemSubtitle}>Mandatory road safety compliance</Text>
          </View>
          <TouchableOpacity onPress={onToggleHelmet} disabled={!onToggleHelmet}>
            <Pill
              label={helmetConfirmed ? 'Confirmed ✓' : 'Verify'}
              tone={helmetConfirmed ? 'green' : 'danger'}
            />
          </TouchableOpacity>
        </View>

        {/* Raincoat Item */}
        <View style={styles.itemRow}>
          <Text style={styles.itemEmoji}>🦺</Text>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>High-Vis Rain Poncho</Text>
            <Text style={styles.itemSubtitle}>Cargo waterproof kit ready</Text>
          </View>
          <TouchableOpacity onPress={onToggleRaincoat} disabled={!onToggleRaincoat}>
            <Pill
              label={raincoatAvailable ? 'Ready ✓' : 'Missing'}
              tone={raincoatAvailable ? 'green' : 'neutral'}
            />
          </TouchableOpacity>
        </View>

        {/* Vehicle Readiness */}
        <View style={styles.itemRow}>
          <Text style={styles.itemEmoji}>🛵</Text>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>Tyres & Brakes Tested</Text>
            <Text style={styles.itemSubtitle}>Headlight and indicators active</Text>
          </View>
          <TouchableOpacity onPress={onToggleVehicleReady} disabled={!onToggleVehicleReady}>
            <Pill
              label={vehicleReady ? 'Ready ✓' : 'Inspect'}
              tone={vehicleReady ? 'green' : 'neutral'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Break Tracker Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.shiftLabel}>Active Shift Duration</Text>
          <Text style={styles.shiftTime}>{shiftDurationMinutes} minutes on duty</Text>
        </View>

        {onTakeBreak && (
          <TouchableOpacity onPress={onTakeBreak} style={styles.breakAction}>
            <Text style={styles.breakActionText}>
              {isOnBreak ? 'Return to Shift →' : 'Take 15m Break ☕'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  itemsList: {
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemEmoji: {
    fontSize: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  itemSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  shiftLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  shiftTime: {
    ...typography.subtitle2,
    color: colors.brandYellow,
    marginTop: 1,
  },
  breakAction: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  breakActionText: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
  },
});
