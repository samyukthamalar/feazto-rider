/**
 * Screen 7: Order Received
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 7)
 * "New order notification with details. Rider accepts the order."
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
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';
import { orderService } from '../services/orderService';

export default function OrderReceivedScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAcceptOrder = async () => {
    setLoading(true);
    await orderService.acceptOrder('2FS28734');
    setLoading(false);
    showToast('Order #2FS28734 Accepted! Proceeding to Cloud Kitchen pickup.', 'success');
    router.push('/pickup-qr');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Order</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} hitSlop={8}>
          <Ionicons name="close" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Card */}
        <View style={styles.orderCard}>
          {/* Order ID & Items header */}
          <View style={styles.orderMetaRow}>
            <View>
              <Text style={styles.orderId}>Order #2FS28734</Text>
              <Text style={styles.itemsPrice}>2 Items • ₹286</Text>
            </View>
            <View style={styles.badgeNew}>
              <Text style={styles.badgeNewText}>NEW</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Pickup & Drop Points */}
          <View style={styles.routeBox}>
            {/* Cloud Kitchen Pickup */}
            <View style={styles.pointRow}>
              <View style={styles.iconCircleKitchen}>
                <Ionicons name="restaurant-outline" size={16} color="#B45309" />
              </View>
              <View style={styles.pointInfo}>
                <Text style={styles.pointName}>Biryani Box Hub (Cloud Kitchen)</Text>
                <Text style={styles.pointSub}>Anna Nagar West • Ready for pickup</Text>
              </View>
            </View>

            <View style={styles.routeLine} />

            {/* Customer Drop */}
            <View style={styles.pointRow}>
              <View style={styles.iconCircleCustomer}>
                <Ionicons name="location" size={16} color="#EF4444" />
              </View>
              <View style={styles.pointInfo}>
                <Text style={styles.pointName}>Customer: Arun Kumar</Text>
                <Text style={styles.pointSub}>12, Green Park Street, Chennai (2.1 km • 8 mins)</Text>
              </View>
            </View>
          </View>


          {/* Details Accordion */}
          {showDetails && (
            <View style={styles.detailsExpand}>
              <Text style={styles.detailItem}>• 1x Hyderabadi Dum Biryani</Text>
              <Text style={styles.detailItem}>• 1x Paneer Butter Masala Combo</Text>
              <Text style={styles.detailNote}>Special note: Handle with care, double sealed packaging.</Text>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionContainer}>
            <PrimaryButton
              title="Accept Order"
              onPress={handleAcceptOrder}
              loading={loading}
              style={styles.acceptBtn}
            />

            <TouchableOpacity
              style={styles.viewDetailsBtn}
              onPress={() => setShowDetails(!showDetails)}
            >
              <Text style={styles.viewDetailsText}>
                {showDetails ? 'Hide Details' : 'View Details'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.captionText}>
          New order notification with details. Rider accepts the order.
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    justifyContent: 'space-between',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  itemsPrice: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  badgeNew: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brandYellow,
  },
  badgeNewText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#B45309',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  routeBox: {
    position: 'relative',
    gap: 16,
    marginBottom: 20,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircleKitchen: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleCustomer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeLine: {
    position: 'absolute',
    left: 16,
    top: 32,
    width: 2,
    height: 24,
    backgroundColor: '#D1D5DB',
  },
  pointInfo: {
    flex: 1,
  },
  pointName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  pointSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  detailsExpand: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    gap: 4,
  },
  detailItem: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  detailNote: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  actionContainer: {
    gap: 10,
  },
  acceptBtn: {
    width: '100%',
  },
  viewDetailsBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
