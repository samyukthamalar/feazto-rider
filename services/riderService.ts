/**
 * FEAzTO Rider - Rider Profile & Duty Service Abstraction
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultMockRider, MockRiderProfile } from './mock/riderMock';

const DUTY_STORAGE_KEY = '@feazto_rider_duty_status';
let dutyStatus: boolean = false; // Initially OFFLINE as per workflow specifications
let dutyInitialized = false;

async function initDuty(): Promise<void> {
  if (!dutyInitialized) {
    try {
      const saved = await AsyncStorage.getItem(DUTY_STORAGE_KEY);
      if (saved !== null) {
        dutyStatus = JSON.parse(saved);
      }
    } catch {}
    dutyInitialized = true;
  }
}

export const riderService = {
  /**
   * Fetch current rider profile
   */
  async getProfile(): Promise<MockRiderProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return defaultMockRider;
  },

  /**
   * Get duty availability (Online / Offline)
   */
  async getDutyStatus(): Promise<boolean> {
    await initDuty();
    return dutyStatus;
  },

  /**
   * Toggle duty availability
   */
  async updateDutyStatus(isOnline: boolean): Promise<{ success: boolean; isOnline: boolean }> {
    dutyStatus = isOnline;
    dutyInitialized = true;
    AsyncStorage.setItem(DUTY_STORAGE_KEY, JSON.stringify(isOnline)).catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, isOnline };
  },

  /**
   * Update current GPS position
   */
  async updateLocation(latitude: number, longitude: number): Promise<{ success: boolean }> {
    return { success: true };
  },
};

