/**
 * Screen 1: Splash Screen
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 1)
 * "App logo and branding with loading screen."
 */

import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScooterRiderIllustration } from "../src/components/brand/RiderIllustration";
import { PrimaryButton } from "../src/components/common/PrimaryButton";
import { WorkflowBar } from "../src/components/common/WorkflowBar";
import { colors } from "../src/constants/colors";
import { useResponsive } from "../src/utils/responsive";

export default function SplashScreen() {
  const router = useRouter();
  const { hp, wp } = useResponsive();

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={1} />
      <View style={styles.container}>
        <View style={[styles.content, { paddingTop: hp(10) }]}>
          {/* Logo & Branding */}
          <View style={styles.brandContainer}>
            <Text style={styles.logoText}>
              FEAz<Text style={styles.logoYellow}>TO</Text>
            </Text>
            <Text style={styles.tagline}>Fast, Fresh, Reliable.</Text>
          </View>

          {/* Delivery Scooter Illustration */}
          <View style={[styles.illustrationWrapper, { marginTop: hp(8) }]}>
            <ScooterRiderIllustration size={wp(78) > 340 ? 340 : wp(78)} />
          </View>
        </View>

        {/* Footer Action */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Continue to Login"
            onPress={() => router.push("/(auth)/login" as any)}
            style={styles.continueBtn}
            textStyle={styles.continueBtnText}
          />
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
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  brandContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 52,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: -1.5,
  },
  logoYellow: {
    color: "#FEC704",
  },
  tagline: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6D7681",
    marginTop: 8,
    letterSpacing: 0.1,
  },
  illustrationWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 36,
    alignItems: "center",
  },
  continueBtn: {
    width: "100%",
    height: 56,
    minHeight: 56,
    backgroundColor: "#FEC602",
    borderRadius: 24,
  },
  continueBtnText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
  },
});
