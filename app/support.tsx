/**
 * FEAzTO Rider - Partner Support & Help Center
 * Source of truth: FEAzTO Rider Master Prompt Section 29
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../src/components/common/Card';
import { InputField } from '../src/components/common/InputField';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SectionHeader } from '../src/components/common/SectionHeader';
import { Header } from '../src/components/navigation/Header';
import { colors } from '../src/constants/colors';
import { borderRadius, spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

const categories = [
  { id: 'KITCHEN', label: '🍳 Kitchen Delay / Packing Issue' },
  { id: 'CUSTOMER', label: '📍 Customer Address / Phone Unreachable' },
  { id: 'PAYMENT', label: '💳 Earning / Cashout / Incentive Query' },
  { id: 'VEHICLE', label: '🛵 Vehicle Breakdown / Puncture' },
  { id: 'APP', label: '📱 App Technical / GPS Telemetry Glitch' },
  { id: 'EMERGENCY', label: '🚨 Active Trip Incident / Road Safety' },
];

export default function SupportScreen() {
  const showToast = useUIStore((state) => state.showToast);
  const [selectedCat, setSelectedCat] = useState('KITCHEN');
  const [details, setDetails] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = () => {
    const ticketId = `FZ-TCK-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(ticketId);
    showToast(`Support Ticket ${ticketId} created (Simulated)`, 'success');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Rider Partner Support" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>How Can Operations Assist You?</Text>
        <Text style={styles.subtitle}>
          Select a category for rapid resolution by the FEAzTO hub dispatch team.
        </Text>

        {submittedTicket ? (
          <Card style={styles.ticketCard} variant="highlight">
            <Text style={styles.ticketBadge}>TICKET LOGGED (PROTOTYPE)</Text>
            <Text style={styles.ticketId}>{submittedTicket}</Text>
            <Text style={styles.ticketDesc}>
              Our dispatch officer has received your report. In a production build, this routes directly to the operations dashboard.
            </Text>
            <PrimaryButton
              title="Log Another Request"
              onPress={() => {
                setSubmittedTicket(null);
                setDetails('');
              }}
              style={styles.anotherBtn}
            />
          </Card>
        ) : (
          <View style={styles.form}>
            <SectionHeader title="Issue Category" />
            <View style={styles.catList}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catChip, selectedCat === cat.id && styles.catActive]}
                  onPress={() => setSelectedCat(cat.id)}
                >
                  <Text style={[styles.catText, selectedCat === cat.id && styles.catTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <InputField
              label="Describe Your Issue"
              value={details}
              onChangeText={setDetails}
              placeholder="Provide order # or kitchen details if applicable..."
              multiline
              numberOfLines={4}
              inputStyle={styles.multilineInput}
            />

            <PrimaryButton
              title="Submit Support Request"
              onPress={handleSubmit}
              style={styles.submitBtn}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.massive,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  catList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  catChip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  catActive: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
  },
  catText: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  catTextActive: {
    color: colors.brandYellow,
    fontWeight: '700',
  },
  multilineInput: {
    height: 90,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
  ticketCard: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  ticketBadge: {
    ...typography.caption,
    color: colors.brandYellow,
    letterSpacing: 1,
    fontWeight: '800',
  },
  ticketId: {
    ...typography.h2,
    color: colors.textPrimary,
    marginVertical: spacing.sm,
  },
  ticketDesc: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  anotherBtn: {
    marginTop: spacing.lg,
    width: '100%',
  },
});
