/**
 * Screen 20: Logout
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 20)
 * "Logout option for security."
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScooterRiderIllustration } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useAuthStore } from '../src/store/authStore';
import { useUIStore } from '../src/store/uiStore';

export default function LogoutScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const showToast = useUIStore((state) => state.showToast);

  const handleLoginAgain = () => {
    logout();
    showToast('Session cleared. Please sign in to resume duty.', 'info');
    router.replace('/(auth)/login' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Delivery Rider on Scooter Illustration */}
          <ScooterRiderIllustration size={160} />

          {/* Heading */}
          <Text style={styles.title}>
            You have been logged out successfully!
          </Text>

          {/* Login Again Button */}
          <PrimaryButton
            title="Login Again"
            onPress={handleLoginAgain}
            style={styles.loginBtn}
          />
        </View>

        <Text style={styles.captionText}>
          Logout option for security.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  title: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginVertical: 24,
    lineHeight: 30,
  },
  loginBtn: {
    width: '100%',
    maxWidth: 320,
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
