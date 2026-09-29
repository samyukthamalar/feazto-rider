/**
 * Screen 13: Call Customer
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 13)
 * "Call the customer before delivery."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

import * as Linking from 'expo-linking';
import { useOrderStore } from '../src/store/orderStore';

export default function CallCustomerScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [calling, setCalling] = useState(false);

  const handleCall = async () => {
    setCalling(true);
    const phoneNumber = '+919876543210';
    try {
      const url = `tel:${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        showToast('Opening native phone dialer for Arun Kumar...', 'info');
      } else {
        showToast(`Dialer unavailable. Dial: ${phoneNumber}`, 'info');
      }
    } catch {
      showToast(`Calling ${phoneNumber}...`, 'info');
    } finally {
      setCalling(false);
    }
  };

  const handleMessage = async () => {
    const phoneNumber = '+919876543210';
    try {
      const url = `sms:${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        showToast('SMS app opened for +91 98765 43210', 'info');
      }
    } catch {
      showToast('SMS sent: "FEAzTO Rider has arrived at your doorstep."', 'info');
    }
  };

  const handleProceed = () => {
    useOrderStore.getState().advanceStage();
    showToast('Customer contacted. Proceeding to delivery confirmation.', 'success');
    router.push('/confirm-delivery' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Customer</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Customer Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={54} color="#1E293B" />
          </View>
          <Text style={styles.customerName}>Arun Kumar</Text>
          <Text style={styles.customerPhone}>+91 98765 43210</Text>
          <Text style={styles.customerAddress}>12, Green Park Street, Chennai</Text>
          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryBadgeText}>Order #2FS28734</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsCard}>
          <PrimaryButton
            title={calling ? 'Opening Dialer...' : 'Call Customer'}
            onPress={handleCall}
            loading={calling}
            style={styles.callBtn}
            icon={<Ionicons name="call" size={18} color="#111827" style={{ marginRight: 6 }} />}
          />

          <SecondaryButton
            title="Send SMS"
            onPress={handleMessage}
            variant="surface"
            style={styles.messageBtn}
            icon={<Ionicons name="chatbubble-outline" size={18} color="#111827" style={{ marginRight: 6 }} />}
          />

          <TouchableOpacity
            style={styles.proceedLink}
            onPress={handleProceed}
          >
            <Text style={styles.proceedText}>Confirm Contact & Handover Food →</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.captionText}>
          Call the customer before delivery.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  customerName: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  customerPhone: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
  customerAddress: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  deliveryBadge: {

    marginTop: 12,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliveryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  actionsCard: {
    width: '100%',
    gap: 12,
    marginTop: 16,
  },
  callBtn: {
    width: '100%',
  },
  messageBtn: {
    width: '100%',
  },
  proceedLink: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 4,
  },
  proceedText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
