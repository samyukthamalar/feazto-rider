/**
 * FEAzTO Rider Design System - IncentiveCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 10 & 20-24
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { IncentiveCampaign } from '../../types/incentive';
import { Card } from './Card';
import { Pill } from './Pill';
import { ProgressBar } from './ProgressBar';

interface IncentiveCardProps {
  campaign: IncentiveCampaign;
  onPress?: () => void;
}

export const IncentiveCard: React.FC<IncentiveCardProps> = ({ campaign, onPress }) => {
  const isCompleted = campaign.currentProgress >= campaign.targetProgress;
  const remaining = Math.max(0, campaign.targetProgress - campaign.currentProgress);

  const getPillTone = () => {
    switch (campaign.type) {
      case 'RAIN':
        return 'yellow';
      case 'FESTIVAL':
        return 'green';
      case 'PEAK':
        return 'yellow';
      default:
        return 'neutral';
    }
  };

  return (
    <Card
      style={styles.card}
      variant={campaign.type === 'RAIN' ? 'highlight' : 'surface'}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{campaign.title}</Text>
          <Pill label={campaign.type} tone={getPillTone()} />
        </View>
        <Text style={styles.reward}>₹{campaign.rewardAmount}</Text>
      </View>

      <Text style={styles.description}>{campaign.description}</Text>

      {/* Progress Bar & Target Display */}
      <View style={styles.progressSection}>
        <ProgressBar
          progress={campaign.currentProgress}
          total={campaign.targetProgress}
          color={isCompleted ? colors.success : colors.brandYellow}
        />
        <View style={styles.progressFooter}>
          <Text style={styles.progressText}>
            {campaign.currentProgress} / {campaign.targetProgress} {campaign.unit}
          </Text>
          <Text style={[styles.remainingText, isCompleted && styles.completedText]}>
            {isCompleted ? 'Unlocked ✓' : `${remaining} to go`}
          </Text>
        </View>
      </View>

      {campaign.expiresIn && (
        <View style={styles.footer}>
          <Text style={styles.expiryText}>⏳ {campaign.expiresIn}</Text>
        </View>
      )}
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
    marginBottom: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  reward: {
    ...typography.h3,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  description: {
    ...typography.body2,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  progressSection: {
    marginTop: spacing.md,
  },
  progressFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  progressText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  remainingText: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
  },
  completedText: {
    color: colors.success,
  },
  footer: {
    marginTop: spacing.xs + 2,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  expiryText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
  },
});
