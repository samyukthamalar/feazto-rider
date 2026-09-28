/**
 * FEAzTO Rider - Incentive Campaigns & Weather Store
 * Source of truth: FEAzTO Rider Master Prompt Sections 19 - 24
 */

import { create } from 'zustand';
import { IncentiveCampaign, WeatherCondition, WeatherState } from '../types/incentive';

interface IncentiveState {
  campaigns: IncentiveCampaign[];
  weather: WeatherCondition;
  setWeatherState: (state: WeatherState) => void;
  incrementCampaignDeliveries: (count?: number) => void;
  resetIncentives: () => void;
}

const defaultCampaigns: IncentiveCampaign[] = [
  {
    id: 'inc-rain',
    type: 'RAIN',
    title: 'Monsoon Rain Surge',
    description: 'Heavy rain expected in Anna Nagar. Stay safe and earn extra.',
    rewardAmount: 30,
    bonusPerDelivery: 30,
    currentProgress: 3,
    targetProgress: 5,
    unit: 'deliveries',
    isActive: true,
    expiresIn: 'Active for next 2 hours',
  },
  {
    id: 'inc-festival',
    type: 'FESTIVAL',
    title: 'Pongal Festival Bonanza',
    description: 'Complete 15 deliveries to unlock your festival bonus.',
    rewardAmount: 500,
    currentProgress: 11,
    targetProgress: 15,
    unit: 'deliveries',
    isActive: true,
    expiresIn: 'Ends tonight at 23:59',
  },
  {
    id: 'inc-peak',
    type: 'PEAK',
    title: 'Evening Peak Hour Bonus',
    description: 'Extra ₹20 per order delivered between 17:00 – 20:00.',
    rewardAmount: 20,
    bonusPerDelivery: 20,
    currentProgress: 2,
    targetProgress: 4,
    unit: 'deliveries',
    isActive: true,
    timeWindow: '17:00 – 20:00',
  },
  {
    id: 'inc-streak',
    type: 'STREAK',
    title: 'Delivery Streak Challenge',
    description: 'Complete 10 consecutive deliveries without declines.',
    rewardAmount: 200,
    currentProgress: 6,
    targetProgress: 10,
    unit: 'deliveries',
    isActive: true,
    expiresIn: '4 remaining',
  },
  {
    id: 'inc-weekly',
    type: 'WEEKLY',
    title: 'Weekly Target Milestone',
    description: 'Hit 40 deliveries this week for ₹750 lump-sum bonus.',
    rewardAmount: 750,
    currentProgress: 32,
    targetProgress: 40,
    unit: 'deliveries',
    isActive: true,
    expiresIn: '8 remaining this week',
  },
];

const defaultWeather: WeatherCondition = {
  state: 'RAIN',
  temperatureCelsius: 27,
  conditionDescription: 'Moderate to Heavy Showers',
  rainProbabilityPercentage: 85,
  rainBonusActive: true,
  rainBonusPerDelivery: 30,
  safetyAdvisory: 'Slippery roads near Roundtana. Maintain safe following distance.',
  raincoatRecommended: true,
};

export const useIncentiveStore = create<IncentiveState>((set, get) => ({
  campaigns: defaultCampaigns,
  weather: defaultWeather,

  setWeatherState: (weatherState: WeatherState) => {
    let rainBonusActive = false;
    let rainBonusPerDelivery = 0;
    let raincoatRecommended = false;
    let conditionDescription = 'Clear Weather';
    let safetyAdvisory = 'Safe riding conditions across the zone.';
    let rainProbabilityPercentage = 10;

    switch (weatherState) {
      case 'NORMAL':
        conditionDescription = 'Clear & Dry';
        safetyAdvisory = 'Normal traffic conditions. Ride safe.';
        rainProbabilityPercentage = 10;
        break;
      case 'RAIN':
        conditionDescription = 'Scattered Rain Showers';
        rainBonusActive = true;
        rainBonusPerDelivery = 25;
        raincoatRecommended = true;
        safetyAdvisory = 'Slippery roads. Wear raincoat and helmet visor down.';
        rainProbabilityPercentage = 75;
        break;
      case 'HEAVY_RAIN':
        conditionDescription = 'Heavy Downpour & Thunder';
        rainBonusActive = true;
        rainBonusPerDelivery = 40;
        raincoatRecommended = true;
        safetyAdvisory = 'High caution: Waterlogging on low roads. Ride at safe speed.';
        rainProbabilityPercentage = 95;
        break;
      case 'HEAT':
        conditionDescription = 'Excessive Heat Advisory';
        conditionDescription = '38°C Harsh Afternoon Sun';
        safetyAdvisory = 'High temperature. Stay hydrated at partner kitchen stations.';
        rainProbabilityPercentage = 5;
        break;
      case 'STORM_ALERT':
        conditionDescription = 'Severe Weather Warning';
        safetyAdvisory = 'Strong wind gusts. Take shelter if visibility drops.';
        rainProbabilityPercentage = 90;
        break;
    }

    set({
      weather: {
        state: weatherState,
        temperatureCelsius: weatherState === 'HEAT' ? 38 : 26,
        conditionDescription,
        rainProbabilityPercentage,
        rainBonusActive,
        rainBonusPerDelivery,
        safetyAdvisory,
        raincoatRecommended,
      },
    });
  },

  incrementCampaignDeliveries: (count = 1) => {
    set((state) => ({
      campaigns: state.campaigns.map((camp) => {
        if (!camp.isActive) return camp;
        const newProgress = Math.min(camp.targetProgress, camp.currentProgress + count);
        return {
          ...camp,
          currentProgress: newProgress,
        };
      }),
    }));
  },

  resetIncentives: () =>
    set({
      campaigns: defaultCampaigns,
      weather: defaultWeather,
    }),
}));
