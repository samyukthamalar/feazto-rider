/**
 * FEAzTO Rider Design System - Brand & Semantic Colors
 * Source of truth: FEAzTO 20-Screen Reference Workflow
 * Palette: Clean modern surface, dark contrast typography, and signature FEAzTO Golden Yellow (#F5B700)
 */

export const colors = {
  // Screen Backgrounds (Clean modern light theme matching the 20-screen reference workflow)
  background: '#F8F9FA',
  surface: '#FFFFFF',
  secondarySurface: '#F3F4F6',
  elevatedSurface: '#FFFFFF',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderFocus: '#F5B700',

  // Typography
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textInverse: '#111827', // button text on yellow is black/dark
  textWhite: '#FFFFFF',

  // FEAzTO Signature Brand Colors
  brandYellow: '#F5B700',
  brandYellowSoft: '#FEF3C7',
  brandYellowTint: 'rgba(245, 183, 0, 0.15)',
  brandYellowPressed: '#E0A600',

  // Semantic Colors
  success: '#10B981',
  successSoft: '#D1FAE5',
  danger: '#EF4444',
  dangerSoft: '#FEE2E2',
  info: '#3B82F6',
  infoSoft: '#DBEAFE',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',

  // Operational / Rider States
  statusOffline: '#9CA3AF',
  statusOnline: '#10B981',
  statusOnDelivery: '#F5B700',
  statusOnBreak: '#3B82F6',

  // Overlays & Cards
  overlay: 'rgba(0, 0, 0, 0.5)',
  cardGlass: 'rgba(255, 255, 255, 0.95)',
} as const;

export type ColorKey = keyof typeof colors;
