/**
 * FEAzTO Rider - Earnings Service Abstraction
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockEarningsData, MockEarningsSummary } from "./mock/earningsMock";

const EARNINGS_STORAGE_KEY = "@feazto_rider_earnings";
let localEarnings = { ...mockEarningsData };
let earningsInitialization: Promise<void> | undefined;

function initializeEarnings(): Promise<void> {
  if (!earningsInitialization) {
    earningsInitialization = AsyncStorage.getItem(EARNINGS_STORAGE_KEY)
      .then((data) => {
        if (data) {
          try {
            localEarnings = JSON.parse(data);
          } catch {}
        }
      })
      .catch(() => {});
  }

  return earningsInitialization;
}

export const earningsService = {
  /**
   * Get earnings summary for specified period
   */
  async getEarningsSummary(
    period: "today" | "week" | "month" = "today",
  ): Promise<MockEarningsSummary> {
    await initializeEarnings();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return localEarnings[period];
  },

  /**
   * Credit earnings on order delivery completion
   */
  async creditOrderEarnings(amount: number = 286): Promise<void> {
    await initializeEarnings();
    localEarnings.today.totalEarnings += amount;
    localEarnings.today.completedDeliveries += 1;
    localEarnings.today.deliveryEarnings += amount;

    localEarnings.week.totalEarnings += amount;
    localEarnings.week.completedDeliveries += 1;
    localEarnings.week.deliveryEarnings += amount;

    localEarnings.month.totalEarnings += amount;
    localEarnings.month.completedDeliveries += 1;
    localEarnings.month.deliveryEarnings += amount;

    AsyncStorage.setItem(
      EARNINGS_STORAGE_KEY,
      JSON.stringify(localEarnings),
    ).catch(() => {});
  },

  /**
   * Reset earnings to default mock state
   */
  async resetEarnings(): Promise<void> {
    await initializeEarnings();
    localEarnings = { ...mockEarningsData };
    AsyncStorage.removeItem(EARNINGS_STORAGE_KEY).catch(() => {});
  },
};
