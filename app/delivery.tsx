/**
 * FEAzTO Rider - Delivery Lifecycle & Dispatch Management
 * Source of truth: FEAzTO Rider Master Prompt Section 25, 26, 27, 36
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../src/components/common/Card';
import { EmptyState } from '../src/components/common/EmptyState';
import { InputField } from '../src/components/common/InputField';
import { Pill } from '../src/components/common/Pill';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { StatusBadge } from '../src/components/common/StatusBadge';
import { NavigationCard } from '../src/components/delivery/NavigationCard';
import { Header } from '../src/components/navigation/Header';
import { colors } from '../src/constants/colors';
import { borderRadius, spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { CanonicalOrder } from '../src/types/order';
import { useOrderStore } from '../src/store/orderStore';
import { useRiderStore } from '../src/store/riderStore';
import { useUIStore } from '../src/store/uiStore';

export default function DeliveryScreen() {
  const router = useRouter();
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const pendingOffer = useOrderStore((state) => state.pendingOffer);
  const acceptOffer = useOrderStore((state) => state.acceptOffer);
  const declineOffer = useOrderStore((state) => state.declineOffer);
  const currentStage = useOrderStore((state) => state.currentStage);
  const advanceStage = useOrderStore((state) => state.advanceStage);
  const verifyDeliveryOtp = useOrderStore((state) => state.verifyDeliveryOtp);
  const showToast = useUIStore((state) => state.showToast);
  const incrementShiftTrip = useRiderStore((state) => state.incrementShiftTrip);

  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [completedReceipt, setCompletedReceipt] = useState<CanonicalOrder | null>(null);

  // 1. Pending Delivery Offer state (Section 25)
  if (pendingOffer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Incoming Delivery Offer" showBack showStatusBadge={false} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.offerCard} variant="highlight">
            <View style={styles.offerHeader}>
              <Text style={styles.offerTitle}>New Delivery Assignment</Text>
              <Text style={styles.offerId}>{pendingOffer.id}</Text>
            </View>

            <View style={styles.earningsBox}>
              <Text style={styles.earnLabel}>Estimated Earnings</Text>
              <Text style={styles.earnAmount}>₹{pendingOffer.earnings.totalEarning}</Text>
              <Text style={styles.earnBreakdown}>
                Base: ₹{pendingOffer.earnings.baseEarning} • Rain Surge: +₹{pendingOffer.earnings.rainBonus} • Peak: +₹{pendingOffer.earnings.peakBonus}
              </Text>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.pointRow}>
                <Text style={styles.pointIcon}>🍳</Text>
                <View style={styles.pointInfo}>
                  <Text style={styles.pointName}>{pendingOffer.kitchenName}</Text>
                  <Text style={styles.pointSub}>{pendingOffer.kitchenAddress} ({pendingOffer.pickupDistanceKm} km pickup)</Text>
                </View>
              </View>

              <View style={styles.routeDivider} />

              <View style={styles.pointRow}>
                <Text style={styles.pointIcon}>📍</Text>
                <View style={styles.pointInfo}>
                  <Text style={styles.pointName}>{pendingOffer.customer.name}</Text>
                  <Text style={styles.pointSub}>{pendingOffer.customer.address} ({pendingOffer.deliveryDistanceKm} km drop)</Text>
                </View>
              </View>
            </View>

            <View style={styles.offerActions}>
              <PrimaryButton
                title={`Accept Delivery Offer (₹${pendingOffer.earnings.totalEarning})`}
                onPress={() => {
                  acceptOffer();
                  showToast('Offer accepted! Starting navigation to kitchen.', 'success');
                }}
                style={styles.actionBtn}
              />

              <SecondaryButton
                title="Decline Offer"
                onPress={() => {
                  declineOffer();
                  showToast('Offer declined. Dispatch will reassign.', 'info');
                }}
                tone="danger"
                style={styles.actionBtn}
              />
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 2. Completed Delivery Receipt State (Section 27)
  if (completedReceipt) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Delivery Complete" showStatusBadge={false} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.receiptCard} variant="highlight">
            <View style={styles.celebrationCircle}>
              <Text style={styles.celebrationEmoji}>🎉</Text>
            </View>

            <Text style={styles.receiptTitle}>Delivery Completed!</Text>
            <Text style={styles.receiptSubtitle}>
              Order {completedReceipt.id} successfully verified & handed over.
            </Text>

            <View style={styles.receiptAmountBox}>
              <Text style={styles.receiptLabel}>CREDITED TO YOUR WALLET</Text>
              <Text style={styles.receiptAmount}>₹{completedReceipt.earnings.totalEarning}</Text>
            </View>

            <View style={styles.receiptBreakdown}>
              <View style={styles.receiptRow}>
                <Text style={styles.rLabel}>Base Pay</Text>
                <Text style={styles.rVal}>₹{completedReceipt.earnings.baseEarning}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.rLabel}>Monsoon Rain Surge</Text>
                <Text style={[styles.rVal, styles.rHighlight]}>+₹{completedReceipt.earnings.rainBonus}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.rLabel}>Peak Rush Bonus</Text>
                <Text style={[styles.rVal, styles.rHighlight]}>+₹{completedReceipt.earnings.peakBonus}</Text>
              </View>
              {completedReceipt.earnings.tip > 0 && (
                <View style={styles.receiptRow}>
                  <Text style={styles.rLabel}>Customer Tip</Text>
                  <Text style={[styles.rVal, styles.rGreen]}>+₹{completedReceipt.earnings.tip}</Text>
                </View>
              )}
            </View>

            <PrimaryButton
              title="Ready for Next Delivery →"
              onPress={() => {
                setCompletedReceipt(null);
                router.replace('/(tabs)');
              }}
              style={styles.receiptBtn}
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 3. No Active Order
  if (!activeOrder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Delivery Operations" showBack />
        <View style={styles.emptyContainer}>
          <EmptyState
            title="No Active Delivery"
            description="You are currently not on any delivery. Stay online and watch for new offers in your assigned slot."
            actionTitle="Return to Rider Home"
            onActionPress={() => router.push('/(tabs)')}
          />
        </View>
      </SafeAreaView>
    );
  }

  // 4. Active Delivery Lifecycle
  const isNavigatingToKitchen = currentStage === 'NAVIGATING_TO_KITCHEN' || currentStage === 'OFFER_PENDING';
  const isAtKitchen = currentStage === 'ARRIVED_AT_KITCHEN' || currentStage === 'PICKING_UP';
  const isNavigatingToCustomer = currentStage === 'NAVIGATING_TO_CUSTOMER' || currentStage === 'ARRIVED_AT_CUSTOMER' || currentStage === 'VERIFYING_DELIVERY';

  const handleAdvance = () => {
    if (currentStage === 'VERIFYING_DELIVERY') {
      const code = otpInput || '4821';
      const success = verifyDeliveryOtp(code);
      if (success) {
        incrementShiftTrip();
        setCompletedReceipt(activeOrder);
        showToast('Delivery verified! Earning credited to your wallet.', 'success');
      } else {
        setOtpError('Invalid customer OTP. Use 4821 or any 4 digits for demo.');
      }
      return;
    }

    advanceStage();
    showToast('Delivery stage updated', 'info');
  };

  const getActionLabel = () => {
    switch (currentStage) {
      case 'NAVIGATING_TO_KITCHEN':
        return 'I Have Arrived at Kitchen';
      case 'ARRIVED_AT_KITCHEN':
        return 'Verify & Collect Order';
      case 'PICKING_UP':
        return 'Confirm Pickup & Start Customer Navigation';
      case 'NAVIGATING_TO_CUSTOMER':
        return 'I Have Arrived at Customer Location';
      case 'ARRIVED_AT_CUSTOMER':
        return 'Begin Handover & Request OTP';
      case 'VERIFYING_DELIVERY':
        return 'Confirm Delivery OTP & Complete';
      default:
        return 'Advance Delivery Step';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={`Delivery ${activeOrder.id}`} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Navigation placeholder (Section 36) */}
        {isNavigatingToKitchen ? (
          <NavigationCard
            destinationType="KITCHEN"
            destinationName={activeOrder.kitchenName}
            address={activeOrder.kitchenAddress}
            distanceKm={activeOrder.pickupDistanceKm}
            estimatedMinutes={6}
            notes="Dedicated partner parking available at side entrance"
          />
        ) : (
          <NavigationCard
            destinationType="CUSTOMER"
            destinationName={activeOrder.customer.name}
            address={activeOrder.customer.address}
            distanceKm={activeOrder.deliveryDistanceKm}
            estimatedMinutes={14}
            notes={activeOrder.customer.deliveryInstructions}
          />
        )}

        {/* Order Details Card */}
        <Card style={styles.orderCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardId}>{activeOrder.id}</Text>
              <Text style={styles.cardStatus}>{activeOrder.status}</Text>
            </View>
            <StatusBadge label={currentStage.replace(/_/g, ' ')} variant="on_delivery" size="sm" pulse />
          </View>

          {/* Item List */}
          <View style={styles.itemsList}>
            <Text style={styles.itemsTitle}>Order Items ({activeOrder.itemCount} items)</Text>
            {activeOrder.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName}>• {item.quantity}x {item.name}</Text>
                <Pill label={item.isVeg ? 'VEG' : 'NON-VEG'} tone={item.isVeg ? 'green' : 'danger'} />
              </View>
            ))}
          </View>

          {/* OTP Input for Verification Stage (Section 27) */}
          {currentStage === 'VERIFYING_DELIVERY' && (
            <View style={styles.otpBox}>
              <Text style={styles.otpTitle}>Customer Handover Verification</Text>
              <Text style={styles.otpDesc}>
                Ask the customer for their 4-digit handover OTP. (Demo code: {activeOrder.verificationOtp || '4821'})
              </Text>
              <InputField
                label="Customer 4-Digit Handover PIN"
                value={otpInput}
                onChangeText={(val) => {
                  setOtpInput(val);
                  if (otpError) setOtpError('');
                }}
                keyboardType="number-pad"
                maxLength={4}
                placeholder="4821"
                error={otpError}
                clearable
                onClear={() => setOtpInput('')}
              />
            </View>
          )}

          {/* Guaranteed earnings row */}
          <View style={styles.earningRow}>
            <Text style={styles.earningLabel}>Guaranteed Earning</Text>
            <Text style={styles.earningAmount}>₹{activeOrder.earnings.totalEarning}</Text>
          </View>
        </Card>

        {/* Primary Action Button */}
        <PrimaryButton
          title={getActionLabel()}
          onPress={handleAdvance}
          style={styles.mainActionBtn}
        />

        {/* Support shortcut */}
        <SecondaryButton
          title="Delivery Issue / Contact Operations"
          onPress={() => router.push('/support')}
          variant="surface"
          style={styles.supportBtn}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  offerCard: {
    padding: spacing.lg,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  offerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  offerId: {
    ...typography.subtitle1,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  earningsBox: {
    backgroundColor: colors.secondarySurface,
    padding: spacing.md,
    borderRadius: 8,
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  earnLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  earnAmount: {
    ...typography.h1,
    color: colors.brandYellow,
    fontSize: 32,
    marginVertical: 2,
  },
  earnBreakdown: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
  },
  routeContainer: {
    marginVertical: spacing.sm,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  pointIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  pointInfo: {
    flex: 1,
  },
  pointName: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  pointSub: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  routeDivider: {
    width: 2,
    height: 18,
    backgroundColor: colors.borderLight,
    marginLeft: 8,
    marginVertical: 4,
  },
  offerActions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionBtn: {
    width: '100%',
  },
  orderCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cardId: {
    ...typography.subtitle1,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  cardStatus: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  itemsList: {
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  itemsTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    ...typography.body2,
    color: colors.textPrimary,
  },
  otpBox: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  otpTitle: {
    ...typography.subtitle2,
    color: colors.brandYellow,
  },
  otpDesc: {
    ...typography.caption,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  earningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  earningLabel: {
    ...typography.subtitle2,
    color: colors.textSecondary,
  },
  earningAmount: {
    ...typography.h3,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  mainActionBtn: {
    marginBottom: spacing.sm,
  },
  supportBtn: {
    marginBottom: spacing.lg,
  },
  receiptCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  celebrationCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  celebrationEmoji: {
    fontSize: 32,
  },
  receiptTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  receiptSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  receiptAmountBox: {
    backgroundColor: colors.secondarySurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: '100%',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  receiptLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  receiptAmount: {
    ...typography.statValue,
    color: colors.brandYellow,
    fontSize: 36,
    marginVertical: 4,
  },
  receiptBreakdown: {
    width: '100%',
    gap: spacing.xs + 2,
    marginBottom: spacing.xl,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  rLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rVal: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  rHighlight: {
    color: colors.brandYellow,
  },
  rGreen: {
    color: colors.success,
  },
  receiptBtn: {
    width: '100%',
  },
});
