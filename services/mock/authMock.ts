/**
 * FEAzTO Rider - Mock Authentication Data
 */

export interface MockUserSession {
  token: string;
  riderId: string;
  name: string;
  phone: string;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  verificationStatus: 'PENDING' | 'APPROVED' | 'NEEDS_CORRECTION';
}

export const defaultMockSession: MockUserSession = {
  token: 'mock_jwt_token_feazto_rider_2026',
  riderId: 'RDR-8429',
  name: 'Karthik Ramanathan',
  phone: '+91 98765 43210',
  isAuthenticated: true,
  isOnboarded: true,
  verificationStatus: 'APPROVED',
};

export const validMockCredentials = {
  phone: '9876543210',
  pin: '1234',
  password: 'password123',
};
