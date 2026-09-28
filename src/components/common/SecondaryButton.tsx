/**
 * FEAzTO Rider - Secondary Outline / Surface Button
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

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'outline' | 'surface' | 'ghost';
  tone?: 'default' | 'yellow' | 'danger';
  icon?: React.ReactNode;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  size = 'md',
  fullWidth = false,
  style,
  textStyle,
  variant = 'outline',
  tone = 'default',
  icon,
}) => {
  const getBorderColor = () => {
    if (disabled) return colors.border;
    if (tone === 'yellow') return colors.brandYellow;
    if (tone === 'danger') return colors.danger;
    return colors.borderLight;
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    if (tone === 'yellow') return colors.brandYellow;
    if (tone === 'danger') return colors.danger;
    return colors.textPrimary;
  };

  const getBackgroundColor = (pressed: boolean) => {
    if (variant === 'ghost') {
      return pressed ? colors.borderLight : 'transparent';
    }
    if (variant === 'surface') {
      return pressed ? colors.elevatedSurface : colors.surface;
    }
    return pressed ? colors.secondarySurface : 'transparent';
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { height: 38, paddingHorizontal: spacing.md, minHeight: 38 };
      case 'lg':
        return { height: layout.buttonHeightLarge, paddingHorizontal: spacing.xxl, minHeight: layout.buttonHeightLarge };
      case 'md':
      default:
        return { height: layout.buttonHeight, paddingHorizontal: spacing.lg, minHeight: layout.minTouchTarget };
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
        {
          backgroundColor: getBackgroundColor(pressed),
          borderColor: variant === 'ghost' ? 'transparent' : getBorderColor(),
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
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
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...typography.button,
  },
});
