/**
 * FEAzTO Brand Logo Component
 * Source of truth: FEAzTO Rider Master Prompt Section 5, 10, 12
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

import { useResponsive } from '../../utils/responsive';

interface FEAztoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  showRiderBadge?: boolean;
}

export const FEAztoLogo: React.FC<FEAztoLogoProps> = ({
  size = 'md',
  showTagline = false,
  showRiderBadge = true,
}) => {
  const { isSmallDevice } = useResponsive();

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return isSmallDevice ? 18 : 20;
      case 'md':
        return isSmallDevice ? 24 : 28;
      case 'lg':
        return isSmallDevice ? 32 : 36;
      case 'hero':
        return isSmallDevice ? 38 : 46;
      default:
        return isSmallDevice ? 24 : 28;
    }
  };

  const fontSize = getFontSize();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.brandText, { fontSize }]}>
          FEAz<Text style={styles.brandYellow}>TO</Text>
        </Text>

        {showRiderBadge && (
          <View style={[styles.riderBadge, size === 'sm' && styles.riderBadgeSm]}>
            <Text style={[styles.riderBadgeText, size === 'sm' && styles.riderBadgeTextSm]}>
              RIDER
            </Text>
          </View>
        )}
      </View>

      {showTagline && (
        <Text style={styles.tagline}>
          Partner Operations & Logistics
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandText: {
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  brandYellow: {
    color: colors.brandYellow,
  },
  riderBadge: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 6,
  },
  riderBadgeSm: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  riderBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 1.2,
  },
  riderBadgeTextSm: {
    fontSize: 8,
    letterSpacing: 0.8,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: spacing.xs,
    letterSpacing: 0.2,
  },
});
