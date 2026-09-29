/**
 * Screen 4: Verification Process
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 4)
 * "System verifies the document (demo)."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';

export default function VerificationProcessScreen() {
  const router = useRouter();
  const setVerificationStatus = useAuthStore((state) => state.setVerificationStatus);

  const handleContinue = () => {
    setVerificationStatus('APPROVED');
    router.push('/(onboarding)/onboarding' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Document Verification Graphic */}
          <View style={styles.graphicCard}>
            <View style={styles.docIllustration}>
              <View style={styles.docHeaderLine} />
              <View style={styles.docLine} />
              <View style={styles.docLineShort} />

              <View style={styles.checkCircle}>
                <Ionicons name="checkmark-circle" size={54} color="#10B981" />
              </View>
            </View>
          </View>

          {/* Titles */}
          <Text style={styles.title}>Document Verified!</Text>
          <Text style={styles.subtitle}>
            Your documents have been successfully verified.
          </Text>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            style={styles.continueBtn}
          />
          <Text style={styles.captionText}>
            System verifies the document (demo).
          </Text>
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
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphicCard: {
    width: 220,
    height: 150,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  docIllustration: {
    width: 140,
    alignItems: 'center',
    gap: 8,
  },
  docHeaderLine: {
    width: '70%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  docLine: {
    width: '90%',
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
  },
  docLineShort: {
    width: '50%',
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginBottom: 8,
  },
  checkCircle: {
    marginTop: 4,
  },
  title: {
    ...typography.h2,
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 260,
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
