/**
 * FEAzTO Rider - Top Navigation & Operations Header
 * Source of truth: FEAzTO Rider Master Prompt Section 15
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { layout, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useIncentiveStore } from '../../store/incentiveStore';
import { useRiderStore } from '../../store/riderStore';
import { StatusBadge, StatusVariant } from '../common/StatusBadge';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showStatusBadge?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showStatusBadge = true,
  rightAction,
}) => {
  const router = useRouter();
  const riderStatus = useRiderStore((state) => state.status);
  const weather = useIncentiveStore((state) => state.weather);

  const getStatusVariant = (): StatusVariant => {
    switch (riderStatus) {
      case 'ONLINE':
        return 'online';
      case 'ON_DELIVERY':
        return 'on_delivery';
      case 'ON_BREAK':
        return 'on_break';
      case 'OFFLINE':
      default:
        return 'offline';
    }
  };

  const getStatusLabel = () => {
    switch (riderStatus) {
      case 'ONLINE':
        return 'ONLINE';
      case 'ON_DELIVERY':
        return 'DELIVERING';
      case 'ON_BREAK':
        return 'ON BREAK';
      case 'OFFLINE':
      default:
        return 'OFFLINE';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack ? (
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
        ) : null}

        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : (
          <View>
            <Text style={styles.appName}>
              FEAz<Text style={styles.yellowText}>TO</Text> RIDER
            </Text>
            {showStatusBadge && (
              <View style={styles.statusRow}>
                <StatusBadge
                  label={getStatusLabel()}
                  variant={getStatusVariant()}
                  size="sm"
                  pulse={riderStatus === 'ONLINE' || riderStatus === 'ON_DELIVERY'}
                />
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.right}>
        {rightAction ? (
          rightAction
        ) : (
          <View style={styles.actionsRow}>
            {/* Weather indicator badge */}
            <Pressable
              onPress={() => router.push('/incentives')}
              style={styles.weatherButton}
              accessibilityRole="button"
              accessibilityLabel="Weather forecast"
            >
              <Text style={styles.weatherText}>
                {weather.state === 'RAIN' || weather.state === 'HEAVY_RAIN' ? '🌧️' : '☀️'}
                {' '}{weather.temperatureCelsius}°C
              </Text>
            </Pressable>

            {/* Quick Support shortcut */}
            <Pressable
              onPress={() => router.push('/support')}
              style={styles.supportButton}
              accessibilityRole="button"
              accessibilityLabel="Support"
            >
              <Text style={styles.supportText}>SOS</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: layout.headerHeight,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border,
    borderWidth: 1,
  },
  backArrow: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  appName: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  yellowText: {
    color: colors.brandYellow,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  statusRow: {
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  weatherButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: 8,
  },
  weatherText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  supportButton: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 4,
    borderRadius: 8,
  },
  supportText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.danger,
    letterSpacing: 0.5,
  },
});
