/**
 * Screen 17: Order History
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 17)
 * "View past orders and earnings."
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
import { WorkflowBar } from '../../src/components/common/WorkflowBar';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';

const historyData = [
  {
    id: '#2FS28734',
    time: '2:45 PM',
    status: 'Delivered',
    amount: '₹286',
    items: '2 Items • Biryani Box Hub',
  },
  {
    id: '#2FS28733',
    time: '11:20 AM',
    status: 'Delivered',
    amount: '₹245',
    items: '1 Item • Dosa Express',
  },
  {
    id: '#2FS28732',
    time: '09:50 AM',
    status: 'Delivered',
    amount: '₹310',
    items: '3 Items • Chai & Snacks Corner',
  },
];

export default function OrderHistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Today' | 'Week' | 'Month'>('Today');

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={17} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Filter Tabs matching reference diagram: Today | Week | Month */}
        <View style={styles.filterTabsRow}>
          {(['Today', 'Week', 'Month'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterTab, isActive && styles.filterTabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.filterTabText, isActive && styles.filterTabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Order History Cards */}
        <View style={styles.list}>
          {historyData.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.cardLeft}>
                <View style={styles.orderIconCircle}>
                  <Ionicons name="receipt-outline" size={20} color="#111827" />
                </View>
                <View>
                  <Text style={styles.orderIdText}>{order.id}</Text>
                  <Text style={styles.orderMetaText}>
                    {order.time} • <Text style={styles.deliveredStatus}>● {order.status}</Text>
                  </Text>
                  <Text style={styles.orderSubText}>{order.items}</Text>
                </View>
              </View>

              <Text style={styles.amountText}>{order.amount}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.captionText}>View past orders and earnings.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  filterTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 4,
    gap: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#111827',
    fontWeight: '800',
  },
  list: {
    gap: 12,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  orderIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderIdText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  orderMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deliveredStatus: {
    color: '#10B981',
    fontWeight: '700',
  },
  orderSubText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  amountText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
});
