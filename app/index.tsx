/**
 * Screen 1: Splash Screen
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 1)
 * "App logo and branding with loading screen."
 */

import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScooterRiderIllustration } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { WorkflowBar } from '../src/components/common/WorkflowBar';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={1} />

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Logo & Branding */}
          <View style={styles.brandContainer}>
            <Text style={styles.logoText}>
              FEAz<Text style={styles.logoYellow}>TO</Text>
            </Text>
            <Text style={styles.tagline}>Fast, Fresh, Reliable.</Text>
          </View>

          {/* Delivery Scooter Illustration */}
          <View style={styles.illustrationWrapper}>
            <ScooterRiderIllustration size={180} />
          </View>

          {/* Subtle loading indicator text */}
          <View style={styles.loadingBox}>
            <View style={styles.pulseDot} />
            <Text style={styles.loadingText}>Initializing Rider Network...</Text>
          </View>
        </Animated.View>

        {/* Footer Action */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Continue to Login"
            onPress={() => router.push('/(auth)/login' as any)}
            style={styles.continueBtn}
          />
          <Text style={styles.captionText}>App logo and branding with loading screen.</Text>
        </View>
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -1.5,
  },
  logoYellow: {
    color: colors.brandYellow,
  },
  tagline: {
    ...typography.subtitle1,
    color: colors.textSecondary,
    marginTop: 6,
    letterSpacing: 0.2,
  },
  illustrationWrapper: {
    marginVertical: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brandYellow,
  },
  loadingText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  continueBtn: {
    width: '100%',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
