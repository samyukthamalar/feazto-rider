/**
 * FEAzTO Rider Design System - MapCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 10 & 36
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Card } from './Card';
import { Pill } from './Pill';

interface MapCardProps {
  title: string;
  subtitle: string;
  distanceKm: number;
  etaMinutes: number;
  markerType?: 'kitchen' | 'customer';
  markerLabel?: string;
  badgeText?: string;
}

export const MapCard: React.FC<MapCardProps> = ({
  title,
  subtitle,
  distanceKm,
  etaMinutes,
  markerType = 'kitchen',
  markerLabel,
  badgeText = 'Simulated Telemetry',
}) => {
  return (
    <Card style={styles.card} variant="surface">
      {/* Map visual canvas simulation */}
      <View style={styles.canvas}>
        <View style={styles.roadLine} />
        <View style={[styles.marker, markerType === 'kitchen' ? styles.kitchenMarker : styles.customerMarker]}>
          <Text style={styles.markerEmoji}>{markerType === 'kitchen' ? '🍳' : '📍'}</Text>
        </View>

        <View style={styles.badgeWrapper}>
          <Pill label={badgeText} tone="neutral" />
        </View>
      </View>

      {/* Info bar */}
      <View style={styles.infoBar}>
        <View style={styles.textCol}>
          <Text style={styles.markerTag}>{markerLabel || (markerType === 'kitchen' ? 'KITCHEN HUB' : 'CUSTOMER DROP')}</Text>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        </View>

        <View style={styles.statsBadge}>
          <Text style={styles.etaVal}>{etaMinutes} min</Text>
          <Text style={styles.distVal}>{distanceKm} km</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  canvas: {
    height: 120,
    backgroundColor: '#161C22',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  roadLine: {
    width: '75%',
    height: 3,
    backgroundColor: colors.brandYellow,
    borderRadius: 2,
    opacity: 0.8,
  },
  marker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kitchenMarker: {
    backgroundColor: colors.brandYellowSoft,
    left: '25%',
  },
  customerMarker: {
    backgroundColor: colors.successSoft,
    right: '25%',
  },
  markerEmoji: {
    fontSize: 14,
  },
  badgeWrapper: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  infoBar: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCol: {
    flex: 1,
    marginRight: spacing.md,
  },
  markerTag: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  title: {
    ...typography.subtitle2,
    color: colors.textPrimary,
    marginTop: 2,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
  statsBadge: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  etaVal: {
    ...typography.subtitle2,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  distVal: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
  },
});
