/**
 * FEAzTO Rider - Map & Navigation Placeholder Card
 * Source of truth: FEAzTO Rider Master Prompt Section 36
 *
 * NOTE: Live GPS is NOT faked. Clearly communicates simulated route telemetry
 * and prepares contract for future Google Maps integration.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Card } from '../common/Card';
import { Pill } from '../common/Pill';

interface NavigationCardProps {
  destinationType: 'KITCHEN' | 'CUSTOMER';
  destinationName: string;
  address: string;
  distanceKm: number;
  estimatedMinutes: number;
  contactNumber?: string;
  notes?: string;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  destinationType,
  destinationName,
  address,
  distanceKm,
  estimatedMinutes,
  notes,
}) => {
  return (
    <Card style={styles.card}>
      {/* Visual map simulation banner */}
      <View style={styles.mapCanvas}>
        <View style={styles.gridOverlay}>
          <View style={styles.routeLine} />
          <View style={[styles.marker, destinationType === 'KITCHEN' ? styles.markerKitchen : styles.markerCustomer]}>
            <Text style={styles.markerText}>{destinationType === 'KITCHEN' ? '🍳' : '📍'}</Text>
          </View>
        </View>

        <View style={styles.mapBadge}>
          <Pill
            label="Simulated Route Map • Dev Mode"
            tone="neutral"
          />
        </View>
      </View>

      {/* Target details */}
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.typeLabel}>
              {destinationType === 'KITCHEN' ? 'PICKUP KITCHEN' : 'DROP DESTINATION'}
            </Text>
            <Text style={styles.name}>{destinationName}</Text>
            <Text style={styles.address}>{address}</Text>
          </View>

          <View style={styles.etaContainer}>
            <Text style={styles.etaMinutes}>{estimatedMinutes}m</Text>
            <Text style={styles.etaDistance}>{distanceKm} km</Text>
          </View>
        </View>

        {notes && (
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>ℹ️ {notes}</Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  mapCanvas: {
    height: 140,
    backgroundColor: '#181E24',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeLine: {
    width: '70%',
    height: 3,
    backgroundColor: colors.brandYellow,
    borderRadius: 2,
    borderStyle: 'dashed',
  },
  marker: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  markerKitchen: {
    backgroundColor: colors.brandYellowSoft,
    left: '20%',
  },
  markerCustomer: {
    backgroundColor: colors.successSoft,
    right: '20%',
  },
  markerText: {
    fontSize: 16,
  },
  mapBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  detailsContainer: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: spacing.md,
  },
  typeLabel: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  name: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginTop: 2,
  },
  address: {
    ...typography.body2,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  etaContainer: {
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  etaMinutes: {
    ...typography.h3,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  etaDistance: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  notesBox: {
    marginTop: spacing.sm,
    backgroundColor: colors.secondarySurface,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notesText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
