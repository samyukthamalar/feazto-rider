/**
 * FEAzTO Rider - Mock Rider Data
 * Section 32 Source of Truth
 */

import { RiderProfile } from '../types/rider';

export const mockRiderProfile: RiderProfile = {
  id: 'RDR-8429',
  phone: '+91 98765 43210',
  status: 'ONLINE',
  verificationStatus: 'APPROVED',
  personalDetails: {
    fullName: 'Karthik Ramanathan',
    phone: '+91 98765 43210',
    email: 'karthik.r@feaztopartner.com',
    dateOfBirth: '1996-08-14',
    address: '14/B, 2nd Main, Anna Nagar East',
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
