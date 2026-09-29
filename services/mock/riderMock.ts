/**
 * FEAzTO Rider - Mock Rider Profile Data
 */

export interface MockRiderProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  totalTrips: number;
  joinedDate: string;
  city: string;
  hub: string;
  vehicle: {
    type: string;
    model: string;
    plateNumber: string;
    isElectric: boolean;
  };
  kyc: {
    drivingLicense: 'VERIFIED' | 'PENDING' | 'REJECTED';
    aadhaar: 'VERIFIED' | 'PENDING' | 'REJECTED';
    selfieWithId: 'VERIFIED' | 'PENDING' | 'REJECTED';
  };
  safetyChecklist: {
    helmetVerified: boolean;
    deliveryBagReady: boolean;
    raincoatAvailable: boolean;
  };
}

export const defaultMockRider: MockRiderProfile = {
  id: 'RDR-8429',
  name: 'Karthik Ramanathan',
  phone: '+91 98765 43210',
  email: 'karthik.r@feazto.partner',
  avatar: 'KR',
  rating: 4.8,
  totalTrips: 1248,
  joinedDate: 'Jan 2025',
  city: 'Chennai',
  hub: 'Guindy Central Hub',
  vehicle: {
    type: 'EV Scooter',
    model: 'Hero Electric Optima',
    plateNumber: 'TN-09-EV-2024',
    isElectric: true,
  },
  kyc: {
    drivingLicense: 'VERIFIED',
    aadhaar: 'VERIFIED',
    selfieWithId: 'VERIFIED',
  },
  safetyChecklist: {
    helmetVerified: true,
    deliveryBagReady: true,
    raincoatAvailable: true,
  },
};
