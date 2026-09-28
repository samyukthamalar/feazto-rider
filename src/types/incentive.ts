/**
 * FEAzTO Rider - Incentive & Weather Domain Types
 * Sections 11, 19, 20, 21, 22, 23, 24 Source of Truth
 */

export type IncentiveType = 'FESTIVAL' | 'RAIN' | 'PEAK' | 'STREAK' | 'WEEKLY';

export interface IncentiveCampaign {
  id: string;
  type: IncentiveType;
  title: string;
  description: string;
  rewardAmount: number;
  currentProgress: number;
  targetProgress: number;
  unit: string; // e.g. "deliveries" or "trips"
  isActive: boolean;
  timeWindow?: string;
  expiresIn?: string;
  bonusPerDelivery?: number;
}

export type WeatherState = 'NORMAL' | 'RAIN' | 'HEAVY_RAIN' | 'HEAT' | 'STORM_ALERT';

export interface WeatherCondition {
  state: WeatherState;
  temperatureCelsius: number;
  conditionDescription: string;
  rainProbabilityPercentage: number;
  rainBonusActive: boolean;
  rainBonusPerDelivery: number;
  safetyAdvisory: string;
  raincoatRecommended: boolean;
}
