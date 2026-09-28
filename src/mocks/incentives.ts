/**
 * FEAzTO Rider - Mock Incentives Data
 * Sections 20-24 Source of Truth
 */

import { IncentiveCampaign } from '../types/incentive';

export const mockIncentives: IncentiveCampaign[] = [
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
