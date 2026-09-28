/**
 * FEAzTO Rider - Mobile Responsiveness Engine
 * Source of truth: FEAzTO Rider Master Prompt Section 6
 * Supports: 320pt, 360pt, 375pt, 390pt, 393pt, 412pt, 430pt, foldables, tablets & web preview
 */

import { Dimensions, PixelRatio, Platform, useWindowDimensions, View, ViewStyle } from 'react-native';
import React from 'react';

// Standard guideline viewport (iPhone 13 / 14 baseline)
const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

/**
 * Static scaling helpers for initial StyleSheet definitions
 */
export const getWindowDimensions = () => Dimensions.get('window');

export const scale = (size: number): number => {
  const { width } = Dimensions.get('window');
  return Math.round(PixelRatio.roundToNearestPixel((width / GUIDELINE_BASE_WIDTH) * size));
};

export const verticalScale = (size: number): number => {
  const { height } = Dimensions.get('window');
  return Math.round(PixelRatio.roundToNearestPixel((height / GUIDELINE_BASE_HEIGHT) * size));
};

export const moderateScale = (size: number, factor = 0.5): number => {
  const { width } = Dimensions.get('window');
  const rawScale = (width / GUIDELINE_BASE_WIDTH) * size;
  return Math.round(PixelRatio.roundToNearestPixel(size + (rawScale - size) * factor));
};

export const wp = (percentage: number): number => {
  const { width } = Dimensions.get('window');
  return Math.round((percentage * width) / 100);
};

export const hp = (percentage: number): number => {
  const { height } = Dimensions.get('window');
  return Math.round((percentage * height) / 100);
};

export const clamp = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(val, min), max);
};

/**
 * Reactive hook for screen size changes, orientation, and split-screen
 */
export interface ResponsiveLayout {
  width: number;
  height: number;
  isSmallDevice: boolean;    // < 360pt (e.g., iPhone SE 1st gen, Galaxy Fold outer screen)
  isCompactDevice: boolean;  // 360pt - 375pt (e.g., iPhone 13 mini, Galaxy S21)
  isStandardDevice: boolean; // 376pt - 411pt (e.g., iPhone 14, iPhone 15/16 Pro)
  isLargeDevice: boolean;    // 412pt - 599pt (e.g., Pixel 7/8, iPhone Pro Max, Galaxy Ultra)
  isTablet: boolean;         // >= 600pt (iPads, Android tablets, wide desktop preview)
  isLandscape: boolean;
  scale: (size: number) => number;
  verticalScale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
  wp: (percentage: number) => number;
  hp: (percentage: number) => number;
  horizontalPadding: number;
  cardPadding: number;
  containerMaxWidth: number | undefined;
}

export function useResponsive(): ResponsiveLayout {
  const { width, height } = useWindowDimensions();

  const isSmallDevice = width < 360;
  const isCompactDevice = width >= 360 && width <= 375;
  const isStandardDevice = width > 375 && width <= 411;
  const isLargeDevice = width >= 412 && width < 600;
  const isTablet = width >= 600;
  const isLandscape = width > height;

  const dynamicScale = (size: number) => {
    // Clamp effective width on wide desktop previews so sizes don't explode
    const effectiveWidth = Math.min(width, 480);
    return Math.round(PixelRatio.roundToNearestPixel((effectiveWidth / GUIDELINE_BASE_WIDTH) * size));
  };

  const dynamicVerticalScale = (size: number) => {
    const effectiveHeight = Math.min(height, 920);
    return Math.round(PixelRatio.roundToNearestPixel((effectiveHeight / GUIDELINE_BASE_HEIGHT) * size));
  };

  const dynamicModerateScale = (size: number, factor = 0.5) => {
    const effectiveWidth = Math.min(width, 480);
    const rawScale = (effectiveWidth / GUIDELINE_BASE_WIDTH) * size;
    return Math.round(PixelRatio.roundToNearestPixel(size + (rawScale - size) * factor));
  };

  const dynamicWp = (percentage: number) => {
    const effectiveWidth = isTablet ? 480 : width;
    return Math.round((percentage * effectiveWidth) / 100);
  };

  const dynamicHp = (percentage: number) => {
    return Math.round((percentage * height) / 100);
  };

  // Adaptive spacing based on screen width
  const horizontalPadding = isSmallDevice ? 12 : isCompactDevice ? 14 : isLargeDevice ? 20 : 16;
  const cardPadding = isSmallDevice ? 12 : isCompactDevice ? 14 : 16;

  // On Web / desktop / tablet, constraint container to realistic native phone width
  const containerMaxWidth = isTablet ? 480 : undefined;

  return {
    width,
    height,
    isSmallDevice,
    isCompactDevice,
    isStandardDevice,
    isLargeDevice,
    isTablet,
    isLandscape,
    scale: dynamicScale,
    verticalScale: dynamicVerticalScale,
    moderateScale: dynamicModerateScale,
    wp: dynamicWp,
    hp: dynamicHp,
    horizontalPadding,
    cardPadding,
    containerMaxWidth,
  };
}

/**
 * Responsive Shell Component
 * Automatically wraps content with proper max-width and centering on Web / Tablet,
 * while allowing 100% full native screen utilization on mobile devices.
 */
interface ResponsiveShellProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ResponsiveShell: React.FC<ResponsiveShellProps> = ({ children, style }) => {
  const { isTablet, containerMaxWidth } = useResponsive();

  if (isTablet) {
    return (
      <View
        style={[
          {
            flex: 1,
            width: '100%',
            backgroundColor: '#050505',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            maxWidth: containerMaxWidth || 480,
            backgroundColor: '#0B0B0B',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={[{ flex: 1, width: '100%' }, style]}>
      {children}
    </View>
  );
};
