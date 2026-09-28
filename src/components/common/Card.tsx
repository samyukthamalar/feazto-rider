/**
 * FEAzTO Rider - Surface Card Component
 * Source of truth: FEAzTO Rider Master Prompt Section 5, 6, 10
 */

import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'surface' | 'secondary' | 'highlight' | 'glass';
  onPress?: () => void;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'surface',
  onPress,
  padding = spacing.lg,
  ...props
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return colors.secondarySurface;
      case 'highlight':
        return colors.brandYellowSoft;
      case 'glass':
        return colors.cardGlass;
      case 'surface':
      default:
        return colors.surface;
    }
  };

  const getBorderColor = () => {
    if (variant === 'highlight') {
      return colors.brandYellow;
    }
    return colors.border;
  };

  const cardStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          cardStyle,
          pressed && styles.pressed,
          style,
        ]}
        accessibilityRole="button"
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.base, cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

// Alias GlassCard for backwards-compatible domain naming
export const GlassCard = Card;

const styles = StyleSheet.create({
  base: {
    width: '100%',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
});
