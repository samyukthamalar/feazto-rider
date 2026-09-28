/**
 * FEAzTO Rider - Centralized Earnings & Financial Settlement Store
 * Source of truth: FEAzTO Rider Master Prompt Section 28 & 41
 *
 * All arithmetic is centralized here to avoid duplication across screens.
 */

import { create } from 'zustand';
import { EarningsSummary, EarningTransaction, PayoutRecord } from '../types/earnings';
import { CanonicalOrder } from '../types/order';

interface EarningsState {
  todayDeliveriesCount: number;
  todayDistanceKm: number;
  breakdown: {
    base: number;
    rain: number;
    peak: number;
    festival: number;
    tips: number;
  };
  weeklyTotal: number;
  monthlyTotal: number;
  cashoutAvailable: number;
  transactions: EarningTransaction[];
  payouts: PayoutRecord[];
  isCashoutLoading: boolean;

  // Centralized calculations
  getTodayTotal: () => number;
  creditOrderEarnings: (order: CanonicalOrder) => void;
  requestCashout: (amount?: number) => Promise<{ success: boolean; referenceId: string; message: string }>;
  resetEarnings: () => void;
}

const initialBreakdown = {
  base: 580,
  rain: 180,
  peak: 120,
  festival: 0,
  tips: 80,
};

const initialTransactions: EarningTransaction[] = [
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
    status: 'CREDITED',
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
  {
    id: 'tx-03',
    orderId: '#FA2838',
    timestamp: '10:50 AM',
    baseAmount: 60,
    rainBonus: 30,
    peakBonus: 0,
    festivalBonus: 0,
    tip: 0,
    totalAmount: 90,
    status: 'CREDITED',
  },
];

const initialPayouts: PayoutRecord[] = [
  {
    id: 'pay-01',
    payoutDate: 'Yesterday, 23:59',
    amount: 1420,
    referenceId: 'FEAZ-UTR-908124',
    bankAccountMasked: '••••••••8492',
    status: 'COMPLETED',
  },
  {
    id: 'pay-02',
    payoutDate: '25 Sep 2026, 23:59',
    amount: 1280,
    referenceId: 'FEAZ-UTR-907641',
    bankAccountMasked: '••••••••8492',
    status: 'COMPLETED',
  },
];

export const useEarningsStore = create<EarningsState>((set, get) => ({
  todayDeliveriesCount: 7,
  todayDistanceKm: 34.2,
  breakdown: initialBreakdown,
  weeklyTotal: 5840,
  monthlyTotal: 24200,
  cashoutAvailable: 1940,
  transactions: initialTransactions,
  payouts: initialPayouts,
  isCashoutLoading: false,

  getTodayTotal: () => {
    const { breakdown } = get();
    return (
      breakdown.base +
      breakdown.rain +
      breakdown.peak +
      breakdown.festival +
      breakdown.tips
    );
  },

  creditOrderEarnings: (order: CanonicalOrder) => {
    set((state) => {
      const newBreakdown = {
        base: state.breakdown.base + order.earnings.baseEarning,
        rain: state.breakdown.rain + order.earnings.rainBonus,
        peak: state.breakdown.peak + order.earnings.peakBonus,
        festival: state.breakdown.festival + order.earnings.festivalBonus,
        tips: state.breakdown.tips + order.earnings.tip,
      };

      const newTx: EarningTransaction = {
        id: `tx-${Date.now().toString().slice(-4)}`,
        orderId: order.id,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        baseAmount: order.earnings.baseEarning,
        rainBonus: order.earnings.rainBonus,
        peakBonus: order.earnings.peakBonus,
        festivalBonus: order.earnings.festivalBonus,
        tip: order.earnings.tip,
        totalAmount: order.earnings.totalEarning,
        status: 'CREDITED',
      };

      return {
        todayDeliveriesCount: state.todayDeliveriesCount + 1,
        todayDistanceKm: Number((state.todayDistanceKm + order.totalDistanceKm).toFixed(1)),
        breakdown: newBreakdown,
        weeklyTotal: state.weeklyTotal + order.earnings.totalEarning,
        cashoutAvailable: state.cashoutAvailable + order.earnings.totalEarning,
        transactions: [newTx, ...state.transactions],
      };
    });
  },

  requestCashout: async (amountToCashout) => {
    const { cashoutAvailable, payouts } = get();
    const amount = amountToCashout || cashoutAvailable;

    if (amount <= 0) {
      return { success: false, referenceId: '', message: 'No funds available for instant cashout.' };
    }

    set({ isCashoutLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 800));

    const refId = `FEAZ-PAY-${Math.floor(100000 + Math.random() * 900000)}`;

    const newPayout: PayoutRecord = {
      id: `pay-${Date.now().toString().slice(-4)}`,
      payoutDate: 'Just now',
      amount,
      referenceId: refId,
      bankAccountMasked: '••••••••8492',
      status: 'COMPLETED',
    };

    set({
      cashoutAvailable: 0,
      isCashoutLoading: false,
      payouts: [newPayout, ...payouts],
    });

    return {
      success: true,
      referenceId: refId,
      message: `₹${amount} credited to your registered UPI / Bank account. Ref: ${refId}`,
    };
  },

  resetEarnings: () =>
    set({
      todayDeliveriesCount: 7,
      todayDistanceKm: 34.2,
      breakdown: initialBreakdown,
      weeklyTotal: 5840,
      monthlyTotal: 24200,
      cashoutAvailable: 1940,
      transactions: initialTransactions,
      payouts: initialPayouts,
      isCashoutLoading: false,
    }),
}));
