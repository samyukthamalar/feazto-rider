/**
 * FEAzTO Rider - Status Badge
 * Source of truth: FEAzTO Rider Master Prompt Section 5 & 10
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export type StatusVariant =
  | 'online'
  | 'offline'
  | 'on_delivery'
  | 'on_break'
  | 'approved'
  | 'pending'
  | 'needs_correction'
  | 'info'
  | 'warning';

interface StatusBadgeProps {
  label: string;
  variant: StatusVariant;
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant,
  size = 'md',
  pulse = false,
}) => {
  const getBadgeColors = () => {
    switch (variant) {
      case 'online':
      case 'approved':
        return {
          bg: colors.successSoft,
          border: colors.success,
          text: colors.success,
          dot: colors.success,
        };
      case 'on_delivery':
      case 'pending':
        return {
          bg: colors.brandYellowSoft,
          border: colors.brandYellow,
          text: colors.brandYellow,
          dot: colors.brandYellow,
        };
      case 'on_break':
      case 'info':
        return {
          bg: colors.infoSoft,
          border: colors.info,
          text: colors.info,
          dot: colors.info,
        };
      case 'needs_correction':
      case 'warning':
        return {
          bg: colors.warningSoft,
          border: colors.warning,
          text: colors.warning,
          dot: colors.warning,
        };
      case 'offline':
      default:
        return {
          bg: 'rgba(154, 154, 154, 0.12)',
          border: colors.borderLight,
          text: colors.textSecondary,
          dot: colors.textSecondary,
        };
    }
  };

  const scheme = getBadgeColors();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: scheme.bg, borderColor: scheme.border },
        size === 'sm' && styles.badgeSm,
      ]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: scheme.dot },
          size === 'sm' && styles.dotSm,
          pulse && styles.dotPulse,
        ]}
      />
      <Text
        style={[
          styles.text,
          { color: scheme.text },
          size === 'sm' && styles.textSm,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    gap: spacing.xs + 2,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    gap: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dotSm: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  dotPulse: {
    shadowColor: colors.brandYellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  text: {
    ...typography.badge,
    fontSize: 11,
  },
  textSm: {
    fontSize: 9,
    letterSpacing: 0.5,
  },
});
