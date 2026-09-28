/**
 * FEAzTO Rider - Rider Domain Types
 * Section 11 & 14 Source of Truth
 */

export type RiderStatus = 'OFFLINE' | 'ONLINE' | 'ON_DELIVERY' | 'ON_BREAK';

export type VerificationStatus = 'PENDING' | 'NEEDS_CORRECTION' | 'VERIFIED' | 'APPROVED';

export interface RiderEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface RiderPersonalDetails {
  fullName: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  address: string;
  city: string;
  emergencyContact: RiderEmergencyContact;
}

export type LicenceType = 'MCWG' | 'LMV' | 'MCWOG';

export interface RiderLicenceDetails {
  licenceNumber: string;
  licenceType: LicenceType;
  expiryDate: string;
  frontUploaded: boolean;
  backUploaded: boolean;
}

export type VehicleType = 'PETROL_BIKE' | 'EV_SCOOTER' | 'BICYCLE';

export interface RiderVehicleDetails {
  vehicleType: VehicleType;
  model: string;
  registrationNumber: string;
}

export interface RiderDocuments {
  rcUploaded: boolean;
  insuranceUploaded: boolean;
  pucUploaded: boolean;
}

export interface RiderBankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

export interface RiderSafetyStatus {
  helmetConfirmed: boolean;
  raincoatAvailable: boolean;
  vehicleReady: boolean;
  lastSafetyCheckTimestamp?: number;
}

export interface RiderShiftStats {
  shiftDurationMinutes: number;
  completedDeliveriesToday: number;
  lastBreakTimestamp?: number;
  recommendedBreakInMinutes: number;
}

export interface RiderProfile {
  id: string;
  phone: string;
  status: RiderStatus;
  verificationStatus: VerificationStatus;
  personalDetails: RiderPersonalDetails;
  licenceDetails: RiderLicenceDetails;
  vehicleDetails: RiderVehicleDetails;
  documents: RiderDocuments;
  bankDetails: RiderBankDetails;
  safety: RiderSafetyStatus;
  shift: RiderShiftStats;
  rating: number;
  totalTrips: number;
}
