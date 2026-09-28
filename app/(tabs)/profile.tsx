/**
 * FEAzTO Rider - Profile & Settings Screen
 * Source of truth: FEAzTO Rider Master Prompt Section 14 & 29
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/common/Card';
import { Pill } from '../../src/components/common/Pill';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { StatusBadge } from '../../src/components/common/StatusBadge';
import { WorkflowBar } from '../../src/components/common/WorkflowBar';
import { Header } from '../../src/components/navigation/Header';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';
import { useRiderStore } from '../../src/store/riderStore';
import { useUIStore } from '../../src/store/uiStore';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useRiderStore((state) => state.profile);
  const logout = useAuthStore((state) => state.logout);
  const toggleDemoDrawer = useUIStore((state) => state.toggleDemoDrawer);

  const handleLogout = () => {
    logout();
    router.replace('/logout' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={19} />
      <Header title="Rider Profile & Settings" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile.personalDetails.fullName.slice(0, 2).toUpperCase()}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.riderName}>{profile.personalDetails.fullName}</Text>
              <Text style={styles.riderId}>Partner ID: {profile.id}</Text>
              <View style={styles.badgeRow}>
                <StatusBadge label={profile.verificationStatus} variant="approved" size="sm" />
                <Pill label={`⭐ ${profile.rating}`} tone="yellow" />
              </View>
            </View>
          </View>
        </Card>

        {/* Quick Menu */}
        <View style={styles.menuList}>
          {/* Safety & Welfare */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/safety')}
          >
            <Text style={styles.menuIcon}>🪖</Text>
            <View style={styles.menuDetails}>
              <Text style={styles.menuTitle}>Safety & Wellbeing</Text>
              <Text style={styles.menuSubtitle}>Helmet check, raincoat, break tracker</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          {/* Work Slots */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/slots')}
          >
            <Text style={styles.menuIcon}>⏰</Text>
            <View style={styles.menuDetails}>
              <Text style={styles.menuTitle}>Work Slots & Shifts</Text>
              <Text style={styles.menuSubtitle}>Select and schedule delivery duty</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          {/* Incentives */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/incentives')}
          >
            <Text style={styles.menuIcon}>🎁</Text>
            <View style={styles.menuDetails}>
              <Text style={styles.menuTitle}>Incentives & Monsoon Surge</Text>
              <Text style={styles.menuSubtitle}>Active targets and reward progress</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          {/* Support */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/support')}
          >
            <Text style={styles.menuIcon}>🛟</Text>
            <View style={styles.menuDetails}>
              <Text style={styles.menuTitle}>Rider Support & SOS</Text>
              <Text style={styles.menuSubtitle}>Kitchen, customer, payment resolution</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Vehicle & Licence Summary */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Vehicle & Compliance</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vehicle</Text>
            <Text style={styles.infoVal}>{profile.vehicleDetails.model} ({profile.vehicleDetails.registrationNumber})</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Licence</Text>
            <Text style={styles.infoVal}>{profile.licenceDetails.licenceNumber} (MCWG)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payout Account</Text>
            <Text style={styles.infoVal}>{profile.bankDetails.accountNumber} ({profile.bankDetails.upiId})</Text>
          </View>
        </Card>

        {/* Developer Demo Tool Button */}
        <PrimaryButton
          title="🛠️ Open Demo Control Panel"
          onPress={toggleDemoDrawer}
          style={styles.demoBtn}
        />

        {/* Sign Out */}
        <SecondaryButton
          title="Sign Out Partner Account"
          onPress={handleLogout}
          tone="danger"
          style={styles.logoutBtn}
        />
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
  profileCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h3,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  riderName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  riderId: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  menuList: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 22,
    marginRight: spacing.md,
  },
  menuDetails: {
    flex: 1,
  },
  menuTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  menuSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 22,
    color: colors.textMuted,
    fontWeight: '300',
  },
  infoCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  infoCardTitle: {
    ...typography.subtitle2,
    color: colors.brandYellow,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  infoVal: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  demoBtn: {
    marginBottom: spacing.sm,
  },
  logoutBtn: {
    marginTop: spacing.xs,
  },
});
