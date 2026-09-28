/**
 * FEAzTO Rider - Incentive Service Contract & Mock Implementation
 * Section 20-24 Source of Truth
 */

import { mockIncentives } from '../../mocks/incentives';
import { IncentiveCampaign } from '../../types/incentive';

export interface IncentiveService {
  getActiveCampaigns(): Promise<IncentiveCampaign[]>;
  claimReward(campaignId: string): Promise<{ success: boolean; amount: number }>;
}

export class MockIncentiveService implements IncentiveService {
  async getActiveCampaigns(): Promise<IncentiveCampaign[]> {
    return mockIncentives;
  }

  async claimReward(campaignId: string): Promise<{ success: boolean; amount: number }> {
    const camp = mockIncentives.find((c) => c.id === campaignId);
    return { success: true, amount: camp ? camp.rewardAmount : 0 };
  }
}

export const incentiveService: IncentiveService = new MockIncentiveService();
