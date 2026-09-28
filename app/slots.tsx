/**
 * FEAzTO Rider - Work Slots & Shift Booking Screen
 * Source of truth: FEAzTO Rider Master Prompt Section 16
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../src/components/common/Card';
import { Pill } from '../src/components/common/Pill';
import { Header } from '../src/components/navigation/Header';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useSlotStore } from '../src/store/slotStore';
import { useUIStore } from '../src/store/uiStore';

export default function SlotsScreen() {
  const slots = useSlotStore((state) => state.slots);
  const activeSlotId = useSlotStore((state) => state.activeSlotId);
  const selectSlot = useSlotStore((state) => state.selectSlot);
  const showToast = useUIStore((state) => state.showToast);

  const handleSelectSlot = (id: string, name: string) => {
    const success = selectSlot(id);
    if (success) {
      showToast(`Booked slot: ${name}`, 'success');
    } else {
      showToast('This shift is currently full.', 'warning');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Work Slots & Shifts" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Book Shift Hours</Text>
        <Text style={styles.subtitle}>
          Select your dedicated operational hours to receive guaranteed dispatch priority and surge multipliers.
        </Text>

        <View style={styles.list}>
          {slots.map((slot) => {
            const isSelected = activeSlotId === slot.id;
            const isFull = slot.status === 'FULL';

            return (
              <Card
                key={slot.id}
                style={[styles.slotCard, isSelected && styles.selectedCard]}
                variant={isSelected ? 'highlight' : 'surface'}
              >
                <View style={styles.row}>
                  <View style={styles.info}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.slotName, isSelected && styles.selectedText]}>
                        {slot.name}
                      </Text>
                      <Pill
                        label={slot.demandIndicator === 'PEAK' ? '🔥 HIGH DEMAND' : 'NORMAL'}
                        tone={slot.demandIndicator === 'PEAK' ? 'yellow' : 'neutral'}
                      />
                    </View>

                    <Text style={styles.timeWindow}>⏰ {slot.timeWindow}</Text>

                    {slot.bonusPerOrder ? (
                      <Text style={styles.bonusText}>
                        +₹{slot.bonusPerOrder} surge guarantee per delivery
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.actionCol}>
                    <Pill
                      label={slot.status}
                      tone={slot.status === 'AVAILABLE' ? 'green' : slot.status === 'LIMITED' ? 'yellow' : 'danger'}
                    />

                    <TouchableOpacity
                      disabled={isFull || isSelected}
                      onPress={() => handleSelectSlot(slot.id, slot.name)}
                      style={[
                        styles.selectBtn,
                        isSelected && styles.btnActive,
                        isFull && styles.btnDisabled,
                      ]}
                    >
                      <Text style={[styles.selectBtnText, isSelected && styles.btnActiveText]}>
                        {isSelected ? 'Active ✓' : isFull ? 'Full' : 'Select'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            );
          })}
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
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  list: {
    gap: spacing.md,
  },
  slotCard: {
    padding: spacing.md,
  },
  selectedCard: {
    borderColor: colors.brandYellow,
    backgroundColor: colors.brandYellowSoft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: 4,
  },
  slotName: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  selectedText: {
    color: colors.brandYellow,
    fontWeight: '800',
  },
  timeWindow: {
    ...typography.body2,
    color: colors.textSecondary,
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
  selectBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
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
  selectBtnText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  btnActiveText: {
    color: colors.textInverse,
  },
});
