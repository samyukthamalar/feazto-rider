/**
 * FEAzTO Rider - Auth Stack Layout
 */

import { Stack } from 'expo-router';
import React from 'react';
import { colors } from '../../src/constants/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="verification-status" />
    </Stack>
  );
}
