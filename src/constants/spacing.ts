/**
 * FEAzTO Rider Design System - Spacing & Radius
 * Source of truth: FEAzTO Rider Master Prompt Section 6 & 7
 */

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
} as const;

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 9999,
} as const;

export const layout = {
  // Safe touch target (min 44pt)
  minTouchTarget: 44,
  screenPaddingHorizontal: 16,
  cardPadding: 16,
  buttonHeight: 48,
  buttonHeightLarge: 54,
  inputHeight: 50,
  bottomBarHeight: 64,
  headerHeight: 56,
} as const;
