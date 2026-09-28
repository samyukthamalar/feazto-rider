/**
 * FEAzTO Rider - Rider State & Safety Store
 */

import { create } from 'zustand';
import { RiderProfile, RiderSafetyStatus, RiderShiftStats, RiderStatus, VerificationStatus } from '../types/rider';

interface RiderState {
  status: RiderStatus;
  profile: RiderProfile;
  safety: RiderSafetyStatus;
  shift: RiderShiftStats;
  setStatus: (status: RiderStatus) => void;
  goOnline: () => { success: boolean; reason?: string };
  goOffline: () => void;
  takeBreak: (minutes?: number) => void;
  returnOnlineFromBreak: () => void;
  setHelmetConfirmed: (confirmed: boolean) => void;
  setRaincoatAvailable: (available: boolean) => void;
  setVehicleReady: (ready: boolean) => void;
  completeSafetyCheck: () => void;
  incrementShiftTrip: () => void;
  updateProfile: (partial: Partial<RiderProfile>) => void;
  setVerificationStatus: (status: VerificationStatus) => void;
  resetRiderState: () => void;
}

const initialProfile: RiderProfile = {
  id: 'RDR-8429',
  phone: '+91 98765 43210',
  status: 'ONLINE',
  verificationStatus: 'APPROVED',
  personalDetails: {
    fullName: 'Karthik Ramanathan',
    phone: '+91 98765 43210',
    email: 'karthik.r@example.com',
    dateOfBirth: '1996-08-14',
    address: '14/B, 2nd Main, Anna Nagar',
    city: 'Chennai',
    emergencyContact: {
      name: 'Priya Ramanathan',
      relationship: 'Spouse',
      phone: '+91 98765 11223',
    },
  },
  licenceDetails: {
    licenceNumber: 'TN-05-2018-0098412',
    licenceType: 'MCWG',
    expiryDate: '2035-12-31',
    frontUploaded: true,
    backUploaded: true,
  },
  vehicleDetails: {
    vehicleType: 'EV_SCOOTER',
    model: 'Ather 450X',
    registrationNumber: 'TN 05 AX 7824',
  },
  documents: {
    rcUploaded: true,
    insuranceUploaded: true,
    pucUploaded: true,
  },
  bankDetails: {
    accountHolderName: 'Karthik Ramanathan',
    accountNumber: '••••••••8492',
    ifscCode: 'HDFC0001842',
    upiId: 'karthik@okhdfcbank',
  },
  safety: {
    helmetConfirmed: true,
    raincoatAvailable: true,
    vehicleReady: true,
    lastSafetyCheckTimestamp: Date.now() - 3600000,
  },
  shift: {
    shiftDurationMinutes: 145,
    completedDeliveriesToday: 7,
    recommendedBreakInMinutes: 15,
  },
  rating: 4.88,
  totalTrips: 1240,
};

export const useRiderStore = create<RiderState>((set, get) => ({
  status: 'ONLINE',
  profile: initialProfile,
  safety: initialProfile.safety,
  shift: initialProfile.shift,

  setStatus: (status) => set({ status }),

  goOnline: () => {
    const { safety } = get();
    if (!safety.helmetConfirmed) {
      return { success: false, reason: 'Helmet check must be confirmed before going online.' };
    }
    set({ status: 'ONLINE' });
    return { success: true };
  },

  goOffline: () => set({ status: 'OFFLINE' }),

  takeBreak: (_minutes = 15) => {
    set({
      status: 'ON_BREAK',
      shift: {
        ...get().shift,
        lastBreakTimestamp: Date.now(),
      },
    });
  },

  returnOnlineFromBreak: () => set({ status: 'ONLINE' }),

  setHelmetConfirmed: (confirmed) =>
    set((state) => ({
      safety: { ...state.safety, helmetConfirmed: confirmed },
    })),

  setRaincoatAvailable: (available) =>
    set((state) => ({
      safety: { ...state.safety, raincoatAvailable: available },
    })),

  setVehicleReady: (ready) =>
    set((state) => ({
      safety: { ...state.safety, vehicleReady: ready },
    })),

  completeSafetyCheck: () =>
    set((state) => ({
      safety: {
        ...state.safety,
        helmetConfirmed: true,
        vehicleReady: true,
        lastSafetyCheckTimestamp: Date.now(),
      },
    })),

  incrementShiftTrip: () =>
    set((state) => ({
      shift: {
        ...state.shift,
        completedDeliveriesToday: state.shift.completedDeliveriesToday + 1,
      },
    })),

  updateProfile: (partial) =>
    set((state) => ({
      profile: { ...state.profile, ...partial },
    })),

  setVerificationStatus: (status) =>
    set((state) => ({
      profile: { ...state.profile, verificationStatus: status },
    })),

  resetRiderState: () =>
    set({
      status: 'ONLINE',
      profile: initialProfile,
      safety: initialProfile.safety,
      shift: initialProfile.shift,
    }),
}));
