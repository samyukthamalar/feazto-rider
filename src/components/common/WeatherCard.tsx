/**
 * FEAzTO Rider Design System - WeatherCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 10 & 19
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { WeatherCondition } from '../../types/incentive';
import { Card } from './Card';
import { Pill } from './Pill';

interface WeatherCardProps {
  weather: WeatherCondition;
  onPress?: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onPress }) => {
  const isRain = weather.state === 'RAIN' || weather.state === 'HEAVY_RAIN';

  const getWeatherIcon = () => {
    switch (weather.state) {
      case 'RAIN':
      case 'HEAVY_RAIN':
        return '🌧️';
      case 'HEAT':
        return '☀️';
      case 'STORM_ALERT':
        return '⛈️';
      case 'NORMAL':
      default:
        return '🌤️';
    }
  };

  return (
    <Card
      style={styles.card}
      variant={weather.rainBonusActive ? 'highlight' : 'surface'}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <View style={styles.leftInfo}>
          <View style={styles.statusLine}>
            <Text style={styles.weatherIcon}>{getWeatherIcon()}</Text>
            <Text style={styles.weatherHeading}>
              {isRain ? 'Monsoon Surge Active' : 'Riding Weather Status'}
            </Text>
          </View>
          <Text style={styles.conditionText}>
            {weather.conditionDescription} • {weather.temperatureCelsius}°C
          </Text>
        </View>

        {weather.rainBonusActive && (
          <View style={styles.surgeBadge}>
            <Text style={styles.surgeAmount}>+₹{weather.rainBonusPerDelivery}</Text>
            <Text style={styles.surgeLabel}>per trip</Text>
          </View>
        )}
      </View>

      <Text style={styles.advisoryText}>{weather.safetyAdvisory}</Text>

      {weather.raincoatRecommended && (
        <View style={styles.raincoatBanner}>
          <Pill label="🦺 Raincoat Recommended" tone="yellow" />
          <Text style={styles.raincoatNote}>Keep water-resistant pouch for order bills</Text>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  statusLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  weatherIcon: {
    fontSize: 18,
  },
  weatherHeading: {
    ...typography.subtitle1,
    color: colors.brandYellow,
  },
  conditionText: {
    ...typography.body2,
    color: colors.textPrimary,
    marginTop: 2,
    fontSize: 12,
  },
  surgeBadge: {
    backgroundColor: colors.brandYellow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    alignItems: 'center',
  },
  surgeAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textInverse,
  },
  surgeLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.textInverse,
    textTransform: 'uppercase',
  },
  advisoryText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 16,
  },
  raincoatBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
    paddingTop: spacing.xs + 2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  raincoatNote: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    flex: 1,
  },
});
