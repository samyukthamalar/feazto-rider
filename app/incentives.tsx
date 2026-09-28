/**
 * FEAzTO Rider - Incentives & Monsoon Weather Engine
 * Source of truth: FEAzTO Rider Master Prompt Sections 19 - 24
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../src/components/common/Card';
import { Pill } from '../src/components/common/Pill';
import { ProgressBar } from '../src/components/common/ProgressBar';
import { SectionHeader } from '../src/components/common/SectionHeader';
import { Header } from '../src/components/navigation/Header';
import { colors } from '../src/constants/colors';
import { borderRadius, spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useIncentiveStore } from '../src/store/incentiveStore';
import { useUIStore } from '../src/store/uiStore';
import { WeatherState } from '../src/types/incentive';

const weatherOptions: { state: WeatherState; label: string; icon: string }[] = [
  { state: 'NORMAL', label: 'Clear Weather', icon: '☀️' },
  { state: 'RAIN', label: 'Monsoon Rain (+₹25)', icon: '🌧️' },
  { state: 'HEAVY_RAIN', label: 'Heavy Rain (+₹40)', icon: '⛈️' },
  { state: 'HEAT', label: 'Heatwave (38°C)', icon: '🔥' },
  { state: 'STORM_ALERT', label: 'Storm Warning', icon: '🌪️' },
];

export default function IncentivesScreen() {
  const campaigns = useIncentiveStore((state) => state.campaigns);
  const weather = useIncentiveStore((state) => state.weather);
  const setWeatherState = useIncentiveStore((state) => state.setWeatherState);
  const incrementCampaignDeliveries = useIncentiveStore((state) => state.incrementCampaignDeliveries);
  const showToast = useUIStore((state) => state.showToast);

  const handleSelectWeather = (st: WeatherState) => {
    setWeatherState(st);
    showToast(`Weather updated to: ${st}`, 'info');
  };

  const handleSimulateDelivery = () => {
    incrementCampaignDeliveries(1);
    showToast('+1 delivery logged! Milestone progress updated.', 'success');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Incentives & Weather" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Weather condition selector pills */}
        <Card style={styles.simCard}>
          <Text style={styles.simTitle}>Simulate Weather & Surge Rates:</Text>
          <View style={styles.simPills}>
            {weatherOptions.map((opt) => (
              <TouchableOpacity
                key={opt.state}
                style={[styles.simChip, weather.state === opt.state && styles.simChipActive]}
                onPress={() => handleSelectWeather(opt.state)}
              >
                <Text style={[styles.simChipText, weather.state === opt.state && styles.simChipTextActive]}>
                  {opt.icon} {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Live Weather & Monsoon Advisory (Section 19 & 20) */}
        <Card style={styles.weatherCard} variant={weather.rainBonusActive ? 'highlight' : 'surface'}>
          <View style={styles.weatherRow}>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherState}>
                {weather.state === 'RAIN' || weather.state === 'HEAVY_RAIN'
                  ? '🌧️ Active Monsoon Surge Alert'
                  : '☀️ Standard Operational Weather'}
              </Text>
              <Text style={styles.conditionText}>
                {weather.conditionDescription} • {weather.temperatureCelsius}°C
              </Text>
              <Text style={styles.advisoryText}>{weather.safetyAdvisory}</Text>
            </View>

            {weather.rainBonusActive && (
              <View style={styles.rainBonusBadge}>
                <Text style={styles.bonusAmount}>+₹{weather.rainBonusPerDelivery}</Text>
                <Text style={styles.bonusLabel}>per drop</Text>
              </View>
            )}
          </View>

          {weather.raincoatRecommended && (
            <View style={styles.raincoatNotice}>
              <Text style={styles.raincoatText}>
                🦺 Raincoat mandatory for monsoon shifts. Water-resistant phone pouch advised.
              </Text>
            </View>
          )}
        </Card>

        {/* Incentive Campaigns Header with Simulation Action */}
        <SectionHeader
          title="Active Earnings Campaigns"
          subtitle="Complete milestone drops to unlock cash rewards"
          rightAction={
            <TouchableOpacity onPress={handleSimulateDelivery}>
              <Text style={styles.simDeliveryText}>+ Log Delivery 🛵</Text>
            </TouchableOpacity>
          }
        />

        <View style={styles.campaignsList}>
          {campaigns.map((camp) => {
            const isCompleted = camp.currentProgress >= camp.targetProgress;
            const remaining = Math.max(0, camp.targetProgress - camp.currentProgress);

            return (
              <Card
                key={camp.id}
                style={styles.campCard}
                variant={camp.type === 'RAIN' && weather.rainBonusActive ? 'highlight' : 'surface'}
              >
                <View style={styles.campHeader}>
                  <View style={styles.campTitleCol}>
                    <Text style={styles.campTitle}>{camp.title}</Text>
                    <Pill
                      label={camp.type}
                      tone={camp.type === 'RAIN' ? 'yellow' : camp.type === 'FESTIVAL' ? 'green' : 'neutral'}
                    />
                  </View>
                  <Text style={styles.rewardText}>₹{camp.rewardAmount}</Text>
                </View>

                <Text style={styles.campDesc}>{camp.description}</Text>

                {/* Progress bar */}
                <View style={styles.progressSection}>
                  <ProgressBar
                    progress={camp.currentProgress}
                    total={camp.targetProgress}
                    color={isCompleted ? colors.success : colors.brandYellow}
                  />
                  <View style={styles.progressFooter}>
                    <Text style={styles.progressCount}>
                      {camp.currentProgress} / {camp.targetProgress} {camp.unit}
                    </Text>
                    <Text style={[styles.remainingText, isCompleted && styles.completedText]}>
                      {isCompleted ? 'Unlocked & Credited ✓' : `${remaining} deliveries left`}
                    </Text>
                  </View>
                </View>

                {camp.timeWindow && (
                  <Text style={styles.windowText}>⏰ Active Window: {camp.timeWindow}</Text>
                )}

                {camp.expiresIn && (
                  <Text style={styles.expiryText}>⏳ Validity: {camp.expiresIn}</Text>
                )}
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
  simCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  simTitle: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  simPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  simChip: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  simChipActive: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
  },
  simChipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  simChipTextActive: {
    color: colors.brandYellow,
    fontWeight: '700',
  },
  weatherCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  weatherState: {
    ...typography.subtitle1,
    color: colors.brandYellow,
  },
  conditionText: {
    ...typography.caption,
    color: colors.textPrimary,
    marginTop: 2,
  },
  advisoryText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  rainBonusBadge: {
    backgroundColor: colors.brandYellow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    alignItems: 'center',
  },
  bonusAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textInverse,
  },
  bonusLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textInverse,
    textTransform: 'uppercase',
  },
  raincoatNotice: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  raincoatText: {
    ...typography.caption,
    color: colors.brandYellow,
  },
  simDeliveryText: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  campaignsList: {
    gap: spacing.md,
  },
  campCard: {
    padding: spacing.md,
  },
  campHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  campTitleCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    flex: 1,
  },
  campTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  rewardText: {
    ...typography.h3,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  campDesc: {
    ...typography.body2,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  progressSection: {
    marginTop: spacing.md,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressCount: {
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
  windowText: {
    ...typography.caption,
    color: colors.brandYellow,
    marginTop: spacing.xs,
    fontSize: 10,
    fontWeight: '600',
  },
  expiryText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 10,
  },
});
