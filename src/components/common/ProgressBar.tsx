/**
 * FEAzTO Rider - Progress Bar
 * Source of truth: FEAzTO Rider Master Prompt Section 5, 10, 21
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius } from '../../constants/spacing';

interface ProgressBarProps {
  progress: number; // 0 to 1 or value
  total?: number; // if specified, progress = progress / total
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  color = colors.brandYellow,
  height = 8,
}) => {
  const percentage = Math.min(
    100,
    Math.max(0, total ? (progress / total) * 100 : progress * 100)
  );

  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${percentage}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.pill,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: borderRadius.pill,
  },
});
