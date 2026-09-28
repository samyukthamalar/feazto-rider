/**
 * FEAzTO Rider - Dispatch Service Contract & Mock Implementation
 * Section 25 Source of Truth
 */

import { pendingMockOffer } from '../../store/orderStore';
import { CanonicalOrder } from '../../types/order';

export interface DispatchService {
  pollForOffers(riderId: string): Promise<CanonicalOrder | null>;
  acceptDeliveryOffer(orderId: string, riderId: string): Promise<boolean>;
  declineDeliveryOffer(orderId: string, riderId: string, reason?: string): Promise<boolean>;
}

export class MockDispatchService implements DispatchService {
  async pollForOffers(_riderId: string): Promise<CanonicalOrder | null> {
    return pendingMockOffer;
  }

  async acceptDeliveryOffer(_orderId: string, _riderId: string): Promise<boolean> {
    return true;
  }

  async declineDeliveryOffer(_orderId: string, _riderId: string, _reason?: string): Promise<boolean> {
    return true;
  }
}

export const dispatchService: DispatchService = new MockDispatchService();
