/**
 * FEAzTO Rider - Primary CTA Button
 * Source of truth: FEAzTO Rider Master Prompt Section 5, 6, 10
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, layout, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'yellow' | 'green' | 'danger';
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  size = 'md',
  fullWidth = false,
  style,
  textStyle,
  variant = 'yellow',
  icon,
}) => {
  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return colors.secondarySurface;
    if (variant === 'green') {
      return pressed ? '#43A45C' : colors.success;
    }
    if (variant === 'danger') {
      return pressed ? '#D94343' : colors.danger;
    }
    return pressed ? colors.brandYellowPressed : colors.brandYellow;
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    if (variant === 'green' || variant === 'danger') return colors.textPrimary;
    return colors.textInverse;
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { height: 38, paddingHorizontal: spacing.md, minHeight: 38 };
      case 'lg':
        return { height: layout.buttonHeightLarge, paddingHorizontal: spacing.xxl, minHeight: layout.buttonHeightLarge };
      case 'md':
      default:
        return { height: layout.buttonHeight, paddingHorizontal: spacing.xl, minHeight: layout.minTouchTarget };
    }
  };

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'sm':
        return { fontSize: 13 };
      case 'lg':
        return { fontSize: 16 };
      case 'md':
      default:
        return { fontSize: 15 };
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        { backgroundColor: getBackgroundColor(pressed) },
        disabled && styles.buttonDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'yellow' ? colors.textInverse : colors.textPrimary}
        />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, getTextSizeStyle(), { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    ...typography.button,
  },
});
