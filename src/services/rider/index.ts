/**
 * FEAzTO Rider - Rider Service Contract & Mock Implementation
 */

import { mockRiderProfile } from '../../mocks/rider';
import { RiderProfile, RiderStatus, VerificationStatus } from '../../types/rider';

export interface RiderService {
  getProfile(): Promise<RiderProfile>;
  updateStatus(status: RiderStatus): Promise<RiderStatus>;
  submitVerification(data: Partial<RiderProfile>): Promise<{ status: VerificationStatus }>;
  confirmSafetyCheck(helmet: boolean, vehicle: boolean): Promise<boolean>;
}

export class MockRiderService implements RiderService {
  private currentProfile = { ...mockRiderProfile };

  async getProfile(): Promise<RiderProfile> {
    await new Promise((r) => setTimeout(r, 300));
    return this.currentProfile;
  }

  async updateStatus(status: RiderStatus): Promise<RiderStatus> {
    this.currentProfile.status = status;
    return status;
  }

  async submitVerification(data: Partial<RiderProfile>): Promise<{ status: VerificationStatus }> {
    this.currentProfile = { ...this.currentProfile, ...data, verificationStatus: 'PENDING' };
    return { status: 'PENDING' };
  }

  async confirmSafetyCheck(helmet: boolean, vehicle: boolean): Promise<boolean> {
    this.currentProfile.safety.helmetConfirmed = helmet;
    this.currentProfile.safety.vehicleReady = vehicle;
    this.currentProfile.safety.lastSafetyCheckTimestamp = Date.now();
    return true;
  }
}

export const riderService: RiderService = new MockRiderService();
