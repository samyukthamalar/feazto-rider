/**
 * Screen 5: Onboarding
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 5)
 * "Shows success message after verification."
 */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "../../src/components/common/PrimaryButton";
import { colors } from "../../src/constants/colors";
import { spacing } from "../../src/constants/spacing";
import { typography } from "../../src/constants/typography";
import { useAuthStore } from "../../src/store/authStore";
import { useRiderStore } from "../../src/store/riderStore";
import { riderService } from "../../services";

export default function OnboardingScreen() {
  const router = useRouter();
  const setIsOnboarded = useAuthStore((state) => state.setIsOnboarded);

  const handleGetStarted = async () => {
    setIsOnboarded(true);
    useRiderStore.getState().goOffline();
    await riderService.updateDutyStatus(false);
    router.replace("/(tabs)" as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Avatar Icon with Verification Badge */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={56} color="#1E293B" />
            </View>
            <View style={styles.badgeCircle}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </View>
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Welcome, Rider!</Text>
          <Text style={styles.subtitle}>
            You&apos;re all set to start delivering.
          </Text>
        </View>

        {/* Footer Action */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Get Started"
            onPress={handleGetStarted}
            style={styles.startBtn}
          />
          <Text style={styles.captionText}>
            Shows success message after verification.
          </Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: spacing.xl,
  },
  avatarCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#E2E8F0",
  },
  badgeCircle: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...typography.h2,
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  startBtn: {
    width: "100%",
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
  },
});
