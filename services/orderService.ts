/**
 * FEAzTO Rider - Order Service Abstraction
 * Drives the complete 20-screen rider delivery lifecycle locally
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    canonicalMockOrder,
    initialOrderHistory,
    MockOrder,
} from "./mock/orderMock";

const HISTORY_STORAGE_KEY = "@feazto_rider_history";
let currentOrderState: MockOrder = { ...canonicalMockOrder };
let historyList = [...initialOrderHistory];
let historyInitialization: Promise<void> | undefined;

function initializeHistory(): Promise<void> {
  if (!historyInitialization) {
    historyInitialization = AsyncStorage.getItem(HISTORY_STORAGE_KEY)
      .then((data) => {
        if (data) {
          try {
            historyList = JSON.parse(data);
          } catch {}
        }
      })
      .catch(() => {});
  }

  return historyInitialization;
}

export const orderService = {
  /**
   * Get active order / new dispatch offer
   */
  async getCurrentOrder(): Promise<MockOrder> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return currentOrderState;
  },

  /**
   * Accept assigned order
   */
  async acceptOrder(
    orderId: string,
  ): Promise<{ success: boolean; order: MockOrder }> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, order: currentOrderState };
  },

  /**
   * Verify QR Code scanned at cloud kitchen
   */
  async verifyPickupQr(
    orderId: string,
    qrCodeContent: string,
  ): Promise<{ success: boolean; matched: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, matched: true };
  },

  /**
   * Save food photo taken by rider
   */
  async saveFoodPhoto(
    orderId: string,
    photoUri: string,
  ): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    currentOrderState.foodPhotoUri = photoUri;
    return { success: true };
  },

  /**
   * Start delivery navigation
   */
  async startDelivery(orderId: string): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true };
  },

  /**
   * Mark rider arrival at customer doorstep
   */
  async markArrivedAtCustomer(orderId: string): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true };
  },

  /**
   * Confirm handover photo
   */
  async confirmHandoverPhoto(
    orderId: string,
    photoUri?: string,
  ): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (photoUri) {
      currentOrderState.handoverPhotoUri = photoUri;
    }
    return { success: true };
  },

  /**
   * Complete delivery and append to history
   */
  async completeDelivery(
    orderId: string,
  ): Promise<{ success: boolean; earnedAmount: number }> {
    await initializeHistory();
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Add completed order to history
    const completedEntry = {
      id: currentOrderState.id,
      orderNumber: currentOrderState.orderNumber,
      time: "Just now",
      status: "Delivered" as const,
      amount: currentOrderState.totalAmount,
      itemsCount: currentOrderState.itemsCount,
      restaurant: currentOrderState.kitchen.name,
      distanceKm: currentOrderState.customer.distanceKm,
      date: "Today",
    };

    historyList = [
      completedEntry,
      ...historyList.filter((item) => item.id !== currentOrderState.id),
    ];
    AsyncStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(historyList),
    ).catch(() => {});

    return { success: true, earnedAmount: currentOrderState.totalPayout };
  },

  /**
   * Fetch order history by period
   */
  async getOrderHistory(period: "today" | "week" | "month" = "today") {
    await initializeHistory();
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (period === "today") {
      return historyList.filter((item) => item.date === "Today");
    }
    if (period === "week") {
      return historyList.filter(
        (item) => item.date === "Today" || item.date === "Week",
      );
    }
    return historyList;
  },

  /**
   * Reset prototype order state
   */
  async resetPrototype(): Promise<void> {
    await initializeHistory();
    currentOrderState = { ...canonicalMockOrder };
    historyList = [...initialOrderHistory];
    AsyncStorage.removeItem(HISTORY_STORAGE_KEY).catch(() => {});
  },
};
