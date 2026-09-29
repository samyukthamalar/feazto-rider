/**
 * Screen 6: Home Dashboard
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 6)
 * "Main dashboard with online status and quick actions."
 */

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { earningsService, riderService } from "../../services";
import { PrimaryButton } from "../../src/components/common/PrimaryButton";
import { colors } from "../../src/constants/colors";
import { typography } from "../../src/constants/typography";
import { useUIStore } from "../../src/store/uiStore";

export default function HomeDashboardScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [isOnline, setIsOnline] = useState(false);
  const [hasIncomingOrder, setHasIncomingOrder] = useState(false);
  const [earningsAmount, setEarningsAmount] = useState('₹1,250');
  const [pendingCount, setPendingCount] = useState(1);
  const [rating, setRating] = useState('4.8');

  const loadDashboardStats = useCallback(async () => {
    try {
      const [earningsData, profileData, currentDuty] = await Promise.all([
        earningsService.getEarningsSummary('today'),
        riderService.getProfile(),
        riderService.getDutyStatus(),
      ]);
      setIsOnline(currentDuty);
      if (currentDuty) {
        setHasIncomingOrder(true);
      }
      if (earningsData) {
        setEarningsAmount(`₹${earningsData.totalEarnings.toLocaleString('en-IN')}`);
        setPendingCount(earningsData.completedDeliveries > 0 ? 0 : 1);
      }
      if (profileData) {
        setRating(profileData.rating.toString());
      }
    } catch {
      // use defaults
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDashboardStats();
    }, [loadDashboardStats])
  );

  const handleToggleOnline = async () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    await riderService.updateDutyStatus(nextStatus);
    if (nextStatus) {
      showToast('You are now ONLINE and ready to receive orders!', 'success');
      setTimeout(() => {
        setHasIncomingOrder(true);
        showToast('🔔 New Delivery Request: Order #2FS28734 from Biryani Box Hub (₹286)', 'info');
      }, 700);
    } else {
      setHasIncomingOrder(false);
      showToast('You are now OFFLINE. You cannot receive orders.', 'info');
    }
  };

  const handleViewOrders = () => {
    if (!isOnline) {
      showToast('You are currently offline. Turn Online to view and receive orders.', 'warning');
      return;
    }
    router.push('/order-received');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar with Online Status */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>
          FEAz<Text style={styles.logoYellow}>TO</Text>
        </Text>

        <TouchableOpacity
          style={[
            styles.statusPill,
            isOnline ? styles.pillOnline : styles.pillOffline,
          ]}
          onPress={handleToggleOnline}
        >
          <View
            style={[
              styles.statusDot,
              isOnline ? styles.dotOnline : styles.dotOffline,
            ]}
          />
          <Text
            style={[
              styles.statusText,
              isOnline ? styles.textOnline : styles.textOffline,
            ]}
          >
            {isOnline ? "Online" : "Offline"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Today's Orders Card */}
        <View style={styles.ordersCard}>
          <Text style={styles.cardHeading}>Today&apos;s Orders</Text>

          <View style={styles.statsRow}>
            {/* Pending */}
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{isOnline ? (hasIncomingOrder ? 1 : 0) : 0}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>

            <View style={styles.statDivider} />

            {/* Earnings */}
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{earningsAmount}</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>

            <View style={styles.statDivider} />

            {/* Rating */}
            <View style={styles.statItem}>
              <View style={styles.ratingRow}>
                <Text style={styles.statVal}>{rating}</Text>
                <Ionicons name="star" size={14} color="#F59E0B" />
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Status Banner */}
          {!isOnline ? (
            <View style={styles.offlineNotice}>
              <Ionicons name="moon-outline" size={16} color="#6B7280" />
              <Text style={styles.offlineNoticeText}>
                You are offline. Switch to Online above to receive orders.
              </Text>
            </View>
          ) : hasIncomingOrder ? (
            <TouchableOpacity
              style={styles.incomingOrderBanner}
              onPress={() => router.push('/order-received')}
              activeOpacity={0.85}
            >
              <View style={styles.incomingBadge}>
                <Ionicons name="flash" size={14} color="#B45309" />
                <Text style={styles.incomingBadgeText}>NEW REQUEST</Text>
              </View>
              <Text style={styles.incomingTitle}>Order #2FS28734 • ₹286</Text>
              <Text style={styles.incomingSub}>Biryani Box Hub → Arun Kumar (2.1 km)</Text>
            </TouchableOpacity>
          ) : null}

          <PrimaryButton
            title={isOnline ? "View Orders" : "Go Online to View Orders"}
            onPress={isOnline ? handleViewOrders : handleToggleOnline}
            style={styles.viewOrdersBtn}
          />
        </View>


        {/* Quick Actions List */}
        <View style={styles.menuContainer}>
          {/* My Earnings */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(tabs)/earnings")}
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
            onPress={() => router.push("/(tabs)/profile")}
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
            onPress={() => router.push("/(tabs)/profile")}
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
    backgroundColor: "#F8F9FA",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -0.8,
  },
  logoYellow: {
    color: colors.brandYellow,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  pillOnline: {
    backgroundColor: "#D1FAE5",
  },
  pillOffline: {
    backgroundColor: "#F3F4F6",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotOnline: {
    backgroundColor: "#10B981",
  },
  dotOffline: {
    backgroundColor: "#9CA3AF",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  textOnline: {
    color: "#065F46",
  },
  textOffline: {
    color: "#6B7280",
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  ordersCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeading: {
    ...typography.subtitle1,
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statVal: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#E5E7EB",
  },
  viewOrdersBtn: {
    width: "100%",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 12,
  },
  offlineNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
    marginBottom: 16,
  },
  offlineNoticeText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
    flex: 1,
  },
  incomingOrderBanner: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1.5,
    borderColor: colors.brandYellow,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 4,
  },
  incomingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  incomingBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#B45309",
    letterSpacing: 0.5,
  },
  incomingTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },
  incomingSub: {
    fontSize: 12,
    color: "#78350F",
    fontWeight: "600",
  },
});

