/**
 * FEAzTO Rider - Design System Showcase & Component Gallery
 * Allows complete visual verification across mobile viewports (375x812, 390x844, 412x915).
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Card,
  DocumentCard,
  EarningsCard,
  EmptyState,
  ErrorState,
  FEAztoLogo,
  Header,
  IncentiveCard,
  InputField,
  LoadingState,
  MapCard,
  NotificationCard,
  OrderCard,
  Pill,
  PrimaryButton,
  ProgressBar,
  SafetyCard,
  SecondaryButton,
  SectionHeader,
  SlotCard,
  StatusBadge,
  WeatherCard,
} from '../src/components';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { canonicalMockOrder } from '../src/store/orderStore';
import { useUIStore } from '../src/store/uiStore';

export default function DesignSystemScreen() {
  const showToast = useUIStore((state) => state.showToast);
  const [inputText, setInputText] = useState('TN 05 AX 7824');
  const [helmetState, setHelmetState] = useState(true);
  const [raincoatState, setRaincoatState] = useState(true);
  const [vehicleState, setVehicleState] = useState(true);
  const [activeSlot, setActiveSlot] = useState('slot-2');
  const [docUploaded, setDocUploaded] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Design System Gallery" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 1. Brand Logo */}
        <SectionHeader title="1. Brand & Identity (FEAzTO)" subtitle="Typography, yellow signature & partner badge" />
        <Card style={styles.showcaseCard}>
          <FEAztoLogo size="hero" showTagline showRiderBadge />
          <View style={styles.rowCentered}>
            <FEAztoLogo size="sm" showRiderBadge />
            <FEAztoLogo size="md" showRiderBadge />
            <FEAztoLogo size="lg" showRiderBadge />
          </View>
        </Card>

        {/* 2. Color Palette */}
        <SectionHeader title="2. Color Tokens" subtitle="Dark Rider-First Palette" />
        <Card style={styles.showcaseCard}>
          <View style={styles.paletteGrid}>
            {[
              { label: 'Background', color: colors.background, hex: '#0B0B0B' },
              { label: 'Surface', color: colors.surface, hex: '#141414' },
              { label: 'Sec Surface', color: colors.secondarySurface, hex: '#1B1B1B' },
              { label: 'Border', color: colors.border, hex: '#2A2A2A' },
              { label: 'Yellow (CTA)', color: colors.brandYellow, hex: '#F5B700', darkText: true },
              { label: 'Soft Yellow', color: colors.brandYellowSoft, hex: '#3A2E00' },
              { label: 'Green (Online)', color: colors.success, hex: '#55C271', darkText: true },
              { label: 'Red (Danger)', color: colors.danger, hex: '#FF5D5D', darkText: true },
              { label: 'Blue (Info)', color: colors.info, hex: '#6EA8FF', darkText: true },
            ].map((c) => (
              <View key={c.label} style={[styles.colorChip, { backgroundColor: c.color }]}>
                <Text style={[styles.colorLabel, c.darkText && styles.textDark]}>{c.label}</Text>
                <Text style={[styles.colorHex, c.darkText && styles.textDark]}>{c.hex}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* 3. Typography */}
        <SectionHeader title="3. Typography System" subtitle="Standard scale" />
        <Card style={styles.showcaseCard}>
          <Text style={typography.h1}>h1 • 28pt Headline Bold</Text>
          <Text style={typography.h2}>h2 • 22pt Screen Title</Text>
          <Text style={typography.h3}>h3 • 18pt Card Title</Text>
          <Text style={typography.subtitle1}>subtitle1 • 16pt Emphasized</Text>
          <Text style={typography.subtitle2}>subtitle2 • 14pt Secondary</Text>
          <Text style={typography.body1}>body1 • 15pt Standard reading text</Text>
          <Text style={typography.body2}>body2 • 13pt Muted description text</Text>
          <Text style={typography.caption}>caption • 11pt Micro copy</Text>
          <Text style={typography.statValue}>₹1,240 <Text style={typography.statLabel}>Stat Value</Text></Text>
        </Card>

        {/* 4. Buttons */}
        <SectionHeader title="4. Button Components" subtitle="Primary, secondary, states & sizes" />
        <Card style={styles.showcaseCard}>
          <Text style={styles.subHeading}>Primary Button Variants</Text>
          <View style={styles.buttonStack}>
            <PrimaryButton title="Primary Brand Yellow (CTA)" onPress={() => showToast('Primary pressed')} />
            <PrimaryButton title="Primary Green (Go Online)" variant="green" onPress={() => showToast('Go Online pressed')} />
            <PrimaryButton title="Primary Danger (Emergency)" variant="danger" onPress={() => showToast('Danger pressed')} />
            <PrimaryButton title="Button Loading" loading onPress={() => {}} />
            <PrimaryButton title="Button Disabled" disabled onPress={() => {}} />
          </View>

          <Text style={styles.subHeading}>Secondary Button Variants</Text>
          <View style={styles.buttonStack}>
            <SecondaryButton title="Outline Default" onPress={() => showToast('Secondary pressed')} />
            <SecondaryButton title="Outline Yellow Tone" tone="yellow" onPress={() => {}} />
            <SecondaryButton title="Outline Danger Tone" tone="danger" onPress={() => {}} />
            <SecondaryButton title="Surface Background" variant="surface" onPress={() => {}} />
            <SecondaryButton title="Ghost Variant" variant="ghost" onPress={() => {}} />
          </View>
        </Card>

        {/* 5. Status Badges & Pills */}
        <SectionHeader title="5. Status Badges & Chips" subtitle="Operational status indicators" />
        <Card style={styles.showcaseCard}>
          <Text style={styles.subHeading}>Pulsing Status Badges</Text>
          <View style={styles.wrapRow}>
            <StatusBadge label="ONLINE" variant="online" pulse />
            <StatusBadge label="ON DELIVERY" variant="on_delivery" pulse />
            <StatusBadge label="ON BREAK" variant="on_break" />
            <StatusBadge label="OFFLINE" variant="offline" />
            <StatusBadge label="APPROVED" variant="approved" />
            <StatusBadge label="PENDING" variant="pending" />
            <StatusBadge label="CORRECTION" variant="needs_correction" />
          </View>

          <Text style={styles.subHeading}>Semantic Pills</Text>
          <View style={styles.wrapRow}>
            <Pill label="4 items" tone="neutral" />
            <Pill label="VEG" tone="green" />
            <Pill label="NON-VEG" tone="danger" />
            <Pill label="+₹30 Rain Surge" tone="yellow" />
            <Pill label="🔥 High Demand" tone="yellow" />
          </View>
        </Card>

        {/* 6. Form Inputs */}
        <SectionHeader title="6. Input Field Components" subtitle="Focus highlight, clearable & secure toggles" />
        <Card style={styles.showcaseCard}>
          <InputField
            label="Registration Number (Clearable)"
            value={inputText}
            onChangeText={setInputText}
            placeholder="TN 05 AX 7824"
            clearable
            onClear={() => setInputText('')}
          />

          <InputField
            label="Input with Error"
            value="invalid-dl"
            onChangeText={() => {}}
            error="Licence format TN-XX-YYYY-NNNNNNN required"
          />

          <InputField
            label="Secure OTP Code"
            value="4821"
            onChangeText={() => {}}
            secureTextEntry
            helper="4-digit customer handover PIN"
          />
        </Card>

        {/* 7. Progress Bars */}
        <SectionHeader title="7. Progress Bars" subtitle="Milestone increments" />
        <Card style={styles.showcaseCard}>
          <Text style={styles.progressLabel}>25% Progress</Text>
          <ProgressBar progress={25} total={100} />
          <Text style={styles.progressLabel}>50% Progress</Text>
          <ProgressBar progress={50} total={100} />
          <Text style={styles.progressLabel}>75% Progress (Surge Goal)</Text>
          <ProgressBar progress={75} total={100} />
          <Text style={styles.progressLabel}>100% Completed (Success)</Text>
          <ProgressBar progress={100} total={100} color={colors.success} />
        </Card>

        {/* 8. Domain Cards */}
        <SectionHeader title="8. Domain Cards Suite" subtitle="OrderCard, EarningsCard, IncentiveCard, etc." />

        <OrderCard
          order={canonicalMockOrder}
          actionTitle="Advance Step →"
          onActionPress={() => showToast('OrderCard Action Clicked', 'info')}
        />

        <EarningsCard
          todayTotal={960}
          completedDeliveries={7}
          distanceKm={34.2}
          cashoutAvailable={1940}
          onCashoutPress={() => showToast('Cashout Clicked', 'success')}
          breakdown={{
            base: 580,
            rain: 180,
            peak: 120,
            festival: 0,
            tips: 80,
          }}
        />

        <IncentiveCard
          campaign={{
            id: 'inc-rain-demo',
            type: 'RAIN',
            title: 'Monsoon Rain Surge',
            description: 'Heavy rain in Anna Nagar zone. Extra ₹30 per completed drop.',
            rewardAmount: 30,
            currentProgress: 3,
            targetProgress: 5,
            unit: 'deliveries',
            isActive: true,
            expiresIn: 'Active for next 2 hours',
          }}
          onPress={() => showToast('Incentive Card Pressed', 'info')}
        />

        <WeatherCard
          weather={{
            state: 'RAIN',
            temperatureCelsius: 27,
            conditionDescription: 'Scattered Monsoon Showers',
            rainProbabilityPercentage: 85,
            rainBonusActive: true,
            rainBonusPerDelivery: 30,
            safetyAdvisory: 'Slippery roads near Roundtana. Visor down.',
            raincoatRecommended: true,
          }}
          onPress={() => showToast('Weather Card Pressed', 'info')}
        />

        <SafetyCard
          helmetConfirmed={helmetState}
          onToggleHelmet={() => setHelmetState(!helmetState)}
          raincoatAvailable={raincoatState}
          onToggleRaincoat={() => setRaincoatState(!raincoatState)}
          vehicleReady={vehicleState}
          onToggleVehicleReady={() => setVehicleState(!vehicleState)}
          shiftDurationMinutes={145}
          onTakeBreak={() => showToast('Take break triggered', 'info')}
        />

        <SlotCard
          slot={{
            id: 'slot-2',
            name: 'Lunch Peak Shift',
            timeWindow: '12:00 – 16:00',
            startHour: 12,
            endHour: 16,
            status: 'AVAILABLE',
            demandIndicator: 'PEAK',
            bonusPerOrder: 20,
          }}
          isActive={activeSlot === 'slot-2'}
          onSelect={() => setActiveSlot('slot-2')}
        />

        <DocumentCard
          title="Vehicle RC (Registration Card)"
          subtitle="Smart card copy or mParivahan digital doc"
          isUploaded={docUploaded}
          onToggleUpload={() => setDocUploaded(!docUploaded)}
          documentNumber="TN-05-AX-7824"
        />

        <NotificationCard
          notification={{
            id: 'n-1',
            title: 'Rain Surge Activated (+₹30)',
            body: 'Monsoon alert in Chennai Central. Surge rates applied to all pending deliveries.',
            category: 'WEATHER',
            timestamp: '12m ago',
            read: false,
          }}
          onPress={() => showToast('Notification Clicked', 'info')}
        />

        <MapCard
          title="FEAzTO Home Kitchen"
          subtitle="12, Lake View Road, Anna Nagar"
          distanceKm={2.4}
          etaMinutes={6}
          markerType="kitchen"
          badgeText="Simulated GPS Telemetry"
        />

        {/* 9. Async & Fallback States */}
        <SectionHeader title="9. Fallback & Async States" subtitle="Loading, Empty & Error Handlers" />
        <Card style={styles.showcaseCard}>
          <Text style={styles.subHeading}>Loading State</Text>
          <View style={styles.stateContainer}>
            <LoadingState message="Fetching dispatch offers..." subMessage="Syncing with FEAzTO cloud node" />
          </View>

          <Text style={styles.subHeading}>Empty State</Text>
          <View style={styles.stateContainer}>
            <EmptyState
              title="No Active Orders"
              description="Stay online in high-demand zones to receive offers."
              actionTitle="View Shift Slots"
              onActionPress={() => showToast('Slots pressed')}
            />
          </View>

          <Text style={styles.subHeading}>Error State with Retry</Text>
          <View style={styles.stateContainer}>
            <ErrorState
              title="Connection Interrupted"
              message="Could not connect to dispatch telemetry. Please verify network."
              onRetry={() => showToast('Retrying...')}
            />
          </View>
        </Card>
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
  showcaseCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  colorChip: {
    width: '31%',
    height: 60,
    borderRadius: 8,
    padding: spacing.xs,
    justifyContent: 'space-between',
    borderColor: colors.border,
    borderWidth: 1,
  },
  colorLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  colorHex: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  textDark: {
    color: '#0B0B0B',
  },
  subHeading: {
    ...typography.subtitle2,
    color: colors.brandYellow,
    marginTop: spacing.sm,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonStack: {
    gap: spacing.sm,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  stateContainer: {
    backgroundColor: colors.secondarySurface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
