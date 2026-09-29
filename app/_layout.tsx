/**
 * FEAzTO Rider - Root Navigation Layout
 * Source of truth: FEAzTO Rider Master Prompt Section 8
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DemoControlPanel } from '../src/components/common/DemoControlPanel';
import { colors } from '../src/constants/colors';
import { useUIStore } from '../src/store/uiStore';

import { ResponsiveShell } from '../src/utils/responsive';

export default function RootLayout() {
  const toasts = useUIStore((state) => state.toasts);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="dark" />

      <ResponsiveShell>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="order-received" options={{ headerShown: false }} />
          <Stack.Screen name="pickup-qr" options={{ headerShown: false }} />
          <Stack.Screen name="food-photo" options={{ headerShown: false }} />
          <Stack.Screen name="start-delivery" options={{ headerShown: false }} />
          <Stack.Screen name="navigate-customer" options={{ headerShown: false }} />
          <Stack.Screen name="arrive-destination" options={{ headerShown: false }} />
          <Stack.Screen name="call-customer" options={{ headerShown: false }} />
          <Stack.Screen name="confirm-delivery" options={{ headerShown: false }} />
          <Stack.Screen name="deliver-customer" options={{ headerShown: false }} />
          <Stack.Screen name="order-completed" options={{ headerShown: false }} />
          <Stack.Screen name="logout" options={{ headerShown: false }} />
          <Stack.Screen name="delivery" options={{ headerShown: false }} />
          <Stack.Screen name="slots" options={{ headerShown: false }} />
          <Stack.Screen name="incentives" options={{ headerShown: false }} />
          <Stack.Screen name="safety" options={{ headerShown: false }} />
          <Stack.Screen name="support" options={{ headerShown: false }} />
          <Stack.Screen name="demo" options={{ headerShown: false }} />
        </Stack>

        {/* Floating Demo Control & Toast Overlay */}
        <DemoControlPanel />

        {toasts.length > 0 && (
          <View style={styles.toastContainer} pointerEvents="none">
            {toasts.map((toast) => (
              <View key={toast.id} style={[styles.toast, toast.type === 'error' && styles.toastError, toast.type === 'success' && styles.toastSuccess]}>
                <Text style={styles.toastText}>{toast.message}</Text>
              </View>
            ))}
          </View>
        )}
      </ResponsiveShell>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
  },
  toast: {
    backgroundColor: colors.surface,
    borderColor: colors.brandYellow,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  toastSuccess: {
    borderColor: colors.success,
  },
  toastError: {
    borderColor: colors.danger,
  },
  toastText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
});
