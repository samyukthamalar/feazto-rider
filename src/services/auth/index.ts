/**
 * FEAzTO Rider - Authentication Service Contract & Mock Implementation
 * Section 13 & 31 Source of Truth
 */

export interface AuthService {
  requestOtp(phone: string): Promise<{ success: boolean; message: string }>;
  verifyOtp(phone: string, otp: string): Promise<{ success: boolean; token?: string; error?: string }>;
  checkSession(): Promise<{ authenticated: boolean; riderId?: string }>;
  logout(): Promise<void>;
}

export class MockAuthService implements AuthService {
  async requestOtp(phone: string): Promise<{ success: boolean; message: string }> {
    await new Promise((r) => setTimeout(r, 500));
    return {
      success: true,
      message: `Prototype: 4-digit OTP sent to ${phone}. (Enter any 4 digits to proceed)`,
    };
  }

  async verifyOtp(_phone: string, otp: string): Promise<{ success: boolean; token?: string; error?: string }> {
    await new Promise((r) => setTimeout(r, 600));
    if (otp.length === 4) {
      return { success: true, token: 'mock-feazto-jwt-token-rdr-8429' };
    }
    return { success: false, error: 'Invalid OTP code. Must be 4 digits.' };
  }

  async checkSession(): Promise<{ authenticated: boolean; riderId?: string }> {
    return { authenticated: true, riderId: 'RDR-8429' };
  }

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
  }
}

export const authService: AuthService = new MockAuthService();
