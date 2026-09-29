/**
 * FEAzTO Rider - Mock Earnings Data
 * Matching reference workflow: ₹1,250 (5 Deliveries, ₹1,050 Delivery Earnings, ₹200 Incentives)
 */

export interface MockEarningsSummary {
  period: 'today' | 'week' | 'month';
  totalEarnings: number;
  completedDeliveries: number;
  deliveryEarnings: number;
  incentives: number;
  basePay: number;
  surgeBonus: number;
  onTimeBonus: number;
  tips: number;
  linkedUpiVpa: string;
}

export const mockEarningsData: Record<'today' | 'week' | 'month', MockEarningsSummary> = {
  today: {
    period: 'today',
    totalEarnings: 1250,
    completedDeliveries: 5,
    deliveryEarnings: 1050,
    incentives: 200,
    basePay: 850,
    surgeBonus: 100,
    onTimeBonus: 100,
    tips: 0,
    linkedUpiVpa: 'rider@okhdfcbank',
  },
  week: {
    period: 'week',
    totalEarnings: 8450,
    completedDeliveries: 36,
    deliveryEarnings: 7100,
    incentives: 1350,
    basePay: 5800,
    surgeBonus: 750,
    onTimeBonus: 600,
    tips: 200,
    linkedUpiVpa: 'rider@okhdfcbank',
  },
  month: {
    period: 'month',
    totalEarnings: 34200,
    completedDeliveries: 148,
    deliveryEarnings: 29000,
    incentives: 5200,
    basePay: 24200,
    surgeBonus: 3100,
    onTimeBonus: 2100,
    tips: 800,
    linkedUpiVpa: 'rider@okhdfcbank',
  },
};
