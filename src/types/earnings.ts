/**
 * FEAzTO Rider - Earnings Domain Types
 * Section 28 Source of Truth
 */

export interface EarningTransaction {
  id: string;
  orderId: string;
  timestamp: string;
  baseAmount: number;
  rainBonus: number;
  peakBonus: number;
  festivalBonus: number;
  tip: number;
  totalAmount: number;
  status: 'CREDITED' | 'PROCESSING' | 'PENDING';
}

export interface EarningsSummary {
  todayTotal: number;
  todayDeliveriesCount: number;
  todayDistanceKm: number;
  weeklyTotal: number;
  weeklyDeliveriesCount: number;
  monthlyTotal: number;
  cashoutAvailable: number;
  breakdown: {
    base: number;
    rain: number;
    peak: number;
    festival: number;
    tips: number;
  };
}

export interface PayoutRecord {
  id: string;
  payoutDate: string;
  amount: number;
  referenceId: string;
  bankAccountMasked: string;
  status: 'COMPLETED' | 'IN_TRANSIT' | 'FAILED';
}
