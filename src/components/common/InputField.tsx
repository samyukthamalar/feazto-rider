/**
 * FEAzTO Rider - Mobile Input Field
 * Source of truth: FEAzTO Rider Master Prompt Section 5, 6, 10
 */

import React, { useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, layout, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helper,
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  clearable = false,
  onClear,
  disabled = false,
  value,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(Boolean(secureTextEntry));

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          Boolean(error) && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, disabled && styles.textDisabled, inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={colors.brandYellow}
          editable={!disabled}
          value={value}
          secureTextEntry={isPasswordHidden}
          {...props}
        />

        {clearable && Boolean(value) && onClear && (
          <Pressable onPress={onClear} hitSlop={8} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </Pressable>
        )}

        {secureTextEntry && (
          <Pressable
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            hitSlop={8}
            style={styles.eyeBtn}
          >
            <Text style={styles.eyeText}>{isPasswordHidden ? '👁️' : '🔒'}</Text>
          </Pressable>
        )}

        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helperText}>{helper}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.subtitle2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    height: layout.inputHeight,
    minHeight: layout.minTouchTarget,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  inputFocused: {
    borderColor: colors.brandYellow,
    backgroundColor: colors.secondarySurface,
  },
  inputError: {
    borderColor: colors.danger,
  },
  inputDisabled: {
    backgroundColor: colors.secondarySurface,
    borderColor: colors.border,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: 0,
  },
  textDisabled: {
    color: colors.textMuted,
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
  clearBtn: {
    padding: spacing.xs,
  },
  clearText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  eyeBtn: {
    padding: spacing.xs,
  },
  eyeText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    marginTop: spacing.xs,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
