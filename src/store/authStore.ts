/**
 * FEAzTO Rider - Authentication Store
 * Source of truth: FEAzTO Rider Master Prompt Section 12, 13, 14
 */

import { create } from 'zustand';
import { VerificationStatus } from '../types/rider';

export interface VerifiedDocumentsState {
  identity: boolean;
  licence: boolean;
  vehicle: boolean;
  bank: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  phone: string;
  otpSent: boolean;
  isVerifying: boolean;
  verificationStatus: VerificationStatus;
  correctionReason?: string;
  isOnboarded: boolean;
  verifiedDocuments: VerifiedDocumentsState;
  resendCooldownSeconds: number;
  lastOtpSentTimestamp?: number;
  setPhone: (phone: string) => void;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (enteredOtp: string) => Promise<{ success: boolean; error?: string }>;
  resendOtp: () => Promise<boolean>;
  setVerificationStatus: (status: VerificationStatus, correctionReason?: string) => void;
  setIsOnboarded: (status: boolean) => void;
  updateVerifiedDoc: (docKey: keyof VerifiedDocumentsState, verified: boolean) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: true, // Default true for prototype testing
  phone: '9876543210',
  otpSent: false,
  isVerifying: false,
  verificationStatus: 'APPROVED',
  correctionReason: 'Driving licence photo is slightly blurred. Please re-upload front copy.',
  isOnboarded: true,
  verifiedDocuments: {
    identity: true,
    licence: true,
    vehicle: true,
    bank: true,
  },
  resendCooldownSeconds: 0,
  lastOtpSentTimestamp: undefined,

  setPhone: (phone) => set({ phone }),

  sendOtp: async (phone) => {
    set({ isVerifying: true });
    // Deterministic network simulation
    await new Promise((resolve) => setTimeout(resolve, 600));
    set({
      phone,
      otpSent: true,
      isVerifying: false,
      resendCooldownSeconds: 30,
      lastOtpSentTimestamp: Date.now(),
    });
    return true;
  },

  resendOtp: async () => {
    const { phone } = get();
    set({ isVerifying: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({
      isVerifying: false,
      resendCooldownSeconds: 30,
      lastOtpSentTimestamp: Date.now(),
    });
    return true;
  },

  verifyOtp: async (enteredOtp) => {
    set({ isVerifying: true });
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Prototype acceptance rule: '1234' or any 4 digit code
    if (enteredOtp.length === 4) {
      set({
        isAuthenticated: true,
        isVerifying: false,
      });
      return { success: true };
    }

    set({ isVerifying: false });
    return { success: false, error: 'Invalid verification code. Please enter 4 digits (e.g. 1234).' };
  },

  setVerificationStatus: (status, correctionReason) =>
    set({
      verificationStatus: status,
      correctionReason: correctionReason || (status === 'NEEDS_CORRECTION' ? 'Please re-upload front of Driving Licence.' : undefined),
    }),

  setIsOnboarded: (isOnboarded) => set({ isOnboarded }),

  updateVerifiedDoc: (docKey, verified) =>
    set((state) => ({
      verifiedDocuments: {
        ...state.verifiedDocuments,
        [docKey]: verified,
      },
    })),

  logout: () =>
    set({
      isAuthenticated: false,
      phone: '',
      otpSent: false,
      verificationStatus: 'PENDING',
      isOnboarded: false,
    }),

  reset: () =>
    set({
      isAuthenticated: true,
      phone: '9876543210',
      otpSent: false,
      verificationStatus: 'APPROVED',
      isOnboarded: true,
      verifiedDocuments: {
        identity: true,
        licence: true,
        vehicle: true,
        bank: true,
      },
    }),
}));
