/**
 * Screen 6: Home Dashboard
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 6)
 * "Main dashboard with online status and quick actions."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { WorkflowBar } from '../../src/components/common/WorkflowBar';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useRiderStore } from '../../src/store/riderStore';

export default function HomeDashboardScreen() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={6} />

      {/* Top Bar with Online Status */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>
          FEAz<Text style={styles.logoYellow}>TO</Text>
        </Text>

        <TouchableOpacity
          style={[styles.statusPill, isOnline ? styles.pillOnline : styles.pillOffline]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <View style={[styles.statusDot, isOnline ? styles.dotOnline : styles.dotOffline]} />
          <Text style={[styles.statusText, isOnline ? styles.textOnline : styles.textOffline]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Today's Orders Card */}
        <View style={styles.ordersCard}>
          <Text style={styles.cardHeading}>Today's Orders</Text>

          <View style={styles.statsRow}>
            {/* Pending */}
            <View style={styles.statItem}>
              <Text style={styles.statVal}>5</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>

            <View style={styles.statDivider} />

            {/* Earnings */}
            <View style={styles.statItem}>
              <Text style={styles.statVal}>₹1,250</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>

            <View style={styles.statDivider} />

            {/* Rating */}
            <View style={styles.statItem}>
              <View style={styles.ratingRow}>
                <Text style={styles.statVal}>4.8</Text>
                <Ionicons name="star" size={14} color="#F59E0B" />
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <PrimaryButton
            title="View Orders"
            onPress={() => router.push('/order-received')}
            style={styles.viewOrdersBtn}
          />
        </View>

        {/* Quick Actions List */}
        <View style={styles.menuContainer}>
          {/* My Earnings */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/earnings')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconCircle}>
                <Ionicons name="wallet-outline" size={20} color="#111827" />
              </View>
              <Text style={styles.menuTitle}>My Earnings</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconCircle}>
                <Ionicons name="person-outline" size={20} color="#111827" />
              </View>
              <Text style={styles.menuTitle}>Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemLast]}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconCircle}>
                <Ionicons name="settings-outline" size={20} color="#111827" />
              </View>
              <Text style={styles.menuTitle}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.captionText}>
          Main dashboard with online status and quick actions.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.8,
  },
  logoYellow: {
    color: colors.brandYellow,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  pillOnline: {
    backgroundColor: '#D1FAE5',
  },
  pillOffline: {
    backgroundColor: '#F3F4F6',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotOnline: {
    backgroundColor: '#10B981',
  },
  dotOffline: {
    backgroundColor: '#9CA3AF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  textOnline: {
    color: '#065F46',
  },
  textOffline: {
    color: '#6B7280',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  ordersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeading: {
    ...typography.subtitle1,
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  viewOrdersBtn: {
    width: '100%',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
  },
});
