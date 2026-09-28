/**
 * FEAzTO Rider - Earnings Service Contract & Mock Implementation
 * Section 28 Source of Truth
 */

import { EarningsSummary, EarningTransaction } from '../../types/earnings';

export interface EarningsService {
  getSummary(): Promise<EarningsSummary>;
  getTransactions(): Promise<EarningTransaction[]>;
  requestInstantCashout(amount: number): Promise<{ success: boolean; referenceId: string }>;
}

export class MockEarningsService implements EarningsService {
  async getSummary(): Promise<EarningsSummary> {
    return {
      todayTotal: 960,
      todayDeliveriesCount: 7,
      todayDistanceKm: 34.2,
      weeklyTotal: 5840,
      weeklyDeliveriesCount: 42,
      monthlyTotal: 24200,
      cashoutAvailable: 1940,
      breakdown: {
        base: 580,
        rain: 180,
        peak: 120,
        festival: 0,
        tips: 80,
      },
    };
  }

  async getTransactions(): Promise<EarningTransaction[]> {
    return [
      {
        id: 'tx-01',
        orderId: '#FA2841',
        timestamp: '12:35 PM',
        baseAmount: 72,
        rainBonus: 30,
        peakBonus: 20,
        festivalBonus: 0,
        tip: 0,
        totalAmount: 122,
        status: 'PROCESSING',
      },
      {
        id: 'tx-02',
        orderId: '#FA2839',
        timestamp: '11:46 AM',
        baseAmount: 68,
        rainBonus: 30,
        peakBonus: 0,
        festivalBonus: 0,
        tip: 20,
        totalAmount: 118,
        status: 'CREDITED',
      },
    ];
  }

  async requestInstantCashout(amount: number): Promise<{ success: boolean; referenceId: string }> {
    return {
      success: true,
      referenceId: `FEAZ-PAY-${Date.now().toString().slice(-6)}`,
    };
  }
}

export const earningsService: EarningsService = new MockEarningsService();
