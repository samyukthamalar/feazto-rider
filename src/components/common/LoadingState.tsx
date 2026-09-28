/**
 * FEAzTO Rider - Loading State
 * Section 35 Source of Truth
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading FEAzTO Operations...',
  subMessage = 'Connecting to real-time dispatch node',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.brandYellow} />
      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  message: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  subMessage: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
