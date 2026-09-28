/**
 * FEAzTO Rider - Bottom Sheet / Modal Container
 * Source of truth: FEAzTO Rider Master Prompt Section 10
 */

import React from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
  contentStyle,
}) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom + spacing.md, spacing.xl);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={[styles.sheetContainer, { paddingBottom: bottomPadding }, contentStyle]}>
          {/* Grab handle indicator */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Close sheet"
              >
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.body}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

// Backwards-compatible export
export const BottomSheet = BottomSheetModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheetContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: colors.secondarySurface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
    maxHeight: '85%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  handle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  body: {
    padding: spacing.lg,
  },
});
