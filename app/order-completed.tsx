/**
 * Screen 16: Order Completed
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 16)
 * "Order successfully completed."
 */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CelebrationIllustration } from "../src/components/brand/RiderIllustration";
import { PrimaryButton } from "../src/components/common/PrimaryButton";
import { colors } from "../src/constants/colors";
import { typography } from "../src/constants/typography";
import { useUIStore } from "../src/store/uiStore";
import { riderService } from "../services";
import { useRiderStore } from "../src/store/riderStore";


export default function OrderCompletedScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);

  const handleGoHome = async () => {
    // Rider remains ONLINE unless manually switched offline
    useRiderStore.getState().goOnline();
    await riderService.updateDutyStatus(true);
    showToast("Earnings credited to wallet (+₹286)! You are ONLINE.", "success");
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Completed</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Trophy & Confetti celebration graphic */}
          <CelebrationIllustration size={120} />

          {/* Heading */}
          <Text style={styles.title}>Great Job!</Text>
          <Text style={styles.subtitle}>You&apos;ve completed the order.</Text>

          {/* Delivery Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Order ID</Text>
              <Text style={styles.summaryValue}>#2FS28734</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Time</Text>
              <Text style={styles.summaryValue}>18 mins</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Earnings Earned</Text>
              <Text style={[styles.summaryValue, styles.earningsGreen]}>+₹286.00</Text>
            </View>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Return to Home"
            onPress={handleGoHome}
            style={styles.homeBtn}
          />
          <Text style={styles.captionText}>Order successfully completed.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
  },
  payoutTag: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: colors.brandYellow,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 24,
  },
  payoutLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.8,
  },
  payoutAmount: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginTop: 2,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  homeBtn: {
    width: "100%",
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
  },
  summaryCard: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 20,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "800",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  earningsGreen: {
    color: "#059669",
    fontSize: 17,
  },
});

