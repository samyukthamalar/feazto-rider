/**
 * FEAzTO Rider Design System - SlotCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 10 & 16
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { WorkSlot } from '../../store/slotStore';
import { Card } from './Card';
import { Pill } from './Pill';

interface SlotCardProps {
  slot: WorkSlot;
  isActive: boolean;
  onSelect: () => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, isActive, onSelect }) => {
  const isFull = slot.status === 'FULL';

  return (
    <Card
      style={[styles.card, isActive && styles.cardActive]}
      variant={isActive ? 'highlight' : 'surface'}
    >
      <View style={styles.row}>
        <View style={styles.leftInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, isActive && styles.titleActive]}>{slot.name}</Text>
            {slot.demandIndicator === 'PEAK' && (
              <Pill label="🔥 High Demand" tone="yellow" />
            )}
          </View>

          <Text style={styles.timeWindow}>⏰ {slot.timeWindow}</Text>

          {slot.bonusPerOrder ? (
            <Text style={styles.bonusText}>
              +₹{slot.bonusPerOrder} guaranteed surge multiplier
            </Text>
          ) : null}
        </View>

        <View style={styles.actionCol}>
          <Pill
            label={slot.status}
            tone={slot.status === 'AVAILABLE' ? 'green' : slot.status === 'LIMITED' ? 'yellow' : 'danger'}
          />

          <TouchableOpacity
            disabled={isFull || isActive}
            onPress={onSelect}
            style={[
              styles.actionBtn,
              isActive && styles.btnActive,
              isFull && styles.btnDisabled,
            ]}
          >
            <Text style={[styles.btnText, isActive && styles.btnActiveText]}>
              {isActive ? 'Booked ✓' : isFull ? 'Full' : 'Book Slot'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardActive: {
    borderColor: colors.brandYellow,
    backgroundColor: colors.brandYellowSoft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 4,
  },
  title: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  titleActive: {
    color: colors.brandYellow,
    fontWeight: '800',
  },
  timeWindow: {
    ...typography.body2,
    color: colors.textSecondary,
    fontSize: 13,
  },
  bonusText: {
    ...typography.caption,
    color: colors.brandYellow,
    marginTop: 4,
    fontWeight: '600',
  },
  actionCol: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  actionBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
  },
  btnActive: {
    backgroundColor: colors.brandYellow,
    borderColor: colors.brandYellow,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  btnActiveText: {
    color: colors.textInverse,
  },
});
