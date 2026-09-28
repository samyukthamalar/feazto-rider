/**
 * FEAzTO Rider - Onboarding Stack Layout
 */

import { Stack } from 'expo-router';
import React from 'react';
import { colors } from '../../src/constants/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="personal-details" />
      <Stack.Screen name="licence" />
      <Stack.Screen name="vehicle" />
      <Stack.Screen name="documents" />
      <Stack.Screen name="bank-upi" />
      <Stack.Screen name="review" />
    </Stack>
  );
}
