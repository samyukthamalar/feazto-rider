/**
 * FEAzTO Rider Design System - Typography
 * Source of truth: FEAzTO Rider Master Prompt Section 5 & 6
 */

import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.textSecondary,
  },
  body1: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  body2: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    color: colors.textMuted,
  },
  button: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    color: colors.brandYellow,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
};
