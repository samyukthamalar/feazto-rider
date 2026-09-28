/**
 * FEAzTO Rider - Pill / Tag Component
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface PillProps {
  label: string;
  tone?: 'yellow' | 'neutral' | 'green' | 'danger';
  icon?: React.ReactNode;
}

export const Pill: React.FC<PillProps> = ({ label, tone = 'neutral', icon }) => {
  const getColors = () => {
    switch (tone) {
      case 'yellow':
        return {
          bg: colors.brandYellowSoft,
          text: colors.brandYellow,
          border: colors.brandYellow,
        };
      case 'green':
        return {
          bg: colors.successSoft,
          text: colors.success,
          border: colors.success,
        };
      case 'danger':
        return {
          bg: colors.dangerSoft,
          text: colors.danger,
          border: colors.danger,
        };
      case 'neutral':
      default:
        return {
          bg: colors.secondarySurface,
          text: colors.textSecondary,
          border: colors.borderLight,
        };
    }
  };

  const c = getColors();

  return (
    <View style={[styles.pill, { backgroundColor: c.bg, borderColor: c.border }]}>
      {icon}
      <Text style={[styles.text, { color: c.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    gap: spacing.xs,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
  },
});
