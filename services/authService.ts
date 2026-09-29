/**
 * FEAzTO Rider - Authentication Service Abstraction
 * Currently uses local mock services. Backend team will replace internal handlers with real API calls.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultMockSession, validMockCredentials } from './mock/authMock';

const TOKEN_KEY = '@feazto_token';

export const authService = {
  /**
   * Login with phone and password/PIN
   */
  async login(phone: string, pin: string): Promise<{ success: boolean; token?: string; error?: string }> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit phone number' };
    }
    if (!pin || pin.length < 4) {
      return { success: false, error: 'Please enter a valid 4-digit PIN or password' };
    }

    // Accept default test credential or any valid 10-digit phone
    const token = defaultMockSession.token;
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return { success: true, token };
  },

  /**
   * Upload KYC document (simulated)
   */
  async uploadKycDocument(docType: string, fileUri?: string): Promise<{ success: boolean; status: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, status: 'VERIFIED' };
  },

  /**
   * Fetch verification status
   */
  async getVerificationStatus(): Promise<{ status: string; verified: boolean }> {
    return { status: 'APPROVED', verified: true };
  },

  /**
   * Fetch saved authentication token
   */
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  },

  /**
   * Logout rider
   */
  async logout(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
