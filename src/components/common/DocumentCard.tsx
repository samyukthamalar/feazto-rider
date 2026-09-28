/**
 * FEAzTO Rider Design System - DocumentCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 10 & 14
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Card } from './Card';
import { Pill } from './Pill';

interface DocumentCardProps {
  title: string;
  subtitle: string;
  isUploaded: boolean;
  onToggleUpload?: () => void;
  documentNumber?: string;
  required?: boolean;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  subtitle,
  isUploaded,
  onToggleUpload,
  documentNumber,
  required = true,
}) => {
  return (
    <Card style={styles.card} variant="surface">
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>{isUploaded ? '📄' : '📁'}</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {required && <Text style={styles.requiredAsterisk}>*</Text>}
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {documentNumber ? (
            <Text style={styles.docNumber}>Doc #: {documentNumber}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={onToggleUpload}
          disabled={!onToggleUpload}
          style={styles.action}
        >
          <Pill
            label={isUploaded ? 'Attached ✓' : 'Upload +'}
            tone={isUploaded ? 'green' : 'yellow'}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.secondarySurface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  details: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  title: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  requiredAsterisk: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  docNumber: {
    ...typography.caption,
    color: colors.brandYellow,
    marginTop: 4,
    fontSize: 10,
    fontWeight: '600',
  },
  action: {
    alignItems: 'flex-end',
  },
});
